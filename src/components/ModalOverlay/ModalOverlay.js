import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';

const ModalOverlay = ({
  isOpen,
  onClose,
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
    >
      {children}
    </Dialog>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  theme: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ModalOverlay;
