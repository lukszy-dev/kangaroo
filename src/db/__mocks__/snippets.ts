import { SnippetInterface } from 'models/Snippet';

const mockSnippets = [
  {
    id: 0,
    title: 'test0',
  },
  {
    id: 1,
    title: 'test1',
  },
];

export const snippetsDb = {
  add: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  removeQuery: jest.fn(),
  findAll: (callback: (items: SnippetInterface[]) => void): void => {
    callback(mockSnippets);
  },
};
