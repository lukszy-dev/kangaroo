export const SHOW_MODAL = 'MODAL_SHOW_MODAL';
export const HIDE_MODAL = 'MODAL_HIDE_MODAL';

export interface ModalState {
  modalType: string;
  modalProps: {};
}

interface ShowModalAction {
  type: typeof SHOW_MODAL;
  modalType: string;
  modalProps: {};
}

interface HideModalAction {
  type: typeof HIDE_MODAL;
}

export type ModalActionTypes = ShowModalAction | HideModalAction;
