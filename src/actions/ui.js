const namespace = name => `UI_${name}`;

export const RESIZE_LEFT_PANEL = namespace('RESIZE_LEFT_PANEL');
export const SWITCH_THEME = namespace('SWITCH_THEME');
export const SET_LOADING = namespace('SET_LOADING');
export const SET_ERROR = namespace('SET_ERROR');

export const resizeLeftPanel = leftPanelWidth => {
  return {
    type: RESIZE_LEFT_PANEL,
    leftPanelWidth
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    loading
  }
};

export const setError = (error) => ({
  type: SET_ERROR,
  error
});

const switchThemeAction = () => {
  return {
    type: SWITCH_THEME
  };
};

export const switchTheme = () => {
  return (dispatch, _, ipcRenderer) => {
    ipcRenderer.send('SWITCH_THEME');
    dispatch(switchThemeAction());
  };
};
