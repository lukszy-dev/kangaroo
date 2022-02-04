import { ReactElement } from 'react';
import { Icon } from '@blueprintjs/core';

import { Tag, TAGS } from 'models/tags';

import styles from './TagBar.module.scss';

type TagBarProps = {
  tags?: string;
  onSelect: (tag: string, remove: boolean) => void;
};

const TagBar: React.FC<TagBarProps> = ({ tags, onSelect }) => {
  const handleOnSelect = (tag: string, remove: boolean) => (): void => {
    onSelect(tag, remove);
  };

  const renderColorTag = (tag: Tag): ReactElement => {
    const selectedTags = tags?.split(',') || [];
    const isSelected = selectedTags && selectedTags.includes(tag.key);

    return (
      <div key={tag.key} className={styles.wrapper}>
        <div style={{ background: tag.color }} className={styles.tag} onClick={handleOnSelect(tag.key, isSelected)}>
          <Icon className={styles.actionIcon} iconSize={16} icon={isSelected ? 'small-cross' : 'small-plus'} />
        </div>
      </div>
    );
  };

  return <div className={styles.container}>{TAGS.map((tag) => renderColorTag(tag))}</div>;
};

export default TagBar;
