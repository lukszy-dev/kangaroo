import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Classes } from '@blueprintjs/core';

const ModalOverlay = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <Dialog
      className={'bp3-dark'}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={Classes.DIALOG_BODY}>
        {children}
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          {footer}
        </div>
      </div>
    </Dialog>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node
};

export default ModalOverlay;
