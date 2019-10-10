import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Theme from './components/Theme/Theme';
import Editor from './components/Editor/Editor';
import SnippetList from './components/SnippetList/SnippetList';

import appCommand, { APP_COMMAND } from './utils/appCommand';
import { initSnippets } from './actions/snippets';

import './App.scss';

import {
  START_NOTIFICATION_SERVICE,
  NOTIFICATION_SERVICE_STARTED,
  NOTIFICATION_SERVICE_ERROR,
  NOTIFICATION_RECEIVED as ON_NOTIFICATION_RECEIVED,
  TOKEN_UPDATED,
} from 'electron-push-receiver/src/constants';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(initSnippets());

    ipcRenderer.on(APP_COMMAND, (event, message) => {
      appCommand(dispatch, message);
    });

    // Listen for service successfully started
    ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => console.log(token));
    // Handle notification errors
    ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => console.log(error));
    // Send FCM token to backend
    ipcRenderer.on(TOKEN_UPDATED, (_, token) => console.log(token));
    // Display notification
    ipcRenderer.on(ON_NOTIFICATION_RECEIVED, (_, notification) => console.log(notification));
    // Start service
    ipcRenderer.send(START_NOTIFICATION_SERVICE, 25976822649);

    return () => {
      ipcRenderer.removeListener(APP_COMMAND);
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
