import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';

import appCommand, { APP_COMMAND } from './utils/appCommand';
import { initSnippets } from './actions/snippets';

import './App.scss';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(initSnippets());

    ipcRenderer.on(APP_COMMAND, (event, message) => {
      appCommand(dispatch, message);
    });

    return () => {
      ipcRenderer.removeListener(APP_COMMAND);
    };
  }, [dispatch]);

  // console.log(electron.remote.getCurrentWindow());
  // console.log(electron.remote.getCurrentWindow())
  // electron.remote.getCurrentWindow().setBackgroundColor('#FF0000');
  // electron.remote.getCurrentWindow().blur();
  // electron.remote.getCurrentWindow().focus();

  return (
    <Theme mode={theme} classNames="App--content">
      <SnippetList />
      <Editor />
    </Theme>
  );
};

export default App;
