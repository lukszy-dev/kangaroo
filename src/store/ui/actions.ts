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

const switchThemeAction = (theme: string): UIActionTypes => {
  return {
    type: SWITCH_THEME,
    theme,
  };
};

export const switchTheme = (): AppThunk => {
  return (dispatch, getState, ipcRenderer): void => {
    const {
      ui: { theme },
    } = getState();

    const newTheme = theme === 'dark' ? 'light' : 'dark';

    ipcRenderer.send('SWITCH_THEME', newTheme);
    dispatch(switchThemeAction(newTheme));
  };
};

export const loadTheme = (): AppThunk => {
  return (dispatch, _getState, ipcRenderer): void => {
    ipcRenderer.send('GET_THEME');
    ipcRenderer.once('GET_THEME_REPLY', (_event, theme) => {
      dispatch(switchThemeAction(theme));
    });
  };
};
