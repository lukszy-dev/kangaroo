import Snippet, { sourceType } from 'models/Snippet';
import { TEXT } from 'models/languages';

export const MOCK_TITLE = 'mockTitle';
export const MOCK_DESCRIPTION = 'mockDescription';
export const MOCK_CONTENT = 'mockContent';

export const mockSnippet = (): Snippet => {
  return {
    id: 0,
    title: MOCK_TITLE,
    source: sourceType.LOCAL,
    uuid: 'uuid',
    description: MOCK_DESCRIPTION,
    content: MOCK_CONTENT,
    language: TEXT,
    lastUpdated: new Date().toISOString(),
  };
};
