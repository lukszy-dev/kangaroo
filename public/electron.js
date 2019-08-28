const { app, BrowserWindow, Menu } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

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

const generateMenu = () => {
	const template = [
		{
			label: 'App',
			submenu: [{ role: 'about' }, { role: 'quit' }],
		},
		{
			label: 'File',
			submenu: [
				{
					label: 'New',
					accelerator: 'CommandOrControl+N',
					click: () => mainWindow.webContents.send('appCommand', { action: 'addSnippet' })
				}
			// 	{ role: 'undo' },
			// 	{ role: 'redo' },
			// 	{ type: 'separator' },
			// 	{ role: 'cut' },
			// 	{ role: 'copy' },
			// 	{ role: 'paste' },
			// 	{ role: 'pasteandmatchstyle' },
			// 	{ role: 'delete' },
			// 	{ role: 'selectall' },
			],
		},
		// {
		// 	label: 'View',
		// 	submenu: [
		// 		{ role: 'resetzoom' },
		// 		{ role: 'zoomin' },
		// 		{ role: 'zoomout' },
		// 		{ type: 'separator' },
		// 		{ role: 'togglefullscreen' },
		// 	],
		// },
		{
			role: 'window',
			submenu: [{ role: 'minimize' }, { role: 'close' }],
		}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.setAboutPanelOptions({
	applicationName: 'Snippet manager',
	version: 'App Store',
	applicationVersion: '0.0.1',
});

app.on('ready', () => {
	createWindow();
	generateMenu();
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
