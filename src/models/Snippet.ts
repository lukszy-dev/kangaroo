import { v4 as uuidv4 } from 'uuid';

import { TEXT } from './languages';
import { TAGS } from './tags';

export const sourceType = {
  LOCAL: 'local',
  GIST: 'gist',
};

export interface SnippetInterface {
  id: number;
  title: string;
  source?: string;
  uuid?: string;
  tags?: string;
  description?: string;
  language?: string;
  content?: string;
  lastUpdated?: string;
}

/** Class representing a snippet. */
export default class Snippet implements SnippetInterface {
  id: number;
  title: string;
  source: string;
  uuid: string;
  tags: string;
  description: string;
  language: string;
  content: string;
  lastUpdated: string;

  /**
   * Create a snippet.
   * @param {object} args
   */
  constructor(args: SnippetInterface) {
    const {
      id,
      title,
      source = sourceType.LOCAL,
      uuid = uuidv4(),
      tags = '',
      description = '',
      language = TEXT,
      content = '',
      lastUpdated = new Date().toISOString(),
    } = args;

    this.id = id;
    this.source = source;
    this.uuid = uuid;
    this.tags = tags;
    this.title = title;
    this.description = description;
    this.language = language;
    this.content = content;
    this.lastUpdated = lastUpdated;
  }

  getColorTags = (): string[] => {
    const colorTags: string[] = [];
    const elements = this.tags.split(',');
    elements.forEach((snippetTag) => {
      const tag = TAGS.find((tag) => tag.key === snippetTag);
      if (tag) {
        colorTags.push(tag.color);
      }
    });
    return colorTags;
  };
}
