import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';

import appCommand, { APP_COMMAND } from './utils/appCommand';

import './App.scss';
import { loadSnippets, initSnippets } from './actions/snippets';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(initSnippets());

    ipcRenderer.on(APP_COMMAND, (event, message) => {
      // appCommand(event, message);
      dispatch(loadSnippets(message.data));
    });

    return () => {
      ipcRenderer.removeListener(APP_COMMAND);
    };
  }, [dispatch]);

  // console.log(electron.remote.getCurrentWindow());

  return (
    <Theme mode={theme}>
      <SnippetList />
      <Editor />
    </Theme>
  );
};

export default App;
