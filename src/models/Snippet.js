export default class Snippet {
  constructor(args) {
    const { id, title, description, content } = args;

    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
  }
}