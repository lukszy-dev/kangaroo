import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from '@blueprintjs/core';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ query, onAddSnippet, onSearchChange, onUserToken }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userToken, setUserToken] = useState('');

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

  const handleOnUserTokenChange = (event) => {
    setUserToken(event.target.value);
  };

  const handleUserToken = () => {
    onUserToken(userToken);
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
        {/* <Button
          small="true"
          icon="search"
          minimal="true"
          style={{ marginRight: "5px" }}
          onClick={handleOpenSearch}
        /> */}

        <Button
          small="true"
          icon="person"
          minimal="true"
          style={{ marginRight: "5px" }}
          onClick={handleAccountModalOpen}
        />

        <Button
          small="true"
          icon="add-to-artifact"
          minimal="true"
          onClick={onAddSnippet}
        />
      </div>

      <ModalOverlay
        title="Account"
        isOpen={isModalOpen}
        onClose={handleAccountModalOpen}
        footer={
          <Fragment>
            <Button onClick={handleAccountModalOpen}>Close</Button>
            <Button onClick={handleUserToken}>Set</Button>
          </Fragment>
        }
      >
        <p>GitHub personal access token:</p>
        <InputGroup
          placeholder="Token"
          value={userToken}
          onChange={handleOnUserTokenChange}
        />
      </ModalOverlay>

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