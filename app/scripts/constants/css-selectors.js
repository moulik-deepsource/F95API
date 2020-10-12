module.exports = Object.freeze({
  AVATAR_INFO: "span.avatar",
  AVATAR_PIC: 'a[href="/account/"] > span.avatar > img[class^="avatar"]',
  ENGINE_ID_SELECTOR: 'div[id^="btn-prefix_1_"]>span',
  FILTER_THREADS_BUTTON: 'button[class="button--primary button"]',
  GAME_IMAGES: 'img[src^="https://attachments.f95zone.to"]',
  GAME_TAGS: "a.tagItem",
  GAME_TITLE: "h1.p-title-value",
  GAME_TITLE_PREFIXES: 'h1.p-title-value > a.labelLink > span[dir="auto"]',
  LOGIN_BUTTON: "button.button--icon--login",
  LOGIN_MESSAGE_ERROR:
    "div.blockMessage.blockMessage--error.blockMessage--iconic",
  ONLY_GAMES_THREAD_OPTION: 'select[name="nodes[]"] > option[value="2"]',
  PASSWORD_INPUT: 'input[name="password"]',
  SEARCH_BUTTON: "form.block > * button.button--icon--search",
  SEARCH_FORM_TEXTBOX: 'input[name="keywords"]',
  STATUS_ID_SELECTOR: 'div[id^="btn-prefix_4_"]>span',
  THREAD_POSTS:
    "article.message-body:first-child > div.bbWrapper:first-of-type",
  THREAD_TITLE: "h3.contentRow-title",
  TITLE_ONLY_CHECKBOX: 'form.block > * input[name="c[title_only]"]',
  UNREAD_THREAD_CHECKBOX: 'input[type="checkbox"][name="unread"]',
  USERNAME_ELEMENT: 'a[href="/account/"] > span.p-navgroup-linkText',
  USERNAME_INPUT: 'input[name="login"]',
  WATCHED_THREAD_FILTER_POPUP_BUTTON: "a.filterBar-menuTrigger",
  WATCHED_THREAD_NEXT_PAGE: "a.pageNav-jump--next",
  WATCHED_THREAD_URLS: 'a[href^="/threads/"][data-tp-primary]',
  DOWNLOAD_LINKS_CONTAINER: 'span[style="font-size: 18px"]',
  SEARCH_THREADS_RESULTS_BODY: "div.contentRow-main",
  SEARCH_THREADS_MEMBERSHIP: "li > a:not(.username)",
});
