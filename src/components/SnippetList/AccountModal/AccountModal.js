import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const AccountModal = ({
  authState,
  isOpen,
  onOpen,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist
}) => {
  const [authToken, setAuthToken] = useState(authState.token);
  const [gistId, setGistId] = useState('');
  const [gistName, setGistName] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    setAuthToken(authState.token);
    if (authState.gists && authState.gists.length > 0) {
      setGistId(authState.gists[0].id);
    }
  }, [authState.token, authState.gists]);

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
      handleClose();
    });
  };

  const handleSynchronizeGist = () => {
    onSynchronizeGist(gistId).then(() => {
      handleClose();
    });
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
      gistId: gistId,
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
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired
};

export default AccountModal;
