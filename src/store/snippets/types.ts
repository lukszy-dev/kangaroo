import Snippet from 'models/Snippet';

export const ADD_SNIPPET = 'SNIPPETS_ADD_SNIPPET';
export const UPDATE_SNIPPET = 'SNIPPETS_UPDATE_SNIPPET';
export const DELETE_SNIPPET = 'SNIPPETS_DELETE_SNIPPET';
export const SET_CURRENT_SNIPPET = 'SNIPPETS_SET_CURRENT_SNIPPET';
export const LOAD_SNIPPETS = 'SNIPPETS_LOAD_SNIPPETS';

export interface SnippetsState {
  current: Snippet | null;
  list: Snippet[];
  lastId: number;
}

interface LoadSnippetsAction {
  type: typeof LOAD_SNIPPETS;
  list: Snippet[];
  current: Snippet;
  lastId: number;
}

interface AddSnippetAction {
  type: typeof ADD_SNIPPET;
  snippet: Snippet;
  list: Snippet[];
}

interface UpdateSnippetAction {
  type: typeof UPDATE_SNIPPET;
  snippet: Snippet;
  list: Snippet[];
}

interface DeleteSnippetAction {
  type: typeof DELETE_SNIPPET;
  current: Snippet;
  list: Snippet[];
}

interface SetCurrentSnippetAction {
  type: typeof SET_CURRENT_SNIPPET;
  id: number;
}

export type SnippetsActionTypes =
  | LoadSnippetsAction
  | AddSnippetAction
  | UpdateSnippetAction
  | DeleteSnippetAction
  | SetCurrentSnippetAction;
