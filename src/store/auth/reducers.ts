import { SET_GH_DATA, SET_GISTS, CLEAR_GH_DATA, AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
  token: '',
  gists: [],
  backupGistId: '',
  lastSychronizedGistDate: '',
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_GH_DATA:
      return {
        ...state,
        token: action.token,
        backupGistId: action.backupGistId,
        lastSychronizedGistDate: action.lastSychronizedGistDate,
      };

    case SET_GISTS:
      return {
        ...state,
        gists: action.gists,
      };

    case CLEAR_GH_DATA:
      return initialState;

    default:
      return state;
  }
};
