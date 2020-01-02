const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const Store = require('electron-store');
const isDev = require('electron-is-dev');
const Octokit = require('@octokit/rest');

const { getMainWindow, setMainWindow } = require('./window');
const { registerListeners, removeListeners } = require('./src/db/db');
const { generateMenu } = require('./src/menu');
const { GH_AUTH_TOKEN, BACKUP_GIST_ID } = require('./src/constants');

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

    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log('An error occurred: ', err));
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

ipcMain.on('LOAD_GH_AUTH_TOKEN', (event) => {
  const token = store.get(GH_AUTH_TOKEN);
  if (token) {
    event.sender.send('LOAD_GH_AUTH_TOKEN_REPLY', token);
  }
});

ipcMain.on('SET_GH_AUTH_TOKEN', (event, token) => {
  octokit = new Octokit({ auth: token });

  octokit.gists
    .list()
    .then(response => {
      store.set(GH_AUTH_TOKEN, token);
      event.sender.send('SET_GH_AUTH_TOKEN_REPLY', response);
    })
    .catch(error => {
      event.sender.send('SET_GH_AUTH_TOKEN_REPLY', error);
    });
});

ipcMain.on('SET_BACKUP_GIST_ID', (event, id) => {
  store.set(BACKUP_GIST_ID, id);
});

ipcMain.on('CREATE_GH_GIST', (event, gist) => {
  octokit.gists
    .create({
      files: {
        'TestSM': {
          content: 'TestSM'
        }
      },
      public: false
    })
    .then(response => {
      event.sender.send('CREATE_GH_GIST_REPLY', response);
    })
    .catch(error => {
      console.log(error);
      event.sender.send('CREATE_GH_GIST_REPLY', error);
    });
});
