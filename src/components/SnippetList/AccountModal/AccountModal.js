import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const STEPS = {
  AUTH_TOKEN: 0,
  GIST_SELECTOR: 1
};

const AccountModal = ({
  ui,
  isOpen,
  onOpen,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist
}) => {
  const { token, gists } = useSelector(state => state.auth);

  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState(gists.length > 0 ? gists[0].id : '');
  const [gistDescription, setGistDescription] = useState('');
  const [step, setStep] = useState(token ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);

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
    }).catch(() => {
      handleClose();
    });
  };

  const nextStep = () => {
    if (step < panels.length - 1) {
      setStep(step + 1);
    }
  };

  const handleOnOpening = () => {
    // if (authToken) {
    //   onSetAuthToken(authToken).then(gists => {
    //     setGistId(gists.length > 0 ? gists[0].id : '');
    //   });
    // }
  };

  const handleClose = () => {
    setStep(authToken ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);
    onOpen();
  };

  const renderPanel = () => {
    console.log('test');
    const panel = panels[step];
    return panel ? panel.component(panel.props) : null;
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
      {isOpen && renderPanel()}
    </ModalOverlay>
  );
};

AccountModal.propTypes = {
  ui: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired
};

export default AccountModal;
