import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Snippet from '../../models/Snippet';

import './SnippetList.scss';
import './SnippetListElement.scss';

const SnippetListElement = ({ element, currentlySelectdId, handleChangeSnippet }) => {
  const handleClick = () => {
    handleChangeSnippet(element.id);
  };

  return (
    <div key={element.id}>
      <div
        className={cn('SnippetListElement', { 'SnippetListElement-active': currentlySelectdId === element.id })}
        onClick={handleClick}
      >
        {element.title}
      </div>
      <div className="SnippetList--divider" />
    </div>
  );
};

SnippetListElement.propTypes = {
  element: PropTypes.instanceOf(Snippet),
  currentlySelectdId: PropTypes.number.isRequired,
  handleChangeSnippet: PropTypes.func.isRequired
};

export default SnippetListElement;