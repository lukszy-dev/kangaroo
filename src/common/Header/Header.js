import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addSnippet, deleteSnippet, updateSnippet } from '../../actions/snippets';
import { Button, Icon, EditableText } from "@blueprintjs/core";

import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.snippets.current);

  const handleAddSnippet = () => {
    dispatch(addSnippet());
  };

  const handleDeleteSnippet = id => {
    dispatch(deleteSnippet(id));
  };

  const handleTitleChange = (value) => {
    dispatch(updateSnippet({ ...current, title: value }));
  }

  return (
    <div className="Header--container">
      <div className="Header">
        <Button small="true" icon="plus" onClick={handleAddSnippet}>Add</Button>
        { current &&
          <Fragment>
            <EditableText className="Header--snippet-title" onChange={handleTitleChange}
              placeholder="Edit title..." minWidth={200} value={current.title}
            />
            <Icon className="SnippetListElement-delete" icon="trash" onClick={() => handleDeleteSnippet(current.id)} />
          </Fragment>
        }
      </div>
    </div>
  );
}

export default Header;