import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core';

import { showModal } from 'actions/modal';
import { ACCOUNT_MODAL } from 'components/Modal/ModalOverlay/constants';

import './SnippetListHeader.scss';

const SnippetListHeader = ({
  query,
  onAddSnippet,
  onSearchChange,
  onSetAuthToken,
  onCreateBackupGist,
  onSynchronizeGist,
  onDeleteAuthData
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const handleSearchOnChange = ({ target: { value } }) => {
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleAccountModalOpen = () => {
    const dispatchShowModalAction = () => {
      dispatch(showModal(ACCOUNT_MODAL, {
        onSetAuthToken,
        onSynchronizeGist,
        onCreateBackupGist,
        onDeleteAuthData
      }));
    };

    if (!token) {
      dispatchShowModalAction();
      return;
    }

    onSetAuthToken(token).then(() => {
      dispatchShowModalAction();
    });
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

SnippetListHeader.propTypes = {
  query: PropTypes.string.isRequired,
  onAddSnippet: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSetAuthToken: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateBackupGist: PropTypes.func.isRequired,
  onDeleteAuthData: PropTypes.func.isRequired
};

export default SnippetListHeader;
