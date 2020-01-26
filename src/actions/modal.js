const namespace = name => `MODAL_${name}`;

export const SHOW_MODAL = namespace('SHOW_MODAL');
export const HIDE_MODAL = namespace('HIDE_MODAL');

export const showModal = (modalType, modalProps) => ({
  type: SHOW_MODAL,
  modalType,
  modalProps
});

export const hideModal = () => ({
  type: HIDE_MODAL
});