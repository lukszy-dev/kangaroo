import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';

import AccountModal from '../AccountModal/AccountModal';

import './SnippetListHeader.scss';

const SnippetListHeader = ({
  query,
  onAddSnippet,
  onSearchChange,
  onSetAuthToken,
  onCreateBackupGist,
  onSynchronizeGist
}) => {
  const { token, gists, backupGistId } = useSelector(state => state.auth);
  const ui = useSelector(state => state.ui);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearchOnChange = (event) => {
    const value = event.target.value;
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleAccountModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSetAuthToken = (token) => {
    return onSetAuthToken(token);
  };

  const handleCreateBackupGist = (description) => {
    return onCreateBackupGist(description);
  };

  const handleSynchronizeGist = (id) => {
    return onSynchronizeGist(id);
  };

  const renderClearSearchButton = () => {
    if (query) {
      return (
        <Button
          icon="cross"
          minimal="true"
          onClick={handleClearSearch}
        />
      );
    }
  };

  const renderAccountButton = () => {
    return (
      <Button
        icon={backupGistId ? 'user' : 'person'} // TODO
        onClick={handleAccountModalOpen}
      />
    );
  };

  return (
    <div className="SnippetListHeader">
      <div className="SnippetListHeader--container">
        <ButtonGroup minimal={true}>
          {renderAccountButton()}

          <Button
            icon="add-to-artifact"
            onClick={onAddSnippet}
          />
        </ButtonGroup>
      </div>

      <AccountModal
        token={token}
        gists={gists}
        ui={ui}
        isOpen={isModalOpen}
        onOpen={handleAccountModalOpen}
        onSetAuthToken={handleSetAuthToken}
        onSynchronizeGist={handleSynchronizeGist}
        onCreateBackupGist={handleCreateBackupGist}
      />

      <div className="SnippetListHeader--search-container">
        <InputGroup
          leftIcon="search"
          placeholder="Search"
          rightElement={renderClearSearchButton()}
          fill={true}
          value={query}
          onChange={handleSearchOnChange}
        />
      </div>
    </div>
  );
};

SnippetListHeader.propTypes = {
  query: PropTypes.string.isRequired,
  onAddSnippet: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired
};

export default SnippetListHeader;