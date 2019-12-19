import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Classes } from '@blueprintjs/core';

const ModalOverlay = ({ isOpen, title, content }) => {
  return (
    <Dialog
      className={'bp3-dark'}
      title='Account'
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        <p>Hello World!</p>
      </div>
    </Dialog>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.element
};

export default ModalOverlay;
