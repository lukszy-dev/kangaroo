const namespace = name => `SNIPPETS_${name}`;

export const ADD_SNIPPET = namespace('ADD_SNIPPET');
export const UPDATE_SNIPPET = namespace('UPDATE_SNIPPET');
export const DELETE_SNIPPET = namespace('DELETE_SNIPPET');
export const SET_CURRENT_SNIPPET = namespace('SET_CURRENT_SNIPPET');
export const RECEIVE_SNIPPETS = namespace('RECEIVE_SNIPPETS');

export const addSnippet = (snippet) => ({
  type: ADD_SNIPPET,
  snippet
});

export const updateSnippet = (snippet) => ({
  type: UPDATE_SNIPPET,
  snippet
});

export const deleteSnippet = (id) => ({
  type: DELETE_SNIPPET,
  id
});

export const setCurrentSnippet = (id) => ({
  type: SET_CURRENT_SNIPPET,
  id
});
