import {
  RESIZE_LEFT_PANEL,
  SWITCH_THEME,
  SET_LOADING,
  SET_ERROR
} from '../actions/ui';

const initial = {
  theme: 'dark',
  leftPanelWidth: 200,
  loading: false,
  error: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case RESIZE_LEFT_PANEL:
      return {
        ...state,
        leftPanelWidth: action.leftPanelWidth
      };

    case SWITCH_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
