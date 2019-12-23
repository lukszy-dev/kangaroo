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

  title() {
    if (this.files && this.files[0]) {
      return this.files[0].filename;
    }
    return this.id;
  }
}