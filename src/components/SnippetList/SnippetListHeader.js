import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup } from '@blueprintjs/core';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ onAddSnippet, onLogin }) => {
  const [search, setSearch] = useState('');
  
  const handleSearchOnChange = (event) => {
    const value = event.target.value;
    setSearch(value);
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
          value={search}
          onChange={handleSearchOnChange}
        />
      </div>
    </div>
  );
};

SnippetListHeader.propTypes = {
  onAddSnippet: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default SnippetListHeader;