const namespace = name => `AUTH_${name}`;

export const INIT_LOGIN = namespace('INIT_LOGIN');
export const SET_USER_TOKEN = namespace('SET_USER_TOKEN');

const initLoginAction = () => ({
  type: INIT_LOGIN
});

const setUserTokenAction = (token) => ({
  type: SET_USER_TOKEN,
  token
});

export const initLogin = () => {
  return (dispatch) => {
    dispatch(initLoginAction());
  };
};

export const setUserToken = (token) => {
  return (dispatch, getState, ipcRenderer) => {
    ipcRenderer.send('USER_TOKEN', token);
    dispatch(setUserTokenAction(token));
  };
};
