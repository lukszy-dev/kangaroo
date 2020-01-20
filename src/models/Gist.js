/** Class representing a gist. */
export default class Gist {
  /**
   * Create a gist.
   * @param {object} args
   */
  constructor(args) {
    const {
      id,
      description,
      files,
      url,
    } = args;

    this.id = id;
    this.description = description;
    this.files = files;
    this.url = url;
  }

  get title() {
    const keys = Object.keys(this.files);
    return keys[keys.length - 1];
  }
}