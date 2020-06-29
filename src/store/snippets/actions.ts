import Snippet, { SnippetInterface, sourceType } from 'models/Snippet';
import { AppThunk } from 'store/types';
import { setLoading } from 'store/ui/actions';
import { setGitHubDataAction } from 'store/auth/actions';
import { snippetsDb } from 'db/snippets';
import { sortById } from 'utils/utils';
import { getGist, updateGist, createGist } from 'utils/gistActions';

import {
  LOAD_SNIPPETS,
  ADD_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
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

export const setCurrentSnippet = (id: number): SnippetsActionTypes => ({
  type: SET_CURRENT_SNIPPET,
  id,
});

export const initSnippets = (): AppThunk<Promise<{}>> => {
  return (dispatch): Promise<{}> => {
    return new Promise((resolve, reject) => {
      try {
        snippetsDb.findAll((data: SnippetInterface[]) => {
          const snippets = data.sort(sortById).map((entry: SnippetInterface) => new Snippet({ ...entry }));
          const lastId = Math.max(...snippets.map((entry: Snippet) => entry.id)) | 0;

          dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  };
};

export const addSnippet = (): AppThunk => {
  return (dispatch, getState): void => {
    const {
      snippets: { lastId, list },
    } = getState();

    const newSnippet = new Snippet({ title: 'New', id: lastId + 1 });
    const updatedList = [...list, newSnippet].sort(sortById);

    snippetsDb.add(newSnippet);
    dispatch(addSnippetAction(newSnippet, updatedList));
  };
};

export const updateSnippet = (properties: { [key: string]: unknown }): AppThunk => {
  return (dispatch, getState): void => {
    const {
      snippets: { current, list },
    } = getState();

    if (!current) {
      return;
    }

    const toUpdateIndex = list.findIndex((element) => element.id === current.id);
    const updatedSnippet = new Snippet({ ...current, ...properties, lastUpdated: new Date().toISOString() });
    const updatedList = [...list];
    updatedList[toUpdateIndex] = updatedSnippet;

    snippetsDb.update(updatedSnippet);
    dispatch(updateSnippetAction(updatedSnippet, updatedList));
  };
};

export const deleteSnippet = (): AppThunk => {
  return (dispatch, getState): void => {
    const {
      snippets: { current, list },
    } = getState();

    if (!current) {
      return;
    }

    const updatedList = list.filter((element) => element.id !== current.id);

    snippetsDb.remove(current.id);
    dispatch(deleteSnippetAction(updatedList[0], updatedList));
  };
};

export const synchronizeGist = (
  backupLocalSnippets: boolean,
  authToken: string,
  backupGistId: string,
): AppThunk<Promise<string>> => {
  return (dispatch, getState, ipcRenderer): Promise<string> => {
    const {
      snippets: { lastId, list },
      auth: { lastSychronizedGistDate },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      getGist(authToken, backupGistId)
        .then(async (response) => {
          const files = Object.entries(response.data.files);
          const lastGist = files[files.length - 1];

          const lastSynchronizedGistTime = new Date(lastSychronizedGistDate).getTime();
          const gistDate = new Date(lastGist[0]);

          if (!lastSynchronizedGistTime || gistDate.getTime() > lastSynchronizedGistTime) {
            let id = lastId;

            const gistContent = JSON.parse(lastGist[1].content);
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

            snippetsDb.removeQuery({ source: sourceType.GIST });
            snippetsDb.add(synchronized);

            dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate: gistDate.toISOString() }));
            dispatch(loadSnippetsAction(synchronized, synchronized[0], id));

            ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
          } else {
            const gistSourceSnippets = list.filter((snippet: Snippet) => snippet.source === sourceType.GIST);
            const snippets = backupLocalSnippets ? list.slice(0) : gistSourceSnippets;

            snippets.forEach((snippet) => (snippet.source = sourceType.GIST));

            await updateGist(authToken, backupGistId, snippets).then((gistDate) => {
              snippetsDb.updateAll({ source: sourceType.GIST });
              dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
              ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
            });
          }

          dispatch(setLoading(false));
          resolve();
        })
        .catch((error) => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};

export const createBackupGist = (description: string, authToken: string): AppThunk<Promise<{}>> => {
  return (dispatch, getState, ipcRenderer): Promise<string> => {
    const {
      snippets: { list, lastId },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const snippets = list.slice(0);
      snippets.forEach((snippet) => (snippet.source = sourceType.GIST));

      createGist(authToken, description, snippets)
        .then((response) => {
          const backupGistId = response.data.id;
          const gistDate = response.data.updated_at;

          ipcRenderer.send('SET_GH_DATA', { token: authToken, backupGistId, gistDate });
          snippetsDb.updateAll({ source: sourceType.GIST });

          dispatch(setGitHubDataAction({ token: authToken, backupGistId, gistDate }));
          dispatch(loadSnippetsAction(snippets, snippets[0], lastId));
          dispatch(setLoading(false));
          resolve();
        })
        .catch((error) => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};
