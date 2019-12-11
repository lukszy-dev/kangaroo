import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

import './SnippetListHeader.scss';

const SnippetListHeader = ({ onAddSnippet, onLogin }) => {
  // const handleOpenSearch = () => {
  //   dispatch(showModal(true));
  // };

  return (
    <div className="SnippetListHeader">
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
  );
};

SnippetListHeader.propTypes = {
  onAddSnippet: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default SnippetListHeader;