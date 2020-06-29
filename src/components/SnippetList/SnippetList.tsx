import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import SnippetListHeader from './SnippetListHeader/SnippetListHeader';
import SnippetListElement from './SnippetListElement/SnippetListElement';
import ScrollableWrapper from './ScrollableWrapper/ScrollableWrapper';
import Resizer from './Resizer';
import { menuOpen } from './contextMenu';

import { AppDispatch, RootState } from 'store/types';
import { resizeLeftPanel } from 'store/ui/actions';
import { setCurrentSnippet } from 'store/snippets/actions';

import './SnippetList.scss';

const SnippetList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState('');

  const { leftPanelWidth } = useSelector((state: RootState) => state.ui);
  const { current, list } = useSelector((state: RootState) => state.snippets);

  const resizerXPosition = useRef<number | null>(null);
  const panelWidth = useRef<number | null>(null);

  const handleElementContextMenu = useCallback((): void => {
    menuOpen();
  }, []);

  const handleOnMouseDown = useCallback((event: React.MouseEvent): void => {
    resizerXPosition.current = event.clientX;
    panelWidth.current = event.clientX;
  }, []);

  const handleSearchChange = useCallback((value: string): void => {
    setQuery(value);
  }, []);

  const handleChangeSnippet = useCallback(
    (id: number): void => {
      dispatch(setCurrentSnippet(id));
    },
    [dispatch],
  );

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
    const filtered = list.filter((element) => element.title.toLowerCase().includes(query.toLowerCase()));

    return filtered.map((element) => {
      return (
        <CSSTransition key={element.id} classNames="SnippetList--element" timeout={{ enter: 350, exit: 350 }}>
          <SnippetListElement
            snippetId={element.id}
            snippetTags={element.tags}
            snippetTitle={element.title}
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
      <SnippetListHeader query={query} onSearchChange={handleSearchChange} />

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
