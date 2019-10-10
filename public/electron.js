const { app, BrowserWindow, ipcMain } = require('electron');
const { setup: setupPushReceiver } = require('electron-push-receiver');
const Store = require('electron-store');
const { google } = require('googleapis');

const path = require('path');
const isDev = require('electron-is-dev');

const { registerListeners } = require('./electron/db/db');
const { generateMenu } = require('./electron/menu');
const { ElectronGoogleOAuth2 } = require('./electron/auth');

let mainWindow = {};
let authClient = {};
const store = new Store();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Snippet manager',
    // #f5f8fa
    backgroundColor: '#30404d',
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
    height: 600,
    width: 880,
    minWidth: 450
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
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
};

app.setAboutPanelOptions({
  applicationName: 'Snippet manager',
  version: 'App Store',
  applicationVersion: '0.0.1',
});

app.on('ready', () => {
  createWindow();

  authClient = new ElectronGoogleOAuth2(
    '25976822649-itstpvr0i60jsmr14oprhej6dsapd9sg.apps.googleusercontent.com',
    '0wD7YYcOwqDTyI5snIF3-_yV',
    ['https://www.googleapis.com/auth/drive.metadata.readonly']
  );
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('AUTH_LOGIN', () => {
  const currentToken = store.get('auth_token');

  if (currentToken) {
    authClient.setTokens(currentToken);

    if (authClient.isTokenExpiring()) {
      authClient.refreshToken(currentToken.refresh_token).then((response) => {
        authClient.setTokens(response.tokens);
      });
    }

    const drive = google.drive({ version: 'v3', auth: authClient.oauth2Client });

    const FILE_NAME = 'sm_data';
    const query = "name='" + FILE_NAME + "'";

    drive.files.list({ q: query }).then((response) => {
      console.log(response.data);
      if (response.data.files[0].name === FILE_NAME) {
        console.log('Load data!');
      } else {
        drive.files.create({ name: FILE_NAME });
      }
    })
  } else {
    authClient.openAuthWindowAndGetTokens().then(token => {
      store.set('auth_token', token);
    });
  }
});
