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
    return Object.keys(this.files)[0];
  }
}