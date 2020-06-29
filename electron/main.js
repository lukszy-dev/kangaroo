const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

const { getMainWindow, setMainWindow } = require('./window');
const { generateMenu } = require('./menu');
const { initActions } = require('./actions');
const { THEME, BACKGROUND_COLOR } = require('./constants');

const createWindow = () => {
  const store = new Store();
  const theme = store.get(THEME);

  const mainWindow = new BrowserWindow({
    title: 'Kangaroo',
    backgroundColor: theme && theme === 'light' ? BACKGROUND_COLOR.LIGHT : BACKGROUND_COLOR.DARK,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
    },
    height: 600,
    width: 880,
    minWidth: 450,
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);

  if (isDev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
      installExtension(extension)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    });

    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools();
      mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.focus();
      });
    });
  }

  generateMenu(mainWindow);

  mainWindow.once('ready-to-show', () => {
    initActions(ipcMain, store);
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    setMainWindow(null);
  });

  setMainWindow(mainWindow);
};

app.allowRendererProcessReuse = true;

app.setAboutPanelOptions({
  applicationName: 'Kangaroo',
  version: 'App Store',
  applicationVersion: process.env.npm_package_version,
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
