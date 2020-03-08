import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';

import { RootState } from 'store/types';
import { showModal } from 'store/modal/actions';
import { ACCOUNT_MODAL } from 'components/Modal/ModalOverlay/constants';

import './SnippetListHeader.scss';

type SnippetListHeaderProps = {
  query: string;
  onAddSnippet: () => void;
  onSearchChange: (value: string) => void;
  onSetAuthToken: (token: string) => Promise<{}>;
  onCreateBackupGist: (description: string, token: string) => Promise<{}>;
  onSynchronizeGist: (backupLocalSnippets: boolean, token: string, id: string) => Promise<{}>;
  onDeleteAuthData: () => void;
};

const SnippetListHeader: React.FC<SnippetListHeaderProps> = ({
  query,
  onAddSnippet,
  onSearchChange,
  onSetAuthToken,
  onCreateBackupGist,
  onSynchronizeGist,
  onDeleteAuthData,
}: SnippetListHeaderProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

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
          onSetAuthToken,
          onSynchronizeGist,
          onCreateBackupGist,
          onDeleteAuthData,
        }),
      );
    };

    if (!token) {
      dispatchShowModalAction();
      return;
    }

    onSetAuthToken(token).then(() => {
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
          <Button icon="person" onClick={handleAccountModalOpen} />

          <Button icon="add-to-artifact" onClick={onAddSnippet} />
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

export default SnippetListHeader;
