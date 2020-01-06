import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@blueprintjs/core';

import Snippet, { sourceType } from '../../models/Snippet';

import './SnippetList.scss';
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
    'SnippetListElement-active': currentlySelectedId === element.id,
    'bp3-text-muted': currentlySelectedId !== element.id
  });

  return (
    <div key={element.id}>
      <div
        className={listElementClass}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {element.title}
        {element.source === sourceType.GIST && (
          <Button icon="cloud" minimal={true} />
        )}
      </div>
      <div className="SnippetList--divider" />
    </div>
  );
};

SnippetListElement.propTypes = {
  element: PropTypes.instanceOf(Snippet),
  currentlySelectedId: PropTypes.number.isRequired,
  onChangeSnippet: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
};

export default SnippetListElement;