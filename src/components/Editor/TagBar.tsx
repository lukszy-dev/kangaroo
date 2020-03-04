import React from 'react';
import { Tag } from '@blueprintjs/core';

import './TagBar.scss';

type TagBarProps = {
  tags: string[];
  onEditTag: () => void;
};

const TagBar = ({ tags, onEditTag }: TagBarProps): React.ReactElement => {
  const renderTags = () => {
    if (!tags || tags.length < 1) {
      return null;
    }

    return tags.slice(0, 3).map((item, index) => {
      return (
        <Tag
          key={index}
          onClick={() => console.log(item)}
          interactive={true}
          minimal={true}
          style={{ marginRight: '3px' }}
        >
          {item}
        </Tag>
      );
    });
  };

  const renderTagOverflowButton = () => {
    if (!tags || tags.length < 4) {
      return null;
    }

    return <Tag minimal={true} interactive={true} icon="more" style={{ marginRight: '3px' }} />;
  };

  return (
    <div className="TagBar--container">
      {renderTags()}
      {renderTagOverflowButton()}

      <Tag minimal={true} interactive={true} icon="tag" style={{ marginLeft: tags ? '20px' : '' }} onClick={onEditTag}>
        Edit tags...
      </Tag>
    </div>
  );
};

export default TagBar;
