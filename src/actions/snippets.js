import Octokit from '@octokit/rest';
import Snippet, { sourceType } from '../models/Snippet';
import { sortById } from '../utils/utils';
import { setLoading } from './ui';
import { snippetsDb } from '../db/snippets';
import { setAuthDataAction } from './auth';

const namespace = name => `SNIPPETS_${name}`;

export const ADD_SNIPPET = namespace('ADD_SNIPPET');
export const UPDATE_SNIPPET = namespace('UPDATE_SNIPPET');
export const DELETE_SNIPPET = namespace('DELETE_SNIPPET');
export const SET_CURRENT_SNIPPET = namespace('SET_CURRENT_SNIPPET');
export const LOAD_SNIPPETS = namespace('LOAD_SNIPPETS');
export const SET_SEARCH_SNIPPETS = namespace('SET_SEARCH_SNIPPETS');

export const SYNCHRONIZE_TYPE = {
  BACKUP: 'BACKUP',
  IMPORT: 'IMPORT'
};

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

const setSearchSnippetsAction = (query) => ({
  type: SET_SEARCH_SNIPPETS,
  query
});

export const setCurrentSnippet = (id) => ({
  type: SET_CURRENT_SNIPPET,
  id
});

export const initSnippets = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      snippetsDb.findAll(data => {
        const snippets = data.sort(sortById).map(entry => new Snippet(entry));
        const lastId = Math.max.apply(Math, snippets.map(entry => entry.id)) | 0;

        dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
        resolve();
      });
    })
  };
};

export const addSnippet = () => {
  return (dispatch, getState) => {
    const { snippets: { lastId, list } } = getState();

    const newSnippet = new Snippet({ id: lastId + 1 });
    const updatedList = [...list, newSnippet].sort(sortById);

    snippetsDb.add(newSnippet);
    dispatch(addSnippetAction(newSnippet, updatedList));
  };
};

export const updateSnippet = (snippet) => {
  return (dispatch, getState) => {
    const { snippets: { current, list } } = getState();

    const toUpdateIndex = list.findIndex(element => element.id === current.id);
    const updatedSnippet = new Snippet({ ...snippet, lastUpdated: new Date() });
    const updatedList = [...list];
    updatedList[toUpdateIndex] = updatedSnippet;

    snippetsDb.update(updatedSnippet);
    dispatch(updateSnippetAction(updatedSnippet, updatedList));
  };
};

export const deleteSnippet = () => {
  return (dispatch, getState) => {
    const { snippets: { current, list } } = getState();

    const updatedList = list.filter(element => element.id !== current.id);

    snippetsDb.remove(current.id);
    dispatch(deleteSnippetAction(updatedList[0], updatedList));
  };
};

export const setSearchSnippets = (query) => {
  return (dispatch) => {
    dispatch(setSearchSnippetsAction(query));
  };
};

const backupSnippets = (authToken, backupGistId, snippets) => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    const fileName = (new Date()).toISOString();
    const request = {
      gist_id: backupGistId,
      files: {
        [fileName]: {
          content: JSON.stringify(snippets)
        }
      }
    };

    octokit.gists.update(request).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
};

const importGist = (authToken, backupGistId) => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    octokit.gists.get({
      gist_id: backupGistId,
      headers: { 'If-None-Match': '' }
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
};

export const synchronizeGist = (action, authToken, backupGistId) => {
  return (dispatch, getState, ipcRenderer) => {
    const { snippets: { lastId, list } } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      if (action === SYNCHRONIZE_TYPE.BACKUP) {
        const snippets = list.slice(0);
        snippets.forEach(snippet => snippet.source = sourceType.GIST);

        backupSnippets(authToken, backupGistId, snippets).then(() => {
          snippetsDb.updateAll({ source: sourceType.GIST });

          dispatch(initSnippets());
          dispatch(setLoading(false));
          resolve();
        }).catch(error => {
          dispatch(setLoading(false));
          reject(error);
        });
      } else if (action === SYNCHRONIZE_TYPE.IMPORT) {
        importGist(authToken, backupGistId).then(response => {
          let id = lastId;
          const files = Object.entries(response.data.files);
          const data = JSON.parse(files[files.length - 1][1].content);
          const imported = data.map(entry => new Snippet({ ...entry, id: id++ })).sort(sortById);

          snippetsDb.removeAll(); // TODO Merge local snippets instead?
          snippetsDb.add(imported);

          ipcRenderer.send('SET_GH_AUTH_DATA', { token: authToken, backupGistId });

          dispatch(setAuthDataAction({ token: authToken, backupGistId }));
          dispatch(loadSnippetsAction(imported, imported[0], id));
          dispatch(setLoading(false));
          resolve();
        }).catch(error => {
          dispatch(setLoading(false));
          reject(error);
        });
      }
    });
  };
};

export const createBackupGist = (description, authToken) => {
  return (dispatch, getState, ipcRenderer) => {
    const { snippets: { list, lastId } } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const snippets = list.slice(0);
      snippets.forEach(snippet => snippet.source = sourceType.GIST);

      const octokit = new Octokit({ auth: authToken });
      const fileName = (new Date()).toISOString();
      const request = {
        description: description,
        public: false,
        files: {
          [fileName]: {
            content: JSON.stringify(snippets)
          }
        }
      };

      octokit.gists.create(
        request
      ).then(response => {
        const gistId = response.data.id;
        ipcRenderer.send('SET_GH_AUTH_DATA', { token: authToken, backupGistId: gistId });
        snippetsDb.updateAll({ source: sourceType.GIST });

        dispatch(setAuthDataAction({ token: authToken, gistId }));
        dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
        dispatch(setLoading(false));
        resolve();
      }).catch(error => {
        dispatch(setLoading(false));
        reject(error);
      });
    });
  };
};
