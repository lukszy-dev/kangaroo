import { STATUS_CODES } from 'http';
import Gist from '../models/Gist';
import httpCodeResolver from '../utils/httpCodeResolver';

const namespace = name => `AUTH_${name}`;

export const LOADING = namespace('LOADING');
export const SET_GH_AUTH_TOKEN = namespace('SET_GH_AUTH_TOKEN');
export const SET_GISTS = namespace('SET_GISTS');
export const SET_BACKUP_GIST_ID = namespace('SET_BACKUP_GIST_ID');
export const SET_ERROR = namespace('SET_ERROR');

const loadingAction = (loading) => ({
  type: LOADING,
  loading
});

const setAuthTokenAction = (token) => ({
  type: SET_GH_AUTH_TOKEN,
  token
});

const setGistsAction = (gists) => ({
  type: SET_GISTS,
  gists
});

const setBackupGistIdAction = (id) => ({
  type: SET_BACKUP_GIST_ID,
  backupGistId: id
});

const setErrorAction = (error) => ({
  type: SET_ERROR,
  error
});

export const loadAuthToken = () => {
  return (dispatch, _, ipcRenderer) => {
    ipcRenderer.send('LOAD_GH_AUTH_TOKEN');
    ipcRenderer.once('LOAD_GH_AUTH_TOKEN_REPLY', (_, token) => {
      dispatch(setAuthTokenAction(token));
    });
  };
};

export const createBackupGist = () => {
  return (dispatch, _, ipcRenderer) => {
    return new Promise((resolve, reject) => {
      dispatch(loadingAction(true));
      ipcRenderer.send('CREATE_GH_GIST', { name: 'Test' });
      ipcRenderer.once('CREATE_GH_GIST_REPLY', (_, response) => {
        const code = response.status;
        httpCodeResolver(
          code,
          () => {
            console.log(response.data);
            resolve();
          },
          () => {
            dispatch(setErrorAction(STATUS_CODES[code]));
            reject();
          }
        );
      });
    });
  };
};

export const synchronizeGist = (id) => {
  return (dispatch, _, ipcRenderer) => {
    return new Promise((resolve, reject) => {
      dispatch(loadingAction(true));
      ipcRenderer.send('SYNCHRONIZE_GH_GIST', id);
      ipcRenderer.once('SYNCHRONIZE_GH_GIST_REPLY', (_, response) => {
        const code = response.status;
        httpCodeResolver(
          code,
          () => {
            console.log(response);
            resolve();
          },
          () => {
            dispatch(setErrorAction(STATUS_CODES[code]));
            reject();
          }
        );
      });
      dispatch(setBackupGistIdAction(id));
    });
  };
};

export const setAuthToken = (token) => {
  return (dispatch, _, ipcRenderer) => {
    return new Promise((resolve, reject) => {
      dispatch(loadingAction(true));
      ipcRenderer.send('SET_GH_AUTH_TOKEN', token);
      ipcRenderer.once('SET_GH_AUTH_TOKEN_REPLY', (_, response) => {
        const code = response.status;
        httpCodeResolver(
          code,
          () => {
            const gists = response.data.map(gist => new Gist(gist));
            dispatch(setGistsAction(gists));
            resolve();
          },
          () => {
            dispatch(setErrorAction(STATUS_CODES[code]));
            reject();
          }
        );
      });
    });
  };
};
