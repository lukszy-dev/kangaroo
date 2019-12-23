import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ query, onAddSnippet, onSearchChange, onUserToken }) => {
  const auth = useSelector(state => state.auth);

  const [isModalOpen, setModalOpen] = useState(false);
  const [userToken, setUserToken] = useState(auth.token);

  useEffect(() => {
    setUserToken(auth.token);
  }, [auth.token]);

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

  const renderAccountModal = () => {
    return (
      <ModalOverlay
        title="Account"
        isOpen={isModalOpen}
        onClose={handleAccountModalOpen}
        footer={
          <Fragment>
            <Button onClick={handleAccountModalOpen}>Close</Button>
            <Button onClick={handleUserToken} loading={auth.loading}>Set</Button>
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
    );
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

      {renderAccountModal()}

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