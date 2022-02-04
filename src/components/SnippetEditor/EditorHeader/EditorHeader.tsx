import { memo } from 'react';
import { H3, EditableText } from '@blueprintjs/core';

import styles from './EditorHeader.module.scss';

type EditorHeaderProps = {
  snippetId?: number;
  snippetTitle?: string;
  onTitleChange: (value: string) => void;
};

const EditorHeader: React.FC<EditorHeaderProps> = ({ snippetId, snippetTitle = '', onTitleChange }) => (
  <div className={styles.container}>
    <H3>
      <EditableText
        className={styles.snippetTitle}
        placeholder="Edit title..."
        minWidth={200}
        value={snippetTitle}
        disabled={!snippetId}
        onChange={onTitleChange}
        alwaysRenderInput={true}
      />
    </H3>
  </div>
);

export default memo(EditorHeader);
