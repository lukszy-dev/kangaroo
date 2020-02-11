/** Class representing a gist. */
export default class Gist {
  id: string;
  description: string;
  files: Array<any>;
  url: string;

  /**
   * Create a gist.
   * @param {object} args
   */
  constructor(args: {
    id: string,
    description: string,
    files: Array<any>,
    url: string
  }) {
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
