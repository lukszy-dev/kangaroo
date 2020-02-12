import { AppThunk } from 'store/types';

import { APP_INIT, RESIZE_LEFT_PANEL, SET_LOADING, SET_ERROR, SWITCH_THEME, UIActionTypes } from './types';

export const appInit = (init: boolean): UIActionTypes => {
  return {
    type: APP_INIT,
    init,
  };
};

export const resizeLeftPanel = (leftPanelWidth: number): UIActionTypes => {
  return {
    type: RESIZE_LEFT_PANEL,
    leftPanelWidth,
  };
};

export const setLoading = (loading: boolean): UIActionTypes => {
  return {
    type: SET_LOADING,
    loading,
  };
};

export const setError = (error: string): UIActionTypes => ({
  type: SET_ERROR,
  error,
});

const switchThemeAction = (): UIActionTypes => {
  return {
    type: SWITCH_THEME,
  };
};

export const switchTheme = (): AppThunk => {
  return (dispatch, _, ipcRenderer) => {
    ipcRenderer.send('SWITCH_THEME');
    dispatch(switchThemeAction());
  };
};
