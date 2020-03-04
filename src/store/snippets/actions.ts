import Octokit, { GistsGetResponse, GistsCreateResponse } from '@octokit/rest';

import { AppThunk } from 'store/types';
import Snippet, { SnippetInterface, sourceType } from 'models/Snippet';
import { setLoading } from 'store/ui/actions';
import { setGitHubDataAction } from 'store/auth/actions';
import { sortById } from 'utils/utils';
import { snippetsDb } from 'db';

import {
  LOAD_SNIPPETS,
  ADD_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
  SET_SEARCH_SNIPPETS,
  SET_CURRENT_SNIPPET,
  SnippetsActionTypes,
} from './types';

const loadSnippetsAction = (list: Snippet[], current: Snippet, lastId: number): SnippetsActionTypes => ({
  type: LOAD_SNIPPETS,
  list,
  current,
  lastId,
});

const addSnippetAction = (snippet: Snippet, list: Snippet[]): SnippetsActionTypes => ({
  type: ADD_SNIPPET,
  snippet,
  list,
});

const updateSnippetAction = (snippet: Snippet, list: Snippet[]): SnippetsActionTypes => ({
  type: UPDATE_SNIPPET,
  snippet,
  list,
});

const deleteSnippetAction = (current: Snippet, list: Snippet[]): SnippetsActionTypes => ({
  type: DELETE_SNIPPET,
  current,
  list,
});

const setSearchSnippetsAction = (query: string): SnippetsActionTypes => ({
  type: SET_SEARCH_SNIPPETS,
  query,
});

export const setCurrentSnippet = (id: number): SnippetsActionTypes => ({
  type: SET_CURRENT_SNIPPET,
  id,
});

export const initSnippets = (): AppThunk<Promise<{}>> => {
  return dispatch => {
    return new Promise(resolve => {
      snippetsDb.findAll((data: SnippetInterface[]) => {
        const snippets = data.sort(sortById).map((entry: SnippetInterface) => new Snippet({ ...entry }));
        const lastId = Math.max(...snippets.map((entry: Snippet) => entry.id)) | 0;

        dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
        resolve();
      });
    });
  };
};

export const addSnippet = (): AppThunk => {
  return (dispatch, getState) => {
    const {
      snippets: { lastId, list },
    } = getState();

    const newSnippet = new Snippet({ title: 'New', id: lastId + 1 });
    const updatedList = [...list, newSnippet].sort(sortById);

    snippetsDb.add(newSnippet);
    dispatch(addSnippetAction(newSnippet, updatedList));
  };
};

export const updateSnippet = (snippet: SnippetInterface): AppThunk => {
  return (dispatch, getState) => {
    const {
      snippets: { current, list },
    } = getState();

    if (!current) {
      return;
    }

    const toUpdateIndex = list.findIndex(element => element.id === current.id);
    const updatedSnippet = new Snippet({ ...snippet, lastUpdated: new Date().toISOString() });
    const updatedList = [...list];
    updatedList[toUpdateIndex] = updatedSnippet;

    snippetsDb.update(updatedSnippet);
    dispatch(updateSnippetAction(updatedSnippet, updatedList));
  };
};

export const deleteSnippet = (): AppThunk => {
  return (dispatch, getState) => {
    const {
      snippets: { current, list },
    } = getState();

    if (!current) {
      return;
    }

    const updatedList = list.filter(element => element.id !== current.id);

    snippetsDb.remove(current.id);
    dispatch(deleteSnippetAction(updatedList[0], updatedList));
  };
};

export const setSearchSnippets = (query: string): AppThunk => {
  return dispatch => {
    dispatch(setSearchSnippetsAction(query));
  };
};

