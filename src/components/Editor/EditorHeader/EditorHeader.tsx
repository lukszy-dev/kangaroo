import React from 'react';
import { H3, EditableText } from '@blueprintjs/core';

import Snippet from '../../../models/Snippet';

import './EditorHeader.scss';

type EditorHeaderProps = {
  snippet: Snippet | null;
  onTitleChange: (value: string) => void;
};

const EditorHeader: React.FC<EditorHeaderProps> = ({ snippet, onTitleChange }: EditorHeaderProps) => {
  return (
    <div className="Editor--header">
      <H3>
        <EditableText
          className="Editor--snippet-title"
          placeholder="Edit title..."
          minWidth={200}
          value={snippet ? snippet.title : ''}
          disabled={!snippet}
          onChange={onTitleChange}
          alwaysRenderInput={true}
        />
      </H3>
    </div>
  );
};

export default EditorHeader;
