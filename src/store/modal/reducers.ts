import { SHOW_MODAL, HIDE_MODAL, ModalState, ModalActionTypes } from './types';

const initialState: ModalState = {
  modalType: '',
  modalProps: {}
};

export const modalReducer = (
  state = initialState,
  action: ModalActionTypes
): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      };

    case HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
};
