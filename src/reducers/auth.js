import {
  SET_GH_DATA,
  SET_GISTS,
  CLEAR_GH_DATA
} from '../actions/auth';

const initial = {
  token: '',
  gists: [],
  backupGistId: '',
  lastSychronizedGistDate: ''
};

export default (state = initial, action) => {
  switch (action.type) {
    case SET_GH_DATA:
      return {
        ...state,
        token: action.token,
        backupGistId: action.backupGistId,
        lastSychronizedGistDate: action.lastSychronizedGistDate
      };

    case CLEAR_GH_DATA:
      return initial;

    case SET_GISTS:
      return {
        ...state,
        gists: action.gists
      };

    default:
      return state;
  }
};
