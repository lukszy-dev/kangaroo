import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Dialog } from '@blueprintjs/core';

import AccountModal from 'components/Modal/AccountModal/AccountModal';
import ErrorModal from 'components/Modal/ErrorModal/ErrorModal';
import { RootState } from 'store/types';
import { hideModal } from 'store/modal/actions';
import { ACCOUNT_MODAL, ERROR_MODAL } from './constants';

interface ModalComponents {
  [key: string]: { title: string; component: React.ElementType };
}

const MODAL_COMPONENTS: ModalComponents = {
  [ACCOUNT_MODAL]: {
    title: 'Connect to GitHub Gist',
    component: AccountModal,
  },
  [ERROR_MODAL]: {
    title: 'Error',
    component: ErrorModal,
  },
};

const ModalOverlay: React.FC = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector((state: RootState) => state.modal);
  const { loading, theme } = useSelector((state: RootState) => state.ui);

  const handleHideModal = (): void => {
    dispatch(hideModal());
  };

  const modalTitle = (): string => {
    if (!modalType) {
      return '';
    }

    const modalConfig = MODAL_COMPONENTS[modalType];
    const modalTitle = modalConfig.title;

    return modalTitle;
  };

  const renderModalComponent = (): null | React.ReactElement => {
    if (!modalType) {
      return null;
    }

    const modalConfig = MODAL_COMPONENTS[modalType];
    const ModalComponent = modalConfig.component;

    return <ModalComponent loading={loading} onHideModal={handleHideModal} {...modalProps} />;
  };

  return (
    <Dialog
      className={classNames({ 'bp3-dark': theme === 'dark', 'bp3-focus-disabled': true })}
      title={modalTitle()}
      isOpen={Boolean(modalType)}
      onClose={handleHideModal}
    >
      {renderModalComponent()}
    </Dialog>
  );
};

export default ModalOverlay;
