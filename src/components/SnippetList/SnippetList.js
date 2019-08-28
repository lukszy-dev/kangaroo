import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@blueprintjs/core';

import { setCurrentSnippet, addSnippet } from '../../actions/snippets';
import { resizeLeftPanel } from '../../actions/ui';
import SnippetListElement from './SnippetListElement';
import Resizer from './Resizer';

import './SnippetList.scss';

const SnippetList = () => {
  const dispatch = useDispatch();

  const { leftPanelWidth } = useSelector(state => state.ui);
  const { current, list } = useSelector(state => state.snippets);

  const resizerXPosition = React.useRef(null);
  const panelWidth = React.useRef(null);

  const handleOnMouseDown = event => {
    resizerXPosition.current = event.clientX;
    panelWidth.current = event.clientX;
  };

  const handleChangeSnippet = id => {
    dispatch(setCurrentSnippet(id));
  };

  const handleAddSnippet = () => {
    dispatch(addSnippet());
  };

  useEffect(() => {
    function mouseUp() {
      resizerXPosition.current = null;
    }
  
    function mouseMove(event) {
      if (!resizerXPosition.current) {
        return;
      }
  
      const newPosition = panelWidth.current + event.clientX - resizerXPosition.current;
      // TODO Remove hardcoded values.
      if (newPosition <= 600) {
        dispatch(resizeLeftPanel(Math.max(200, newPosition)));
      }
    }

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);

    return () => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    }
  }, [dispatch]);

  const renderElements = () => {
    return list.map((element) => {
      return (
        <SnippetListElement
          key={element.id}
          element={element}
          currentlySelectdId={current.id}
          handleChangeSnippet={handleChangeSnippet}
        />
      );
    });
  };

  return (
    <div style={{width: leftPanelWidth, minWidth: 200}} className="SnippetList--container">
      <div className="SnippetList--header">
        <Button
          small="true"
          icon="plus"
          minimal="true"
          onClick={handleAddSnippet}
        />
      </div>

      <div className="SnippetList--list">
        <div className="SnippetList--divider" />
        { list && renderElements() }
      </div>
      
      <Resizer onMouseDown={handleOnMouseDown} />
    </div>
  );
};

export default SnippetList;