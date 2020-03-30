import React from 'react';
import classNames from 'classnames';
import { Icon } from '@blueprintjs/core';

import Snippet, { sourceType } from '../../../models/Snippet';

import './SnippetListElement.scss';

type SnippetListElementProps = {
  element: Snippet;
  currentlySelectedId: number | null;
  onChangeSnippet: (id: number) => void;
  onContextMenu: (id: number) => void;
};

const SnippetListElement: React.FC<SnippetListElementProps> = ({
  element,
  currentlySelectedId,
  onChangeSnippet,
  onContextMenu,
}: SnippetListElementProps) => {
  const handleClick = (): void => {
    if (currentlySelectedId !== element.id) {
      onChangeSnippet(element.id);
    }
  };

  const handleContextMenu = (): void => {
    handleClick();
    onContextMenu(element.id);
  };

  const renderTags = (): React.ReactElement[] | null => {
    if (!element.tags) {
      return null;
    }

    const MAX_TAG_COUNT = 3;
    const tags = element.getColorTags();
    const recent = tags.slice(Math.max(tags.length - MAX_TAG_COUNT, 0));

    return recent.map((tag, index) => {
      return (
        <div
          key={index}
          style={{ background: `${tag}`, top: `${6 + 8 * index}px` }}
          className="SnippetListElement--tag"
        />
      );
    });
  };

  const listElementClass = classNames({
    SnippetListElement: true,
    active: currentlySelectedId === element.id,
    'bp3-text-muted': currentlySelectedId !== element.id,
  });

  return (
    <div key={element.id} className={listElementClass} onClick={handleClick} onContextMenu={handleContextMenu}>
      <div className="SnippetListElement--content">
        <span className="bp3-text-overflow-ellipsis">{element.title}</span>
        {/* {element.source === sourceType.GIST && <Icon className="SnippetListElement--source-icon" icon="cloud" />} */}
        {renderTags()}
      </div>
    </div>
  );
};

export default SnippetListElement;
