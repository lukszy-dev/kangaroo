import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { Icon } from '@blueprintjs/core';

import { Tag, TAGS } from 'models/tags';

import './TagBar.scss';

type TagBarProps = {
  tags?: string;
  className?: string;
  onSelect: (tag: string, remove: boolean) => void;
};

const TagBar: React.FC<TagBarProps> = ({ tags, className, onSelect }) => {
  const handleOnSelect = (tag: string, remove: boolean) => (): void => {
    onSelect(tag, remove);
  };

  const renderColorTag = (tag: Tag): ReactElement => {
    const selectedTags = tags?.split(',') || [];
    const isSelected = selectedTags && selectedTags.includes(tag.key);

    return (
      <div key={tag.key} className="ColorTag--wrapper">
        <div style={{ background: tag.color }} className="ColorTag--tag" onClick={handleOnSelect(tag.key, isSelected)}>
          <Icon className="ColorTag--action-icon" iconSize={16} icon={isSelected ? 'small-cross' : 'small-plus'} />
        </div>
      </div>
    );
  };

  const styles = classNames('TagBar--container', className);

  return <div className={styles}>{TAGS.map((tag) => renderColorTag(tag))}</div>;
};

export default TagBar;
