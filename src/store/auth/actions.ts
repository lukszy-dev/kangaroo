import { GistsListResponseData } from '@octokit/types';

import { AppThunk } from 'store/types';
import { setLoading } from 'store/ui/actions';
import { listGists } from 'utils/gistActions';

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

const setGistsAction = (gists: GistsListResponseData): AuthActionTypes => ({
  type: SET_GISTS,
  gists,
});

const clearAuthDataAction = (): AuthActionTypes => ({
  type: CLEAR_GH_DATA,
});

export const loadAuthData = (): AppThunk => {
  return (dispatch, _getState, ipcRenderer): void => {
    ipcRenderer.send('LOAD_GH_DATA');
    ipcRenderer.once('LOAD_GH_DATA_REPLY', (_event, data) => {
      dispatch(setGitHubDataAction(data));
    });
  };
};

export const setAuthToken = (token: string): AppThunk<Promise<GistsListResponseData>> => {
  return (dispatch, getState): Promise<GistsListResponseData> => {
    const {
      auth: { backupGistId },
    } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      listGists(token)
        .then((response) => {
          const gists = response.data;
          const current = gists.find((gist) => gist.id === backupGistId);

          dispatch(setGistsAction(current ? [current] : gists));
          dispatch(setLoading(false));
          resolve(gists);
        })
        .catch((error) => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
  };
};

export const deleteAuthData = (): AppThunk => {
  return (dispatch, _getState, ipcRenderer): void => {
    dispatch(clearAuthDataAction());
    ipcRenderer.send('DELETE_GH_DATA');
  };
};