const getGist = (authToken: string, backupGistId: string): Promise<Octokit.Response<GistsGetResponse>> => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    octokit.gists
      .get({
        // eslint-disable-next-line @typescript-eslint/camelcase
        gist_id: backupGistId,
        headers: { 'If-None-Match': '' },
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateGist = (authToken: string, backupGistId: string, snippets: Snippet[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    const fileName = new Date().toISOString();
    const request = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      gist_id: backupGistId,
      files: {
        [fileName]: {
          content: JSON.stringify(snippets),
        },
      },
    };

    octokit.gists
      .update(request)
      .then(() => {
        resolve(fileName);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createGist = (
  authToken: string,
  gistDescription: string,
  snippets: Snippet[],
): Promise<Octokit.Response<GistsCreateResponse>> => {
  return new Promise((resolve, reject) => {
    const octokit = new Octokit({ auth: authToken });
    const fileName = new Date().toISOString();
    const request = {
      description: gistDescription,
      public: false,
      files: {
        [fileName]: {
          content: JSON.stringify(snippets),
        },
      },
    };

    octokit.gists
      .create(request)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const synchronizeGist = (
  backupLocalSnippets: boolean,
  authToken: string,
  backupGistId: string,
): AppThunk<Promise<{}>> => {
  return (dispatch, getState, ipcRenderer) => {
    const {
      snippets: { lastId, list },
      auth: { lastSychronizedGistDate },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      getGist(authToken, backupGistId)
        .then(response => {
          const files = Object.entries(response.data.files);
          const lastGist = files[files.length - 1];
          const gistContent = JSON.parse(lastGist[1].content);

          const lastSynchronizedGistTime = new Date(lastSychronizedGistDate).getTime();
          const gistDate = new Date(lastGist[0]);
          const gistTime = gistDate.getTime();

          const gistSourceSnippets = list.filter((snippet: Snippet) => snippet.source === sourceType.GIST);
          const localSourceSnippets = list.filter((snippet: Snippet) => snippet.source === sourceType.LOCAL);

          let id = lastId;

          if (!lastSynchronizedGistTime || gistTime > lastSynchronizedGistTime) {
            snippetsDb.removeQuery({ source: sourceType.GIST });

            const synchronized = gistContent
              .map(
                (snippet: SnippetInterface) =>
                  new Snippet({
                    ...snippet,
                    id: id++,
                    lastUpdated: gistDate.toISOString(),
                  }),
              )
              .sort(sortById);
            snippetsDb.add(synchronized);

            ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
            dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate: gistDate.toISOString() }));
            dispatch(loadSnippetsAction(synchronized, synchronized[0], id));
          } else {
            const lastUpdatedTime = Math.max(
              ...gistSourceSnippets.map((snippet: Snippet) => new Date(snippet.lastUpdated).getTime()),
            );

            const allowBackupLocalSnippets = backupLocalSnippets && localSourceSnippets.length > 0;
            if (lastUpdatedTime > lastSynchronizedGistTime || allowBackupLocalSnippets) {
              const snippets = backupLocalSnippets ? list.slice(0) : gistSourceSnippets;
              snippets.forEach(snippet => (snippet.source = sourceType.GIST));

              updateGist(authToken, backupGistId, snippets)
                .then(gistDate => {
                  snippetsDb.updateAll({ source: sourceType.GIST });
                  ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
                  dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
                })
                .catch(error => {
                  dispatch(setLoading(false));
                  reject(error);
                });
            }
          }

          dispatch(setLoading(false));
          resolve();
        })
        .catch(error => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};

export const createBackupGist = (description: string, authToken: string): AppThunk<Promise<{}>> => {
  return (dispatch, getState, ipcRenderer) => {
    const {
      snippets: { list, lastId },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const snippets = list.slice(0);
      snippets.forEach(snippet => (snippet.source = sourceType.GIST));

      createGist(authToken, description, snippets)
        .then(response => {
          const backupGistId = response.data.id;
          const gistDate = response.data.updated_at;

          ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
          snippetsDb.updateAll({ source: sourceType.GIST });

          dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
          dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
          dispatch(setLoading(false));
          resolve();
        })
        .catch(error => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};
