import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@blueprintjs/core';

import AccountModal from 'components/Modal/AccountModal/AccountModal';
import { hideModal } from 'actions/modal';
import { ACCOUNT_MODAL } from './constants';

const MODAL_COMPONENTS = {
  [ACCOUNT_MODAL]: {
    title: 'Connect to GitHub Gist',
    component: AccountModal
  }
};

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector(state => state.modal);
  const { loading, theme } = useSelector(state => state.ui);

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const modalTitle = () => {
    if (!modalType) {
      return '';
    }

    const modalConfig = MODAL_COMPONENTS[modalType];
    const modalTitle = modalConfig.title;

    return modalTitle;
  };

  const renderModalComponent = () => {
    if (!modalType) {
      return null;
    }

    const modalConfig = MODAL_COMPONENTS[modalType];
    const ModalComponent = modalConfig.component;

    return (
      <ModalComponent
        loading={loading}
        onHideModal={handleHideModal}
        {...modalProps}
      />
    );
  };

  return (
    <Dialog
      className={theme === 'dark' ? 'bp3-dark' : ''}
      title={modalTitle()}
      isOpen={modalType !== null}
      onClose={handleHideModal}
    >
      {renderModalComponent()}
    </Dialog>
  );
};

export default ModalOverlay;
