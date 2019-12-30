import { STATUS_CODES } from 'http';
import Gist from '../models/Gist';
import httpCodeResolver from '../utils/httpCodeResolver';

const namespace = name => `AUTH_${name}`;

export const LOADING = namespace('LOADING');
export const SET_USER_TOKEN = namespace('SET_USER_TOKEN');
export const SET_GISTS = namespace('SET_GISTS');
export const SET_ERROR = namespace('SET_ERROR');

const loadingAction = (loading) => ({
  type: LOADING,
  loading
});

const setUserTokenAction = (token) => ({
  type: SET_USER_TOKEN,
  token
});

const setGistsAction = (gists) => ({
  type: SET_GISTS,
  gists
});

const setErrorAction = (error) => ({
  type: SET_ERROR,
  error
});

export const loadUserToken = () => {
  return (dispatch, _, ipcRenderer) => {
    ipcRenderer.send('LOAD_USER_TOKEN');
    ipcRenderer.once('LOAD_USER_TOKEN_REPLY', (_, token) => {
      dispatch(setUserTokenAction(token));
    });
  };
};

export const setUserToken = (token) => {
  return (dispatch, _, ipcRenderer) => {
    dispatch(loadingAction(true));
    ipcRenderer.send('USER_TOKEN', token);
    ipcRenderer.once('USER_TOKEN_REPLY', (_, response) => {
      const code = response.status;
      httpCodeResolver(
        code,
        () => {
          const gists = response.data.map(gist => new Gist(gist));
          dispatch(setGistsAction(gists));
        },
        () => dispatch(setErrorAction(STATUS_CODES[code]))
      );
    });
  };
};
