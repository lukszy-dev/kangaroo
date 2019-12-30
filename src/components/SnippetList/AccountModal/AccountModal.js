import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import TokenPanel from './TokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const panels = [TokenPanel, GistSelectorPanel];

const AccountModal = ({ authState, isOpen, onOpen, onUserToken }) => {
  const [userToken, setUserToken] = useState(authState.token);
  const [step, setStep] = useState(0);

  const handleOnUserTokenChange = (event) => {
    setUserToken(event.target.value);
  };

  const handleUserToken = () => {
    onUserToken(userToken);
  };

  const handleNextStep = () => {
    if (step < panels.length - 1) {
      setStep(step + 1);
    }
  };

  const renderPanel = () => {
    return panels[step];
  };

  return (
    <ModalOverlay
      title="Account"
      isOpen={isOpen}
      onClose={onOpen}
      okButton={<Button onClick={handleNextStep} loading={authState.loading}>Set</Button>}
      cancelButton={<Button onClick={onOpen}>Close</Button>}
    >
      {renderPanel()}
    </ModalOverlay>
  );
};

AccountModal.propTypes = {
  authState: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onUserToken: PropTypes.func.isRequired
};

export default AccountModal;
