import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';

const ModalOverlay = ({
  isOpen,
  onClose,
  onOpening,
  title,
  theme,
  children
}) => {
  return (
    <Dialog
      className={theme === 'dark' ? 'bp3-dark' : ''}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onOpening={onOpening}
    >
      {children}
    </Dialog>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpening: PropTypes.func,
  title: PropTypes.string,
  theme: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ModalOverlay;
