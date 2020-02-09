import Octokit from '@octokit/rest';
import Snippet, { sourceType } from '../models/Snippet';
import { sortById } from '../utils/utils';
import { setLoading } from './ui';
import { snippetsDb } from '../db/snippets';
import { setGitHubDataAction } from './auth';

const namespace = name => `SNIPPETS_${name}`;

export const ADD_SNIPPET = namespace('ADD_SNIPPET');
export const UPDATE_SNIPPET = namespace('UPDATE_SNIPPET');
export const DELETE_SNIPPET = namespace('DELETE_SNIPPET');
export const SET_CURRENT_SNIPPET = namespace('SET_CURRENT_SNIPPET');
export const LOAD_SNIPPETS = namespace('LOAD_SNIPPETS');
export const SET_SEARCH_SNIPPETS = namespace('SET_SEARCH_SNIPPETS');

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

    const newSnippet = new Snippet({ title: 'New', id: lastId + 1 });
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

const getGist = (authToken, backupGistId) => {
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

const updateGist = (authToken, backupGistId, snippets) => {
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

    octokit.gists.update(request).then(() => {
      resolve(fileName);
    }).catch(error => {
      reject(error);
    });
  });
};

const createGist = (authToken, gistDescription, snippets) => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    const fileName = (new Date()).toISOString();
    const request = {
      description: gistDescription,
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
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
};

export const synchronizeGist = (backupLocalSnippets, authToken, backupGistId) => {
  return (dispatch, getState, ipcRenderer) => {
    const { snippets: { lastId, list }, auth: { lastSychronizedGistDate } } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      getGist(authToken, backupGistId).then(response => {
        const files = Object.entries(response.data.files);
        const lastGist = files[files.length - 1];
        const gistContent = JSON.parse(lastGist[1].content);

        const lastSynchronizedGistTime = new Date(lastSychronizedGistDate).getTime();
        const gistDate = new Date(lastGist[0]);
        const gistTime = gistDate.getTime();

        const gistSourceSnippets = list.filter(snippet => snippet.source === sourceType.GIST);

        let id = lastId;

        if (!lastSynchronizedGistTime || gistTime > lastSynchronizedGistTime) {
          snippetsDb.removeQuery({ source: sourceType.GIST });

          const synchronized = gistContent.map(snippet => new Snippet({
            ...snippet, id: id++, lastUpdated: gistDate
          })).sort(sortById);
          snippetsDb.add(synchronized);

          ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
          dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
          dispatch(loadSnippetsAction(synchronized, synchronized[0], id));
        } else {
          const lastUpdatedTime = Math.max.apply(
            Math, gistSourceSnippets.map(snippet => new Date(snippet.lastUpdated))
          );

          if (lastUpdatedTime > lastSynchronizedGistTime) {
            let snippets = backupLocalSnippets ? list.slice(0) : gistSourceSnippets;
            snippets.forEach(snippet => snippet.source = sourceType.GIST);

            updateGist(
              authToken, backupGistId, snippets
            ).then(gistDate => {
              ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
              dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
            }).catch(error => {
              dispatch(setLoading(false));
              reject(error);
            });
          }
        }

        dispatch(setLoading(false));
        resolve();
      }).catch(error => {
        dispatch(setLoading(false));
        reject(error);
      });
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

      createGist(
        authToken,
        description,
        snippets
      ).then(response => {
        const gistId = response.data.id;
        const gistDate = response.data.updated_at;

        ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId: gistId, gistDate });
        snippetsDb.updateAll({ source: sourceType.GIST });

        dispatch(setGitHubDataAction({ token: authToken, gistId, gistDate }));
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
