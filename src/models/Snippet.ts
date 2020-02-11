import uuidv4 from 'uuid/v4';

import { TEXT } from './languages';

export const sourceType = {
  LOCAL: 'local',
  GIST: 'gist'
}

export interface ISnippet {
  id: number;
  title: string;
  source?: string;
  uuid?: string;
  description?: string;
  language?: string;
  content?: string;
  lastUpdated?: string;
}

/** Class representing a snippet. */
export default class Snippet implements ISnippet {
  id: number;
  title: string;
  source: string;
  uuid: string;
  description: string;
  language: string;
  content: string;
  lastUpdated: string;
  
  /**
   * Create a snippet.
   * @param {object} args
   */
  constructor(args: ISnippet) {
    const {
      id,
      title,
      source = sourceType.LOCAL,
      uuid = uuidv4(),
      description = '',
      language = TEXT,
      content = '',
      lastUpdated = new Date().toISOString()
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
