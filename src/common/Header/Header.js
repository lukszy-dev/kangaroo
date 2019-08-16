import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addSnippet, updateSnippet } from '../../actions/snippets';
import { Button, EditableText } from "@blueprintjs/core";

import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.snippets.current);

  const handleAddSnippet = () => {
    dispatch(addSnippet());
  };

  const handleTitleChange = (value) => {
    dispatch(updateSnippet({ ...current, title: value }));
  }

  return (
    <div className="Header--container">
      <div className="Header">
        <Button small="true" icon="plus" onClick={handleAddSnippet}>Add</Button>
        <EditableText className="Header--snippet-title" onChange={handleTitleChange}
          placeholder="Edit title..." minWidth={200} value={current.title}
        />
      </div>
    </div>
  );
}

export default Header;