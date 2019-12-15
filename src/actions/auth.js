const namespace = name => `AUTH_${name}`;

export const INIT_LOGIN = namespace('INIT_LOGIN');
export const SET_USER = namespace('SET_USER');

const initLoginAction = () => ({
  type: INIT_LOGIN
});

const setUserAction = (token) => ({
  type: SET_USER,
  token
});

export const initLogin = () => {
  return (dispatch, getState, ipcRenderer) => {
    ipcRenderer.send('AUTH_LOGIN');
    dispatch(initLoginAction());
  };
};

export const setUser = (token) => {
  return (dispatch) => {
    dispatch(setUserAction(token));
  };
};
