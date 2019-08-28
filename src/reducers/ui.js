import {
  RESIZE_LEFT_PANEL,
  SET_RESIZER_POSITION
} from '../actions/ui';

const initial = {
  theme: 'dark',
  leftPanelWidth: 200,
  resizerPosition: 198
};

export default (state = initial, action) => {
  switch (action.type) {
    case RESIZE_LEFT_PANEL:
      return {
        ...state,
        leftPanelWidth: action.leftPanelWidth
      };

    case SET_RESIZER_POSITION:
      return {
        ...state,
        resizerPosition: action.resizerPosition
      };

    default:
      return state;
  }
}