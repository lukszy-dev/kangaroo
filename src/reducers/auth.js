import { LOADING, SET_GH_AUTH_TOKEN, SET_GISTS, SET_BACKUP_GIST_ID, SET_ERROR } from '../actions/auth';

const initial = {
  loading: false,
  token: '',
  gists: [],
  backupGistId: '',
  error: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading
      };
    
    case SET_GH_AUTH_TOKEN:
      return {
        ...state,
        token: action.token,
        loading: false
      };

    case SET_GISTS:
      return {
        ...state,
        gists: action.gists,
        loading: false
      };

    case SET_BACKUP_GIST_ID:
      return {
        ...state,
        backupGistId: action.backupGistId,
        loading: false
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
};
