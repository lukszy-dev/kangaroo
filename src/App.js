import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';
import appCommand, { APP_COMMAND } from './utils/appCommand';
import { initSnippets } from './actions/snippets';
import { loadUserToken } from './actions/auth';

import './App.scss';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(loadUserToken());
    dispatch(initSnippets());

    ipcRenderer.on(APP_COMMAND, (_, message) => appCommand(dispatch, message));

    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, [dispatch]);

  return (
    <Theme mode={theme} classNames="App--content">
      <SnippetList />
      <Editor />
    </Theme>
  );
};

export default App;
