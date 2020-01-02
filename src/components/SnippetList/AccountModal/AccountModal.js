import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const AccountModal = ({ authState, isOpen, onOpen, onSetAuthToken, onSynchronizeGist, onCreateBackupGist }) => {
  const [authToken, setAuthToken] = useState(authState.token);
  const [gistId, setGistId] = useState('');
  const [gistName, setGistName] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    setAuthToken(authState.token);
  }, [authState.token]);

  const handleAuthTokenChange = (event) => {
    setAuthToken(event.target.value);
  };

  const handleGistNameChange = (event) => {
    setGistName(event.target.value);
  };

  const handleGistSelect = (event) => {
    setGistId(event.currentTarget.value);
  };

  const handleAuthToken = () => {
    onSetAuthToken(authToken).then(() => {
      nextStep();
    });
  };

  const handleCreateGist = () => {
    onCreateBackupGist(gistName).then(() => {
      handleClose(); // TODO
    });
  };

  const handleSynchronizeGist = () => {
    onSynchronizeGist(gistId);
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
      onAuthTokenChange: handleAuthTokenChange,
      onAccept: handleAuthToken,
      loading: authState.loading
    }
  }, {
    component: GistSelectorPanel,
    props: {
      remoteGists: authState.gists,
      gistName: gistName,
      onGistSelect: handleGistSelect,
      onGistNameChange: handleGistNameChange,
      onSynchronizeGist: handleSynchronizeGist,
      onCreateGist: handleCreateGist
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
  onSynchronizeGist: PropTypes.func,
  onCreateBackupGist: PropTypes.func
};

export default AccountModal;
