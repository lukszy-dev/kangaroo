import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './components/Loader/Loader';
import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';
import ModalOverlay from 'components/Modal/ModalOverlay/ModalOverlay';

import { initSnippets } from './actions/snippets';
import { loadAuthData } from './actions/auth';
import { appInit } from './actions/ui';

import appCommand, { APP_COMMAND } from './utils/appCommand';

import './App.scss';

const { ipcRenderer } = require('electron');

const App = () => {
  const dispatch = useDispatch();
  const { init, theme } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(loadAuthData());
    dispatch(initSnippets()).then(
      () => dispatch(appInit(false))
    );

    ipcRenderer.on(APP_COMMAND, (_, message) => appCommand(dispatch, message));

    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, [dispatch]);

  return (
    <Theme mode={theme} classNames="App--content">
      { init ? (
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
