import React from 'react';
import PropTypes from 'prop-types';
import { EditableText, Tag } from '@blueprintjs/core';

import Snippet from '../../models/Snippet';

import './EditorHeader.scss';

const EditorHeader = ({ snippet, onTitleChange }) => {
  // const tags = ['Java', 'JavaScript', 'XML', 'SQL', 'HTML', 'TypeScript', 'C#', 'Markdown'];

  // const visibleItemRenderer = (item, index) => {
  //   return <Tag key={index} style={{ marginRight: '3px' }}>{item}</Tag>;
  // };

  // const overflowRenderer = (overflowItems) => {
  //   console.log(overflowItems);
  //   return <Tag icon="more" style={{ marginRight: '3px' }} />
  // };

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

      {/*
      <OverflowList
        items={tags}
        visibleItemRenderer={visibleItemRenderer}
        overflowRenderer={overflowRenderer}
      />
      */}
    </div>
  );
};

EditorHeader.propTypes = {
  snippet: PropTypes.instanceOf(Snippet),
  onTitleChange: PropTypes.func
};

export default EditorHeader;
