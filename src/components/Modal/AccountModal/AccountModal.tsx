import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GistsListResponseItem } from '@octokit/rest';

import { RootState } from 'store/types';
import { showModal } from 'store/modal/actions';
import { ERROR_MODAL } from 'components/Modal/ModalOverlay/constants';

import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const STEPS = {
  AUTH_TOKEN: 0,
  GIST_SELECTOR: 1
};

type AccountModalProps = {
  onHideModal: () => void;
  onSetAuthToken: (token: string) => Promise<GistsListResponseItem[]>;
  onSynchronizeGist: (backupLocalSnippets: boolean, token: string, id: string) => Promise<{}>;
  onCreateBackupGist: (description: string, token: string) => Promise<{}>;
  onDeleteAuthData: () => void;
}

const AccountModal = ({
  onHideModal,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist,
  onDeleteAuthData
}: AccountModalProps) => {
  const dispatch = useDispatch();
  const { token, backupGistId, gists } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.ui);

  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState(gists.length > 0 ? gists[0].id : '');
  const [gistDescription, setGistDescription] = useState('');
  const [backupLocalSnippets, setBackupLocalSnippets] = useState(false);
  const [step, setStep] = useState(token ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);

  const handleAuthTokenChange = ({ target: { value } }: any) => {
    setAuthToken(value);
  };

  const handleGistDescriptionChange = ({ target: { value } }: any) => {
    setGistDescription(value);
  };

  const handleBackupLocalSnippetsChange = ({ target: { checked } }: any) => {
    setBackupLocalSnippets(checked);
  };

  const handleGistSelect = ({ currentTarget: { value } }: any) => {
    setGistId(value);
  };

  const handleAuthToken = () => {
    onSetAuthToken(authToken).then(gists => {
      setGistId(gists.length > 0 ? gists[0].id : '')
      nextStep();
    });
  };

  const handleCreateGist = () => {
    onCreateBackupGist(gistDescription, authToken).then(() => {
      handleClose();
    });
  };

  const handleSynchronizeGist = () => {
    onSynchronizeGist(backupLocalSnippets, authToken, gistId).then(() => {
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

  const panels: Array<{ component: any, props: any }> = [{
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
      overwriteSnippets: backupLocalSnippets,
      onGistSelect: handleGistSelect,
      onGistDescriptionChange: handleGistDescriptionChange,
      onBackupLocalSnippetsChange: handleBackupLocalSnippetsChange,
      onSynchronizeGist: handleSynchronizeGist,
      onCreateGist: handleCreateGist,
      onDeleteAuthData: handleDeleteAuthData,
      loading
    }
  }];

  return (
    <>{renderPanel()}</>
  );
};

export default AccountModal;
