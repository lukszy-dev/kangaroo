import Octokit from '@octokit/rest';
import Gist from '../models/Gist';

import { setLoading } from './ui';

const namespace = name => `AUTH_${name}`;

export const SET_GH_AUTH_DATA = namespace('SET_GH_AUTH_DATA');
export const SET_GISTS = namespace('SET_GISTS');
export const SET_BACKUP_GIST_ID = namespace('SET_BACKUP_GIST_ID');
export const CLEAR_GH_AUTH_DATA = namespace('CLEAR_GH_AUTH_DATA');

export const setAuthDataAction = (data) => ({
  type: SET_GH_AUTH_DATA,
  token: data.token,
  backupGistId: data.backupGistId
});

const setGistsAction = (gists) => ({
  type: SET_GISTS,
  gists
});

const clearAuthDataAction = () => ({
  type: CLEAR_GH_AUTH_DATA
});

export const loadAuthData = () => {
  return (dispatch, _, ipcRenderer) => {
    ipcRenderer.send('LOAD_GH_AUTH_DATA');
    ipcRenderer.once('LOAD_GH_AUTH_DATA_REPLY', (_, data) => {
      dispatch(setAuthDataAction(data));
    });
  };
};

export const setAuthToken = (token) => {
  return (dispatch, getState) => {
    const { auth: { backupGistId } } = getState();

    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const octokit = new Octokit({ auth: token });

      octokit.gists.list({
        headers: { 'If-None-Match': '' }
      }).then(response => {
        const gists = response.data.map(gist => new Gist(gist));
        const current = gists.find(gist => gist.id === backupGistId);

        dispatch(setGistsAction(current ? [current] : gists));
        dispatch(setLoading(false));
        resolve(gists);
      }).catch(error => {
        dispatch(setLoading(false));
        reject(error);
      });
    });
  };
};

export const deleteAuthData = () => {
  return (dispatch, _, ipcRenderer) => {
    dispatch(clearAuthDataAction());
    ipcRenderer.send('DELETE_GH_AUTH_DATA');
  };
};
