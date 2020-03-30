import Snippet, { sourceType } from 'models/Snippet';
import { TEXT } from 'models/languages';

export const MOCK_TITLE = 'mockTitle';
export const MOCK_DESCRIPTION = 'mockDescription';
export const MOCK_CONTENT = 'mockContent';

export const MOCK_LAST_SYNCHRONIZED_GIST_DATE = 'lastSychronizedGistDate';

export const mockSnippet = (lastUpdated?: string): Snippet => {
  return {
    id: 0,
    title: MOCK_TITLE,
    source: sourceType.LOCAL,
    uuid: 'uuid',
    tags: '#F29D49',
    description: MOCK_DESCRIPTION,
    content: MOCK_CONTENT,
    language: TEXT,
    lastUpdated: lastUpdated || new Date().toISOString(),
    getColorTags: jest.fn(),
  };
};
