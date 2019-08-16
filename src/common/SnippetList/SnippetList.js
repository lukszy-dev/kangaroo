import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentSnippet } from '../../actions/snippets';
import SnippetListElement from './SnippetListElement';

import './SnippetList.css';

const SnippetList = () => {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.snippets.list);
  const current = useSelector(state => state.snippets.current);

  const handleChangeSnippet = id => {
    dispatch(setCurrentSnippet(id));
  };

  const renderElements = () => {
    return elements && elements.map((element) => { 
      return (
        <SnippetListElement
          element={element}
          current={current}
          handleChangeSnippet={handleChangeSnippet}
        />
      );
    });
  };

  return (
    <div className="SnippetList--container">
      <div className="SnippetList--list">
        <div className="SnippetList--divider" />
        { renderElements() }
      </div>
    </div>
  );
};

export default SnippetList;