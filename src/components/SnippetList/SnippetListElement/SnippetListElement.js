import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@blueprintjs/core';

import Snippet, { sourceType } from '../../../models/Snippet';

import './SnippetListElement.scss';

const SnippetListElement = ({
  element,
  currentlySelectedId,
  onChangeSnippet,
  onContextMenu
}) => {
  const handleClick = () => {
    if (currentlySelectedId !== element.id) {
      onChangeSnippet(element.id);
    }
  };

  const handleContextMenu = () => {
    handleClick();
    onContextMenu(element.id);
  };

  const listElementClass = classNames({
    'SnippetListElement': true,
    'active': currentlySelectedId === element.id,
    'bp3-text-muted': currentlySelectedId !== element.id
  });

  return (
    <div
      key={element.id}
      className={listElementClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="SnippetListElement--content">
        {element.title}
        {element.source === sourceType.GIST && (
          <Icon className="SnippetListElement--source-icon" icon="cloud" />
        )}
      </div>
    </div>
  );
};

SnippetListElement.propTypes = {
  element: PropTypes.instanceOf(Snippet).isRequired,
  currentlySelectedId: PropTypes.number.isRequired,
  onChangeSnippet: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
};

export default SnippetListElement;
