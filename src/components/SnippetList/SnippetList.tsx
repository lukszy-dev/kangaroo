import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { GistsListResponseItem } from '@octokit/rest';
import { remote } from 'electron';

import SnippetListHeader from './SnippetListHeader/SnippetListHeader';
import SnippetListElement from './SnippetListElement/SnippetListElement';
import ScrollableWrapper from './ScrollableWrapper';
import Resizer from './Resizer';

import { AppDispatch, RootState } from 'store/types';
import { resizeLeftPanel } from 'store/ui/actions';
import { setAuthToken, deleteAuthData } from 'store/auth/actions';
import {
  synchronizeGist,
  createBackupGist,
  setCurrentSnippet,
  addSnippet,
  deleteSnippet,
  setSearchSnippets,
} from 'store/snippets/actions';

import './SnippetList.scss';

const SnippetList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { leftPanelWidth } = useSelector((state: RootState) => state.ui);
  const { current, list, query } = useSelector((state: RootState) => state.snippets);

  const resizerXPosition = useRef<number | null>(null);
  const panelWidth = useRef<number | null>(null);

  const menu = new remote.Menu();
  const menuItem = new remote.MenuItem({
    label: 'Delete',
    click: (): void => handleDeleteSnippet(),
  });
  menu.append(menuItem);

  const handleOnMouseDown = (event: React.MouseEvent): void => {
    resizerXPosition.current = event.clientX;
    panelWidth.current = event.clientX;
  };

  const handleElementContextMenu = (): void => {
    menu.popup({ window: remote.getCurrentWindow() });
  };

  const handleChangeSnippet = (id: number): void => {
    dispatch(setCurrentSnippet(id));
  };

  const handleAddSnippet = (): void => {
    dispatch(addSnippet());
  };

  const handleDeleteSnippet = (): void => {
    dispatch(deleteSnippet());
  };

  const handleSearchChange = (value: string): void => {
    dispatch(setSearchSnippets(value));
  };

  const handleDeleteAuthData = (): void => {
    dispatch(deleteAuthData());
  };

  const handleSetAuthToken = (token: string): Promise<GistsListResponseItem[]> => {
    return dispatch(setAuthToken(token));
  };

  const handleCreateBackupGist = (description: string, token: string): Promise<{}> => {
    return dispatch(createBackupGist(description, token));
  };

  const handleSynchronizeGist = (backupLocalSnippets: boolean, token: string, id: string): Promise<{}> => {
    return dispatch(synchronizeGist(backupLocalSnippets, token, id));
  };

  useEffect(() => {
    const mouseUp = (): void => {
      resizerXPosition.current = null;
    };

    const mouseMove = (event: MouseEvent): void => {
      if (!resizerXPosition.current || !panelWidth.current) {
        return;
      }

      const newPosition = panelWidth.current + event.clientX - resizerXPosition.current;
      // TODO Remove hardcoded values
      if (newPosition <= 600) {
        dispatch(resizeLeftPanel(Math.max(200, newPosition)));
      }
    };

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove);

    return (): void => {
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mousemove', mouseMove);
    };
  }, [dispatch]);

  const renderElements = (): React.ReactElement[] => {
    const filtered = list.filter(element => element.title.toLowerCase().includes(query.toLowerCase()));

    return filtered.map(element => {
      return (
        <CSSTransition key={element.id} classNames="SnippetList--element" timeout={{ enter: 350, exit: 350 }}>
          <SnippetListElement
            element={element}
            currentlySelectedId={current ? current.id : null}
            onChangeSnippet={handleChangeSnippet}
            onContextMenu={handleElementContextMenu}
          />
        </CSSTransition>
      );
    });
  };

  return (
    <div style={{ width: leftPanelWidth, minWidth: 200 }} className="SnippetList--container">
      <SnippetListHeader
        query={query}
        onAddSnippet={handleAddSnippet}
        onSearchChange={handleSearchChange}
        onSetAuthToken={handleSetAuthToken}
        onCreateBackupGist={handleCreateBackupGist}
        onSynchronizeGist={handleSynchronizeGist}
        onDeleteAuthData={handleDeleteAuthData}
      />

      {list && (
        <ScrollableWrapper topShadow={false} bottomShadow={false} alwaysOn={true}>
          <TransitionGroup>{renderElements()}</TransitionGroup>
        </ScrollableWrapper>
      )}

      <Resizer onMouseDown={handleOnMouseDown} />
    </div>
  );
};

export default SnippetList;
