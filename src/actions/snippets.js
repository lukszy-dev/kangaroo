import Snippet from '../models/Snippet';

const namespace = name => `SNIPPETS_${name}`;

export const ADD_SNIPPET = namespace('ADD_SNIPPET');
export const UPDATE_SNIPPET = namespace('UPDATE_SNIPPET');
export const DELETE_SNIPPET = namespace('DELETE_SNIPPET');
export const SET_CURRENT_SNIPPET = namespace('SET_CURRENT_SNIPPET');
export const LOAD_SNIPPETS = namespace('LOAD_SNIPPETS');

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const loadSnippetsAction = (list, current, lastId) => ({
  type: LOAD_SNIPPETS,
  list,
  current,
  lastId
});

const addSnippetAction = (snippet, list) => ({
  type: ADD_SNIPPET,
  snippet,
  list
});

const updateSnippetAction = (snippet, list) => ({
  type: UPDATE_SNIPPET,
  snippet,
  list
});

const deleteSnippetAction = (current, list) => ({
  type: DELETE_SNIPPET,
  current,
  list
});

export const setCurrentSnippet = (id) => ({
  type: SET_CURRENT_SNIPPET,
  id
});

export const initSnippets = () => {
  return () => {
    ipcRenderer.send('DB_LOAD');
    // dispatch(loadSnippetsAction([]));
  };
};

export const loadSnippets = (data) => {
  return (dispatch) => {
    const snippets = data.map(entry => new Snippet(entry));
    const lastId = Math.max.apply(Math, snippets.map(entry => entry.id));

    dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
  };
};

export const addSnippet = () => {
  return (dispatch, getState) => {
    const { snippets: { lastId, list } } = getState();

    const nextId = lastId + 1;
    const updatedSnippet = new Snippet({ id: nextId, title: 'New', language: 'text', content: '' });
    const updatedList = [...list, updatedSnippet];

    ipcRenderer.send('DB_ADD', updatedSnippet);
    dispatch(addSnippetAction(updatedSnippet, updatedList));
  };
};

export const updateSnippet = (snippet) => {
  return (dispatch, getState) => {
    const { snippets: { current, list }} = getState();

    const toUpdateIndex = list.findIndex(element => element.id === current.id);
    const updatedSnippet = new Snippet({ ...snippet });
    const updatedList = [...list];
    updatedList[toUpdateIndex] = updatedSnippet;

    ipcRenderer.send('DB_UPDATE', updatedSnippet);
    dispatch(updateSnippetAction(updatedSnippet, updatedList));
  };
}

export const deleteSnippet = () => {
  return (dispatch, getState) => {
    const { snippets: { current, list }} = getState();

    const updatedList = list.filter(element => element.id !== current.id);

    ipcRenderer.send('DB_DELETE', current.id);
    dispatch(deleteSnippetAction(updatedList[updatedList.length - 1], updatedList));
  };
}
