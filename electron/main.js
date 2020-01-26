const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const { getMainWindow, setMainWindow } = require('./window');
const { generateMenu } = require('./menu');

require('./actions');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Snippee',
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
  applicationName: 'Snippee',
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
