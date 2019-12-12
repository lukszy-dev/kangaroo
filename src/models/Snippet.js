export default class Snippet {
  constructor(args) {
    const { id, title, description, language, content } = args;

    this.id = id;
    this.title = title;
    this.description = description;
    this.language = language;
    this.content = content;
  }
}
