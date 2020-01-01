import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';

const ModalOverlay = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  return (
    <Dialog
      className={'bp3-dark'} // TODO get from state
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};

export default ModalOverlay;
