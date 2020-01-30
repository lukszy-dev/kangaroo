import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { showModal } from 'actions/modal';
import { ERROR_MODAL } from 'components/Modal/ModalOverlay/constants';

import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const STEPS = {
  AUTH_TOKEN: 0,
  GIST_SELECTOR: 1
};

const AccountModal = ({
  onHideModal,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist,
  onDeleteAuthData
}) => {
  const dispatch = useDispatch();
  const { token, backupGistId, gists } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.ui);

  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState(gists.length > 0 ? gists[0].id : '');
  const [gistDescription, setGistDescription] = useState('');
  const [step, setStep] = useState(token ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);

  const handleAuthTokenChange = ({ target: { value } }) => {
    setAuthToken(value);
  };

  const handleGistDescriptionChange = ({ target: { value } }) => {
    setGistDescription(value);
  };

  const handleGistSelect = ({ currentTarget: { value } }) => {
    setGistId(value);
  };

  const handleAuthToken = () => {
    onSetAuthToken(authToken).then(() => {
      nextStep();
    });
  };

  const handleCreateGist = () => {
    onCreateBackupGist(gistDescription, authToken).then(() => {
      handleClose();
    });
  };

  const handleSynchronizeGist = (action) => {
    onSynchronizeGist(action, authToken, gistId).then(() => {
      handleClose();
    }).catch(error => {
      handleClose();
      dispatch(showModal(ERROR_MODAL, { error }));
    });
  };

  const handleDeleteAuthData = () => {
    onDeleteAuthData();
    handleClose();
  };

  const nextStep = () => {
    if (step < panels.length - 1) {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setStep(authToken ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);
    onHideModal();
  };

  const renderPanel = () => {
    const panel = panels[step];
    return panel ? panel.component(panel.props) : null;
  };

  const panels = [{
    component: AuthTokenPanel,
    props: {
      authToken: authToken,
      onAuthTokenChange: handleAuthTokenChange,
      onAccept: handleAuthToken,
      loading
    }
  }, {
    component: GistSelectorPanel,
    props: {
      remoteGists: gists,
      gistDescription: gistDescription,
      gistId: gistId,
      backupGistId: backupGistId,
      onGistSelect: handleGistSelect,
      onGistDescriptionChange: handleGistDescriptionChange,
      onSynchronizeGist: handleSynchronizeGist,
      onCreateGist: handleCreateGist,
      onDeleteAuthData: handleDeleteAuthData,
      loading
    }
  }];

  return (
    <>
      {renderPanel()}
    </>
  );
};

AccountModal.propTypes = {
  onHideModal: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired,
  onDeleteAuthData: PropTypes.func.isRequired
};

export default AccountModal;
