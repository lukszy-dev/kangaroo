const namespace = name => `UI_${name}`;

export const SHOW_MODAL = namespace('SHOW_MODAL');
export const RESIZE_LEFT_PANEL = namespace('RESIZE_LEFT_PANEL');
export const SET_RESIZER_POSITION = namespace('SET_RESIZER_POSITION');
export const SWITCH_THEME = namespace('SWITCH_THEME');

export const resizeLeftPanel = leftPanelWidth => {
  return {
    type: RESIZE_LEFT_PANEL,
    leftPanelWidth
  }
};

export const setResizerPosition = resizerPosition => {
  return {
    type: SET_RESIZER_POSITION,
    resizerPosition
  }
};

const switchThemeAction = () => {
  return {
    type: SWITCH_THEME
  }
};

export const showModal = (modalVisible = false, modalType = '') => {
  return {
    type: SHOW_MODAL,
    modalVisible,
    modalType
  }
};

export const switchTheme = () => {
  return (dispatch, getState, ipcRenderer) => {
    ipcRenderer.send('SWITCH_THEME');
    dispatch(switchThemeAction());
  };
}
