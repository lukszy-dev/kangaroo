import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const AccountModal = ({
  token,
  gists,
  loading,
  isOpen,
  onOpen,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist
}) => {
  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState('');
  const [gistDescription, setGistDescription] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    setAuthToken(token);
    if (gists && gists.length > 0) {
      setGistId(gists[0].id);
    }
  }, [token, gists]);

  const handleAuthTokenChange = (event) => {
    setAuthToken(event.target.value);
  };

  const handleGistDescriptionChange = (event) => {
    setGistDescription(event.target.value);
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
    onCreateBackupGist(gistDescription).then(() => {
      handleClose();
    });
  };

  const handleSynchronizeGist = () => {
    onSynchronizeGist(gistId).then(() => {
      handleClose();
    })
    .catch(() => {
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
      loading: loading
    }
  }, {
    component: GistSelectorPanel,
    props: {
      remoteGists: gists,
      gistDescription: gistDescription,
      gistId: gistId,
      onGistSelect: handleGistSelect,
      onGistDescriptionChange: handleGistDescriptionChange,
      onSynchronizeGist: handleSynchronizeGist,
      onCreateGist: handleCreateGist,
      loading: loading
    }
  }];

  return (
    <ModalOverlay
      title='Connect to GitHub Gist'
      isOpen={isOpen}
      onClose={handleClose}
    >
      {renderPanel()}
    </ModalOverlay>
  );
};

AccountModal.propTypes = {
  token: PropTypes.string,
  gists: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired
};

export default AccountModal;
