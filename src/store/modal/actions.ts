import { SHOW_MODAL, HIDE_MODAL, ModalActionTypes, ModalProps } from './types';

export const showModal = (modalType: string, modalProps: ModalProps): ModalActionTypes => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = (): ModalActionTypes => ({
  type: HIDE_MODAL,
});
