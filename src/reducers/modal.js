import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal';

const initial = {
  modalType: null,
  modalProps: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      };

    case HIDE_MODAL:
      return initial;

    default:
      return state;
  }
};
