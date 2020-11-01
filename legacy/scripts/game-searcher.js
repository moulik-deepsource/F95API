"use strict";

// Public modules from npm
const puppeteer = require("puppeteer"); // skipcq: JS-0128

// Modules from file
const shared = require("./shared.js");
const urlK = require("./constants/url.js");
const selectorK = require("./constants/css-selector.js");
const { preparePage } = require("./puppeteer-helper.js");
const { isF95URL } = require("./url-helper.js");

/**
 * @protected
 * Search the F95Zone portal to find possible conversations regarding the game you are looking for.
 * @param {puppeteer.Browser} browser Browser object used for navigation
 * @param {String} gamename Name of the game to search for
 * @returns {Promise<String[]>} List of URL of possible games obtained from the preliminary research on the F95 portal
 */
module.exports.getSearchGameResults = async function (browser, gamename) {
    shared.logger.info(`Searching ${gamename} on F95Zone`);

    const page = await preparePage(browser); // Set new isolated page
    await page.setCookie(...shared.cookies); // Set cookies to avoid login
    await page.goto(urlK.F95_SEARCH_URL, {
        waitUntil: shared.WAIT_STATEMENT,
    }); // Go to the search form and wait for it

    // Explicitly wait for the required items to load
    await Promise.all([
        page.waitForSelector(selectorK.SEARCH_FORM_TEXTBOX),
        page.waitForSelector(selectorK.TITLE_ONLY_CHECKBOX),
        page.waitForSelector(selectorK.SEARCH_ONLY_GAMES_OPTION),
        page.waitForSelector(selectorK.SEARCH_BUTTON),
    ]);

    await page.type(selectorK.SEARCH_FORM_TEXTBOX, gamename); // Type the game we desire
    await page.click(selectorK.TITLE_ONLY_CHECKBOX); // Select only the thread with the game in the titles
    await page.click(selectorK.SEARCH_ONLY_GAMES_OPTION); // Search only games and mod
    await Promise.all([
        page.click(selectorK.SEARCH_BUTTON), // Execute search
        page.waitForNavigation({
            waitUntil: shared.WAIT_STATEMENT,
        }), // Wait for page to load
    ]);

    // Select all conversation titles
    const resultsThread = await page.$$(selectorK.SEARCH_THREADS_RESULTS_BODY);

    // For each element found extract the info about the conversation
    shared.logger.info("Extracting info from conversations");
    const results = [];
    for (const element of resultsThread) {
        const gameUrl = await getOnlyGameThreads(page, element);
        if (gameUrl !== null) results.push(gameUrl);
    }
    shared.logger.info(`Find ${results.length} conversations`);
    await page.close(); // Close the page

    return results;
};

//#region Private methods
/**
 * @private
 * Return the link of a conversation if it is a game or a mod.
 * @param {puppeteer.Page} page Page containing the conversation to be analyzed
 * @param {puppeteer.ElementHandle} divHandle Element of the conversation to be analyzed
 * @return {Promise<String>} URL of the game/mod or null if the URL is not of a game
 */
async function getOnlyGameThreads(page, divHandle) {
    // Obtain the elements containing the basic information
    const titleHandle = await divHandle.$(selectorK.THREAD_TITLE);
    const forumHandle = await divHandle.$(selectorK.SEARCH_THREADS_MEMBERSHIP);

    // Get the forum where the thread was posted
    const forum = await getMembershipForum(page, forumHandle);
    if (forum !== "GAMES" && forum !== "MODS") return null;

    // Get the URL of the thread from the title
    return await getThreadURL(page, titleHandle);
}

/**
 * @private
 * Obtain the membership forum of the thread passed throught 'handle'.
 * @param {puppeteer.Page} page Page containing the conversation to be analyzed
 * @param {puppeteer.ElementHandle} handle Handle containing the forum membership
 * @returns {Promise<String>} Uppercase membership category
 */
async function getMembershipForum(page, handle) {
    // The link can be something like:
    // + /forums/request.NUMBER/
    // + /forums/game-recommendations-identification.NUMBER/
    // + /forums/games.NUMBER/ <-- We need this

    let link = await page.evaluate(
    /* istanbul ignore next */
        (e) => e.getAttribute("href"),
        handle
    );

    // Parse link
    link = link.replace("/forums/", "");
    const endIndex = link.indexOf(".");
    const forum = link.substring(0, endIndex);

    return forum.toUpperCase();
}

/**
 * @private
 * Obtain the URL of the thread passed through 'handle'.
 * @param {puppeteer.Page} page Page containing the conversation to be analyzed
 * @param {puppeteer.ElementHandle} handle Handle containing the thread title
 * @returns {Promise<String>} URL of the thread
 */
async function getThreadURL(page, handle) {
    const relativeURLThread = await page.evaluate(
    /* istanbul ignore next */
        (e) => e.querySelector("a").href,
        handle
    );

    // Some game already have a full URL...
    if (isF95URL(relativeURLThread)) return relativeURLThread;

    // ... else compose the URL and return
    const urlThread = new URL(relativeURLThread, urlK.F95_BASE_URL).toString();
    return urlThread;
}
//#endregion Private methods