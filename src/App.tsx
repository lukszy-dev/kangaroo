import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer, IpcRenderer, IpcRendererEvent } from 'electron';

import Loader from 'components/Loader/Loader';
import Theme from 'components/Theme/Theme';
import Editor from 'components/Editor/Editor';
import SnippetList from 'components/SnippetList/SnippetList';
import ModalOverlay from 'components/Modal/ModalOverlay/ModalOverlay';

import { RootState, AppDispatch } from 'store/types';
import { initSnippets } from 'store/snippets/actions';
import { loadAuthData } from 'store/auth/actions';
import { appInit, loadTheme } from 'store/ui/actions';

import appCommand, { APP_COMMAND, AppCommandMessage } from 'utils/appCommand';

import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { init, theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(loadTheme());
    dispatch(loadAuthData());
    dispatch(initSnippets()).then(() => dispatch(appInit(false)));

    (ipcRenderer as IpcRenderer).on(APP_COMMAND, (_: IpcRendererEvent, message: AppCommandMessage) =>
      appCommand(dispatch, message),
    );

    return (): void => {
      ipcRenderer.removeAllListeners(APP_COMMAND);
    };
  }, [dispatch]);

  return (
    <Theme mode={theme} className="App--content">
      {init ? (
        <Loader />
      ) : (
        <>
          <SnippetList />
          <Editor />
          <ModalOverlay />
        </>
      )}
    </Theme>
  );
};

export default App;
