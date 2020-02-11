export const APP_INIT = 'UI_APP_INIT';
export const RESIZE_LEFT_PANEL = 'UI_RESIZE_LEFT_PANEL';
export const SWITCH_THEME = 'UI_SWITCH_THEME';
export const SET_LOADING = 'UI_SET_LOADING';
export const SET_ERROR = 'UI_SET_ERROR';

export interface UIState {
  init: boolean;
  theme: string;
  leftPanelWidth: number;
  loading: boolean;
  error: string | null;
}

interface AppInitAction {
  type: typeof APP_INIT;
  init: boolean;
}

interface ResizeLeftPanelAction {
  type: typeof RESIZE_LEFT_PANEL;
  leftPanelWidth: number;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  error: string;
}

interface SwitchThemeAction {
  type: typeof SWITCH_THEME;
}

export type UIActionTypes =
  AppInitAction | ResizeLeftPanelAction |
  SetLoadingAction | SetErrorAction |
  SwitchThemeAction;
