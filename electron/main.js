const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const Store = require('electron-store');
const isDev = require('electron-is-dev');
const Octokit = require('@octokit/rest');

const { getMainWindow, setMainWindow } = require('./window');
const { registerListeners, removeListeners } = require('./src/db/db');
const { generateMenu } = require('./src/menu');
const { AUTH_TOKEN } = require('./src/constants');

const store = new Store();

let octokit = {};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Snippet manager',
    // #f5f8fa
    backgroundColor: '#30404d',
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    },
    height: 600,
    width: 880,
    minWidth: 450
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../index.html')}`,
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    mainWindow.webContents.openDevTools();
  }
	
  generateMenu(mainWindow);
  registerListeners(mainWindow);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    setMainWindow(null);
    removeListeners();
  });

  setMainWindow(mainWindow);
};

app.setAboutPanelOptions({
  applicationName: 'Snippet manager',
  version: 'App Store',
  applicationVersion: '0.0.1',
});

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (getMainWindow() === null) {
    createWindow();
  }
});

ipcMain.on('AUTH_LOGIN', (event, token) => {
  console.log('AUTH_LOGIN');

  octokit = new Octokit({ auth: ''});

  octokit.gists
    .list()
    .then(({ data }) => {
      console.log(data);
    });

  // const currentToken = store.get(AUTH_TOKEN);
});
