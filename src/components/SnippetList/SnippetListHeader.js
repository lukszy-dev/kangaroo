import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

import Snippet from '../../models/Snippet';

import './SnippetListHeader.scss';

const SnippetListHeader = ({
  snippet,
  onAddSnippet,
  onDeleteSnippet,
  onLogin
}) => {
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
      />

      <Button
        small="true"
        icon="person"
        minimal="true"
        style={{ marginRight: "5px" }}
        onClick={onLogin}
      />

      <Button
        className="Editor--snippet-delete"
        small="true"
        icon="trash"
        minimal="true"
        disabled={!snippet}
        onClick={onDeleteSnippet}
      /> */}

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
  snippet: PropTypes.instanceOf(Snippet),
  onAddSnippet: PropTypes.func.isRequired,
  onDeleteSnippet: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default SnippetListHeader;