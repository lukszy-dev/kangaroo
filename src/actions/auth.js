import { STATUS_CODES } from 'http';
import Octokit from '@octokit/rest';
import Gist from '../models/Gist';

import { setLoading, setError } from './ui';

const namespace = name => `AUTH_${name}`;

export const SET_GH_AUTH_DATA = namespace('SET_GH_AUTH_DATA');
export const SET_GISTS = namespace('SET_GISTS');
export const SET_BACKUP_GIST_ID = namespace('SET_BACKUP_GIST_ID');
export const SET_ERROR = namespace('SET_ERROR');

const setAuthDataAction = (data) => ({
  type: SET_GH_AUTH_DATA,
  token: data.token,
  backupGistId: data.backupGistId
});

const setGistsAction = (gists) => ({
  type: SET_GISTS,
  gists
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
  return (dispatch, _, ipcRenderer) => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true));

      const octokit = new Octokit({ auth: token });

      octokit.gists.list()
        .then(response => {
          ipcRenderer.send('SET_GH_AUTH_DATA', { token });
          const gists = response.data.map(gist => new Gist(gist));
          dispatch(setGistsAction(gists));
          dispatch(setLoading(false));
          resolve();
        })
        .catch(error => {
          console.error(error);
          dispatch(setError(STATUS_CODES[error.status]));
          dispatch(setLoading(false));
          reject();
        });
    });
  };
};

export const deleteAuthData = () => {
  return (dispatch, _, ipcRenderer) => {
    dispatch(setAuthDataAction({ token: '', backupGistId: '' }));
    ipcRenderer.send('DELETE_GH_AUTH_DATA');
  };
};
