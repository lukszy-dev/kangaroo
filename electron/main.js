const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const Store = require('electron-store');
const isDev = require('electron-is-dev');

const { getMainWindow, setMainWindow } = require('./window');
const { generateMenu } = require('./menu');
const { GH_AUTH_TOKEN, BACKUP_GIST_ID } = require('./constants');

const store = new Store();

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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    setMainWindow(null);
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

ipcMain.on('LOAD_GH_AUTH_DATA', (event) => {
  const token = store.get(GH_AUTH_TOKEN);
  const backupGistId = store.get(BACKUP_GIST_ID);
  event.sender.send('LOAD_GH_AUTH_DATA_REPLY', {
    token,
    backupGistId
  });
});

ipcMain.on('SET_GH_AUTH_DATA', (event, data) => {
  const { token, backupGistId } = data;

  if (token) {
    store.set(GH_AUTH_TOKEN, token);
  }

  if (backupGistId) {
    store.set(BACKUP_GIST_ID, backupGistId);
  }
});

ipcMain.on('DELETE_GH_AUTH_DATA', () => {
  store.delete(GH_AUTH_TOKEN);
  store.delete(BACKUP_GIST_ID);
});
