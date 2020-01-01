import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';
import MethodPanel from './MethodPanel';

const AccountModal = ({ authState, isOpen, onOpen, onSetAuthToken, onSetBackupGist }) => {
  const [gistId, setGistId] = useState(authState.backupGistId);
  const [authToken, setAuthToken] = useState(authState.token);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setAuthToken(authState.token);
  }, [authState.token]);

  const handleAuthToken = (authToken) => {
    onSetAuthToken(authToken).then(() => {
      nextStep();
    });
  };

  const handleSelectGist = () => {
    // setGistId()
    console.log('test');
  };

  const nextStep = () => {
    if (step < panels.length - 1) {
      setStep(step + 1);
    }
  };

  const renderPanel = () => {
    const panel = panels[step];
    if (panel) {
      return panel.component(panel.props);
    }
    return null;
  };

  const handleClose = () => {
    setStep(0);
    onOpen();
  };

  const panels = [{
    component: AuthTokenPanel,
    props: {
      authToken: authToken,
      onAccept: handleAuthToken,
      loading: authState.loading
    }
  },{
    component: MethodPanel,
    props: {}
  }, {
    component: GistSelectorPanel,
    props: {
      gists: authState.gists
    }
  }];

  return (
    <ModalOverlay
      title="Connect to GitHub Gist"
      isOpen={isOpen}
      onClose={handleClose}
    >
      {renderPanel()}
    </ModalOverlay>
  );
};

AccountModal.propTypes = {
  authState: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSetBackupGist: PropTypes.func
};

export default AccountModal;
