import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteSnippet, setCurrentSnippet } from '../../actions/snippets';
import { Icon } from "@blueprintjs/core";

import './SnippetListContainer.css';

const SnippetListContainer = () => {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.snippets.list);
  const current = useSelector(state => state.snippets.current);

  const handleChangeSnippet = id => {
    dispatch(setCurrentSnippet(id));
  };

  const handleDeleteSnippet = id => {
    dispatch(deleteSnippet(id));
  };

  const renderElements = () => {
    return elements && elements.map((element) => { 
      return (
        <div key={element.id}>
          <div className={`SnippetListContainer--element ${current.id === element.id ? 'SnippetListContainer--element-active' : null}`} onClick={() => handleChangeSnippet(element.id)}>
            {element.title}
            <Icon className="SnippetListContainer--element-delete" icon="trash" onClick={() => handleDeleteSnippet(element.id)} />
          </div>
          <div className="SnippetListContainer--divider" />
        </div>
      );
    });
  };

  return (
    <div className="SnippetListContainer--container">
      <div className="SnippetListContainer--list">
        <div className="SnippetListContainer--divider" />
        { renderElements() }
      </div>
    </div>
  );
};

export default SnippetListContainer;