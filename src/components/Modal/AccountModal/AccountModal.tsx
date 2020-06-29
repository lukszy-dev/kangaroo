import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GistsListResponseData } from '@octokit/types';

import { RootState } from 'store/types';
import { showModal } from 'store/modal/actions';
import { ERROR_MODAL } from 'components/Modal/ModalOverlay/constants';

import AuthTokenPanel from './AuthTokenPanel';
import GistSelectorPanel from './GistSelectorPanel';

const STEPS = {
  AUTH_TOKEN: 0,
  GIST_SELECTOR: 1,
};

type AccountModalProps = {
  onHideModal: () => void;
  onSetAuthToken: (token: string) => Promise<GistsListResponseData>;
  onSynchronizeGist: (backupLocalSnippets: boolean, token: string, id: string) => Promise<{}>;
  onCreateBackupGist: (description: string, token: string) => Promise<{}>;
  onDeleteAuthData: () => void;
};

const AccountModal: React.FC<AccountModalProps> = ({
  onHideModal,
  onSetAuthToken,
  onSynchronizeGist,
  onCreateBackupGist,
  onDeleteAuthData,
}) => {
  const dispatch = useDispatch();

  const { token, backupGistId, gists, lastSychronizedGistDate } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.ui);

  const [authToken, setAuthToken] = useState(token);
  const [gistId, setGistId] = useState(gists.length > 0 ? gists[0].id : '');
  const [gistDescription, setGistDescription] = useState('');
  const [backupLocalSnippets, setBackupLocalSnippets] = useState(false);
  const [step, setStep] = useState(token ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);

  const handleAuthTokenChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAuthToken(event.target.value);
  };

  const handleGistDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setGistDescription(event.target.value);
  };

  const handleBackupLocalSnippetsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBackupLocalSnippets(event.target.checked);
  };

  const handleGistSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setGistId(event.currentTarget.value);
  };

  const handleAuthToken = (): void => {
    onSetAuthToken(authToken).then((gists) => {
      setGistId(gists.length > 0 ? gists[0].id : '');
      nextStep();
    });
  };

  const handleCreateGist = (): void => {
    onCreateBackupGist(gistDescription, authToken).then(() => {
      handleClose();
    });
  };

  const handleSynchronizeGist = (): void => {
    onSynchronizeGist(backupLocalSnippets, authToken, gistId)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        handleClose();
        dispatch(showModal(ERROR_MODAL, { error }));
      });
  };

  const handleDeleteAuthData = (): void => {
    onDeleteAuthData();
    handleClose();
  };

  const nextStep = (): void => {
    if (step < panels.length - 1) {
      setStep(step + 1);
    }
  };

  const handleClose = (): void => {
    setStep(authToken ? STEPS.GIST_SELECTOR : STEPS.AUTH_TOKEN);
    onHideModal();
  };

  const renderPanel = (): React.ReactElement | null => {
    const panelConfig = panels[step];

    if (!panelConfig) {
      return null;
    }

    const Panel = panelConfig.component;
    const panelProps = panelConfig.props;

    return Panel ? <Panel {...panelProps} /> : null;
  };

  const panels: { component: React.ElementType; props: {} }[] = [
    {
      component: AuthTokenPanel,
      props: {
        authToken: authToken,
        onAuthTokenChange: handleAuthTokenChange,
        onAccept: handleAuthToken,
        loading,
      },
    },
    {
      component: GistSelectorPanel,
      props: {
        remoteGists: gists,
        gistDescription: gistDescription,
        gistId: gistId,
        backupGistId: backupGistId,
        backupLocalSnippets: backupLocalSnippets,
        lastSychronizedGistDate: lastSychronizedGistDate,
        onGistSelect: handleGistSelect,
        onGistDescriptionChange: handleGistDescriptionChange,
        onBackupLocalSnippetsChange: handleBackupLocalSnippetsChange,
        onSynchronizeGist: handleSynchronizeGist,
        onCreateGist: handleCreateGist,
        onDeleteAuthData: handleDeleteAuthData,
        loading,
      },
    },
  ];

  return <>{renderPanel()}</>;
};

export default AccountModal;
