import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SnippetListHeader from './SnippetListHeader';
import SnippetListElement from './SnippetListElement';
import ScrollableWrapper from './ScrollableWrapper';
import Resizer from './Resizer';

import {
  setCurrentSnippet,
  addSnippet,
  deleteSnippet,
  setSearchSnippets
} from '../../actions/snippets';
import { resizeLeftPanel } from '../../actions/ui';
import { setAuthToken, createBackupGist, synchronizeGist } from '../../actions/auth';

import './SnippetList.scss';

const { remote } = window.require('electron');

const SnippetList = () => {
  const dispatch = useDispatch();

  const { leftPanelWidth } = useSelector(state => state.ui);
  const { current, list, query } = useSelector(state => state.snippets);

  const resizerXPosition = React.useRef(null);
  const panelWidth = React.useRef(null);

  const menu = new remote.Menu();
  const menuItem = new remote.MenuItem({
    label: 'Delete',
    click: () => handleDeleteSnippet()
  });
  menu.append(menuItem)

  const handleOnMouseDown = event => {
    resizerXPosition.current = event.clientX;
    panelWidth.current = event.clientX;
  };

  const handleElementContextMenu = () => {
    menu.popup(remote.getCurrentWindow());
  };

  const handleChangeSnippet = id => {
    dispatch(setCurrentSnippet(id));
  };

  const handleAddSnippet = () => {
    dispatch(addSnippet());
  };

  const handleDeleteSnippet = () => {
    dispatch(deleteSnippet());
  };

  const handleSearchChange = (value) => {
    dispatch(setSearchSnippets(value));
  };

  const handleSetAuthToken = (token) => {
    return dispatch(setAuthToken(token));
  };

  const handleCreateBackupGist = () => {
    return dispatch(createBackupGist());
  };

  const handleSynchronizeGist = (id) => {
    return dispatch(synchronizeGist(id));
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
      // TODO Remove hardcoded values
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
    const filterd = list.filter((element) => element.title.includes(query));

    return filterd.map((element) => {
      return (
        <SnippetListElement
          key={element.id}
          element={element}
          currentlySelectedId={current.id}
          onChangeSnippet={handleChangeSnippet}
          onContextMenu={handleElementContextMenu}
        />
      );
    });
  };

  return (
    <div
      style={{ width: leftPanelWidth, minWidth: 200 }}
      className="SnippetList--container"
    >
      <SnippetListHeader
        query={query}
        onAddSnippet={handleAddSnippet}
        onSearchChange={handleSearchChange}
        onSetAuthToken={handleSetAuthToken}
        onCreateBackupGist={handleCreateBackupGist}
        onSynchronizeGist={handleSynchronizeGist}
      />

      { list && (
        <ScrollableWrapper bottomShadow={false} alwaysOn={true}>
          { renderElements() }
        </ScrollableWrapper>
      )}

      <Resizer onMouseDown={handleOnMouseDown} />
    </div>
  );
};

export default SnippetList;