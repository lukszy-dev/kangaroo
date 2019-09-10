import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';

import appCommand, { APP_COMMAND } from './utils/appCommand';
import { ADD, LOAD } from './utils/dbActions';

import './App.scss';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const App = () => {
  const { theme } = useSelector(state => state.ui);

  ipcRenderer.send(LOAD);

  useEffect(() => {
    ipcRenderer.on(APP_COMMAND, (event, message) => {
      appCommand(event, message)
    });

    return () => {
      ipcRenderer.removeListener(APP_COMMAND);
    };
  }, []);

  // console.log(electron.remote.getCurrentWindow());

  return (
    <Theme mode={theme}>
      <SnippetList />
      <Editor />
    </Theme>
  );
};

export default App;
