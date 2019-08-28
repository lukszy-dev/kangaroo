const namespace = name => `UI_${name}`;

export const RESIZE_LEFT_PANEL = namespace('RESIZE_LEFT_PANEL');
export const SET_RESIZER_POSITION = namespace('SET_RESIZER_POSITION');

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