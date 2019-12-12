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
        />

        <Button
          small="true"
          icon="add-to-artifact"
          minimal="true"
          onClick={onAddSnippet}
        />
      </div>

      <div className="SnippetListHeader--container bottom">
        <InputGroup
          leftIcon="search"
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