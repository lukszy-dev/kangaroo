const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const { registerListeners } = require('./db');
const { generateMenu } = require('./menu');

let mainWindow = {};

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
	generateMenu(mainWindow);
	registerListeners(mainWindow);
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
