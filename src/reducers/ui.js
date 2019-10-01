import {
  RESIZE_LEFT_PANEL,
  SET_RESIZER_POSITION,
  SWITCH_THEME,
  SHOW_MODAL
} from '../actions/ui';

const initial = {
  theme: 'dark',
  leftPanelWidth: 200,
  resizerPosition: 198,
  modalVisible: false,
  modalType: null
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

    case SWITCH_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };

    case SHOW_MODAL:
      return {
        ...state,
        modalVisible: action.modalVisible,
        modalType: action.modalType
      }

    default:
      return state;
  }
}