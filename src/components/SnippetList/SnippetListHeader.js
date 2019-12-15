import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from '@blueprintjs/core';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ query, onAddSnippet, onSearchChange, onLogin }) => {  
  const handleSearchOnChange = (event) => {
    const value = event.target.value;
    onSearchChange(value);
  };
  
  // const handleOpenSearch = () => {
  //   dispatch(showModal(true));
  // };

  const handleClearSearch = () => {
    onSearchChange('');
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
          onClick={onLogin}
          disabled={true}
        />

        <Button
          small="true"
          icon="add-to-artifact"
          minimal="true"
          onClick={onAddSnippet}
        />
      </div>

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
  onLogin: PropTypes.func.isRequired
};

export default SnippetListHeader;