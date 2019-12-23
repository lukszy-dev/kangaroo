export const sourceType = {
  LOCAL: 'local',
  GIST: 'gist'
}

/** Class representing a snippet. */
export default class Snippet {
  /**
   * Create a snippet.
   * @param {object} args
   */
  constructor(args) {
    const {
      id,
      source,
      uuid,
      title,
      description,
      language,
      content,
      lastUpdated
    } = args;

    this.id = id;
    this.source = source;
    this.uuid = uuid;
    this.title = title;
    this.description = description;
    this.language = language;
    this.content = content;
    this.lastUpdated = lastUpdated;
  }
}
