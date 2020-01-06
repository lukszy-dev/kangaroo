import {
  SET_GH_AUTH_DATA,
  SET_GISTS,
  SET_BACKUP_GIST_ID
} from '../actions/auth';

const initial = {
  token: '',
  gists: [],
  backupGistId: ''
};

export default (state = initial, action) => {
  switch (action.type) {
    case SET_GH_AUTH_DATA:
      return {
        ...state,
        token: action.token,
        backupGistId: action.backupGistId
      };

    case SET_GISTS:
      return {
        ...state,
        gists: action.gists
      };

    case SET_BACKUP_GIST_ID:
      return {
        ...state,
        backupGistId: action.backupGistId
      };

    default:
      return state;
  }
};
