import Octokit, { GistsListResponseItem } from '@octokit/rest';
import { AppThunk } from 'store/types';
import { setLoading } from 'store/ui/actions';

import { SET_GH_DATA, SET_GISTS, CLEAR_GH_DATA, AuthActionTypes } from './types';

export const setGitHubDataAction = (data: {
  token: string;
  backupGistId: string;
  gistDate: string;
}): AuthActionTypes => ({
  type: SET_GH_DATA,
  token: data.token,
  backupGistId: data.backupGistId,
  lastSychronizedGistDate: data.gistDate,
});

const setGistsAction = (gists: GistsListResponseItem[]): AuthActionTypes => ({
  type: SET_GISTS,
  gists,
});

const clearAuthDataAction = (): AuthActionTypes => ({
  type: CLEAR_GH_DATA,
});

export const loadAuthData = (): AppThunk => {
  return (dispatch, _, ipcRenderer): void => {
    ipcRenderer.send('LOAD_GH_DATA');
    ipcRenderer.once('LOAD_GH_DATA_REPLY', (_, data) => {
      dispatch(setGitHubDataAction(data));
    });
  };
};

export const setAuthToken = (token: string): AppThunk<Promise<GistsListResponseItem[]>> => {
  return (dispatch, getState): Promise<GistsListResponseItem[]> => {
    const {
      auth: { backupGistId },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const octokit = new Octokit({ auth: token });

      octokit.gists
        .list({
          headers: { 'If-None-Match': '' },
        })
        .then(response => {
          const gists = response.data.map((gist: GistsListResponseItem) => gist);
          const current = gists.find(gist => gist.id === backupGistId);

          dispatch(setGistsAction(current ? [current] : gists));
          dispatch(setLoading(false));
          resolve(gists);
        })
        .catch(error => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};

export const deleteAuthData = (): AppThunk => {
  return (dispatch, _, ipcRenderer): void => {
    dispatch(clearAuthDataAction());
    ipcRenderer.send('DELETE_GH_DATA');
  };
};
