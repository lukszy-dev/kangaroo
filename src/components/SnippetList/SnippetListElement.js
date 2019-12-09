import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Snippet from '../../models/Snippet';

import './SnippetList.scss';
import './SnippetListElement.scss';

const { remote } = window.require('electron');

const SnippetListElement = ({
  element,
  currentlySelectedId,
  handleChangeSnippet
}) => {
  const elementRef = useRef(null);
  const menu = new remote.Menu();
  const menuItem = new remote.MenuItem({
    label: 'Inspect Element ' + element.id
  });
  menu.append(menuItem)

  useEffect(() => {
    elementRef.current.addEventListener(
      'contextmenu',
      e => {
        e.preventDefault();
        console.log(e);
        menu.popup(remote.getCurrentWindow());
      },
      false
    );
  }, [menu]);
  
  const handleClick = () => {
    if (currentlySelectedId !== element.id) {
      handleChangeSnippet(element.id);
    }
  };

  return (
    <div key={element.id}>
      <div
        className={cn('SnippetListElement', { 'SnippetListElement-active': currentlySelectedId === element.id })}
        onClick={handleClick}
        ref={elementRef}
      >
        {element.title}
      </div>
      <div className="SnippetList--divider" />
    </div>
  );
};

SnippetListElement.propTypes = {
  element: PropTypes.instanceOf(Snippet),
  currentlySelectedId: PropTypes.number.isRequired,
  handleChangeSnippet: PropTypes.func.isRequired
};

export default SnippetListElement;