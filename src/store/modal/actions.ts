import { SHOW_MODAL, HIDE_MODAL, ModalActionTypes } from './types';

export const showModal = (modalType: string, modalProps: {}): ModalActionTypes => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = (): ModalActionTypes => ({
  type: HIDE_MODAL,
});
