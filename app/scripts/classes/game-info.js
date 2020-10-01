const UNKNOWN = 'Unknown';

class GameInfo {
  constructor() {
    /**
     * Game name
     * @type String
     */
    this.name = UNKNOWN;
    /**
     * Game author
     * @type String
     */
    this.author = UNKNOWN;
    /**
     * URL to the game's official conversation on the F95Zone portal
     * @type URL
     */
    this.f95url = null;
    /**
     * Game description
     * @type String
     */
    this.overview = UNKNOWN;
    /**
     * List of tags associated with the game
     * @type String[]
     */
    this.tags = [];
    /**
     * Graphics engine used for game development
     * @type String
     */
    this.engine = UNKNOWN;
    /**
     * Progress of the game
     * @type String
     */
    this.status = UNKNOWN;
    /**
     * Game description image URL
     * @type URL
     */
    this.previewSource = null;
    /**
     * Game version
     * @type String
     */
    this.version = UNKNOWN;
    /**
     * Last time the game underwent updates
     * @type String
     */
    this.lastUpdate = UNKNOWN;
    /**
     * Last time the local copy of the game was run
     * @type String
     */
    this.lastPlayed = UNKNOWN;
    /**
     * Specifies if the game is original or a mod
     * @type Boolean
     */
    this.isMod = false;
    /**
     * Directory containing the local copy of the game
     * @type String
     */
    this.gameDir = UNKNOWN;
    /**
     * 
     */
    this.downloadInfo = [];
  }

  /**
   * Converts the object to a dictionary used for JSON serialization
   */
  toJSON() {
    return {
      name: this.name,
      author: this.author,
      f95url: this.f95url,
      overview: this.overview,
      engine: this.engine,
      status: this.status,
      previewSource: this.previewSource,
      version: this.version,
      lastUpdate: this.lastUpdate,
      lastPlayed: this.lastPlayed,
      isMod: this.isMod,
      gameDir: this.gameDir
    }
  }

  /**
   * Return a new GameInfo from a JSON string
   * @param {String} json JSON string used to create the new object
   * @returns {GameInfo}
   */
  static fromJSON(json) {
    return Object.assign(new GameInfo(), json);
  }
}
module.exports.GameInfo = GameInfo;