import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';
import { GistsListResponseData } from '@octokit/types';

import { RootState, AppDispatch } from 'store/types';
import { showModal } from 'store/modal/actions';
import { setAuthToken, deleteAuthData } from 'store/auth/actions';
import { synchronizeGist, createBackupGist, addSnippet } from 'store/snippets/actions';
import { ACCOUNT_MODAL } from 'components/Modal/ModalOverlay/constants';

import './SnippetListHeader.scss';

type SnippetListHeaderProps = {
  query: string;
  onSearchChange: (value: string) => void;
};

const SnippetListHeader: React.FC<SnippetListHeaderProps> = ({ query, onSearchChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleAddSnippet = (): void => {
    dispatch(addSnippet());
  };

  const handleDeleteAuthData = (): void => {
    dispatch(deleteAuthData());
  };

  const handleSetAuthToken = (token: string): Promise<GistsListResponseData> => {
    return dispatch(setAuthToken(token));
  };

  const handleCreateBackupGist = (description: string, token: string): Promise<string> => {
    return dispatch(createBackupGist(description, token));
  };

  const handleSynchronizeGist = (backupLocalSnippets: boolean, token: string, id: string): Promise<string> => {
    return dispatch(synchronizeGist(backupLocalSnippets, token, id));
  };

  const handleSearchOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(value);
  };

  const handleClearSearch = (): void => {
    onSearchChange('');
  };

  const handleAccountModalOpen = (): void => {
    const dispatchShowModalAction = (): void => {
      dispatch(
        showModal(ACCOUNT_MODAL, {
          onSetAuthToken: handleSetAuthToken,
          onSynchronizeGist: handleSynchronizeGist,
          onCreateBackupGist: handleCreateBackupGist,
          onDeleteAuthData: handleDeleteAuthData,
        }),
      );
      setLoading(false);
    };

    setLoading(true);

    if (!token) {
      dispatchShowModalAction();
      return;
    }

    handleSetAuthToken(token).then(() => {
      dispatchShowModalAction();
    });
  };

  const renderClearSearchButton = (): React.ReactElement | undefined => {
    if (query) {
      return <Button icon="cross" minimal={true} onClick={handleClearSearch} />;
    }
  };

  return (
    <div className="SnippetListHeader">
      <div className="SnippetListHeader--container">
        <ButtonGroup minimal={true}>
          <Button icon="person" loading={loading} onClick={handleAccountModalOpen} />
          <Button icon="add-to-artifact" onClick={handleAddSnippet} />
        </ButtonGroup>
      </div>

      <div className="SnippetListHeader--search-container">
        <InputGroup
          leftIcon="search"
          placeholder="Search..."
          rightElement={renderClearSearchButton()}
          fill={true}
          value={query}
          onChange={handleSearchOnChange}
        />
      </div>
    </div>
  );
};

export default memo(SnippetListHeader);
