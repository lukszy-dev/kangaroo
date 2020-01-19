import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const AccountModal = ({
  token,
  gists,
  ui,
  isOpen,
  onOpen,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist
}) => {
  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState(gists && gists[0] ? gists[0].id : '');
  const [gistDescription, setGistDescription] = useState('');
  const [step, setStep] = useState(token ? 1 : 0);

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

  const handleOnOpening = () => {
    if (authToken) {
      onSetAuthToken(authToken);
    }
  };

  const handleClose = () => {
    setStep(authToken ? 1 : 0);
    onOpen();
  };

  const renderPanel = () => {
    const panel = panels[step];
    if (panel) {
      return panel.component(panel.props);
    }
    return null;
  };

  const panels = [{
    component: AuthTokenPanel,
    props: {
      authToken: authToken,
      onAuthTokenChange: handleAuthTokenChange,
      onAccept: handleAuthToken,
      loading: ui.loading
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
      loading: ui.loading
    }
  }];

  return (
    <ModalOverlay
      title='Connect to GitHub Gist'
      isOpen={isOpen}
      onOpening={handleOnOpening}
      onClose={handleClose}
      theme={ui.theme}
    >
      {renderPanel()}
    </ModalOverlay>
  );
};

AccountModal.propTypes = {
  token: PropTypes.string,
  gists: PropTypes.array,
  ui: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired
};

export default AccountModal;
