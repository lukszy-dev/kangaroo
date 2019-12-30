import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';

import AccountModal from './AccountModal/AccountModal';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ query, onAddSnippet, onSearchChange, onUserToken }) => {
  const auth = useSelector(state => state.auth);

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

  const handleUserToken = (token) => {
    onUserToken(token);
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

  return (
    <div className="SnippetListHeader">
      <div className="SnippetListHeader--container">
        <ButtonGroup minimal={true}>
          <Button
            icon="person"
            onClick={handleAccountModalOpen}
          />

          <Button
            icon="add-to-artifact"
            onClick={onAddSnippet}
          />
        </ButtonGroup>
      </div>

      <AccountModal
        authState={auth}
        isOpen={isModalOpen}
        onOpen={handleAccountModalOpen}
        onUserToken={handleUserToken}
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
  onUserToken: PropTypes.func.isRequired
};

export default SnippetListHeader;