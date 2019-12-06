import React from 'react';
import PropTypes from 'prop-types';
import { Button, EditableText } from '@blueprintjs/core';

import Snippet from '../../models/Snippet';

import './EditorHeader.scss';

const EditorHeader = ({ snippet, onTitleChange, onDeleteSnippet }) => {
  return (
    <div className="Editor--header">
      <EditableText
        className="Editor--snippet-title"
        placeholder="Edit title..."
        minWidth={200}
        value={snippet ? snippet.title : ''}
        disabled={!snippet}
        onChange={onTitleChange}
      />
      
      <Button
        className="Editor--snippet-delete"
        small="true"
        icon="trash"
        minimal="true"
        disabled={!snippet}
        onClick={onDeleteSnippet}
      />
    </div>
  );
};

EditorHeader.propTypes = {
  snippet: PropTypes.instanceOf(Snippet),
  onTitleChange: PropTypes.func,
  onDeleteSnippet: PropTypes.func
};

export default EditorHeader;
