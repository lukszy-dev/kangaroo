const { app, BrowserWindow, ipcMain } = require('electron');
const { setup: setupPushReceiver } = require('electron-push-receiver');

const Store = require('electron-store');
const path = require('path');
const isDev = require('electron-is-dev');

const { getMainWindow, setMainWindow } = require('./window');
const { registerListeners, removeListeners } = require('./src/db/db');
const { generateMenu } = require('./src/menu');
const { ElectronGoogleOAuth2 } = require('./src/auth');
const { driveApiWrapper } = require('./src/drive');
const { AUTH_TOKEN, FILE_NAME, FILE_METADATA, QUERY } = require('./src/constants');

let authClient;
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
	
	setupPushReceiver(mainWindow.webContents);
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

const createAuthClient = () => {
  authClient = new ElectronGoogleOAuth2(
    '25976822649-itstpvr0i60jsmr14oprhej6dsapd9sg.apps.googleusercontent.com',
    '0wD7YYcOwqDTyI5snIF3-_yV',
    [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.file'
    ]
  );
};

app.setAboutPanelOptions({
  applicationName: 'Snippet manager',
  version: 'App Store',
  applicationVersion: '0.0.1',
});

app.on('ready', () => {
  createWindow();
  createAuthClient();
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

ipcMain.on('AUTH_LOGIN', () => {
  const currentToken = store.get(AUTH_TOKEN);

  console.log(currentToken);

  if (currentToken) {
    authClient.setTokens(currentToken);

    if (authClient.isTokenExpiring()) {
      authClient.refreshToken(currentToken.refresh_token).then((response) => {
        authClient.setTokens(response.tokens);
      });
    }

    driveApiWrapper.getDriveApiClient(authClient);

    driveApiWrapper.listFiles(
      QUERY,
      (files) => {
        const file = driveApiWrapper.getFile(FILE_NAME, files);
        if (file) {
          console.log('Load data!');
          driveApiWrapper.watchForChanges(file.id);
        } else {
          driveApiWrapper.createFile(FILE_METADATA);
        }
      },
      (error) => {
        console.error(error);
      });
  } else {
    authClient.openAuthWindowAndGetTokens().then(token => {
      store.set(AUTH_TOKEN, token);
    });
  }
});
