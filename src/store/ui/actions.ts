import { ThemeType } from 'components/Theme/Theme';
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

    const newTheme = theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;

    ipcRenderer.invoke('SWITCH_THEME', newTheme).then(() => {
      dispatch(switchThemeAction(newTheme));
    });
  };
};

export const loadTheme = (): AppThunk => {
  return (dispatch, _getState, ipcRenderer): void => {
    ipcRenderer.invoke('GET_THEME').then((theme) => {
      dispatch(switchThemeAction(theme));
    });
  };
};
