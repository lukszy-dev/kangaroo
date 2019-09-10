const { app, ipcMain } = require('electron');
const Datastore = require('nedb');

const { ADD, LOAD } = require('./constants');
const { sendCommand } = require('./utils');

const dbFactory = (fileName) => {
	return new Datastore({
		filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}/data/${fileName}`,
		autoload: true
	});
};

const db = {
	snippets: dbFactory('snippets.db')
};

const registerListeners = (window) => {
	ipcMain.on(ADD, (obj) => 
		db.snippets.insert(obj, err => {
			if (err) throw new Error(err);
		})
	);

	ipcMain.on(LOAD, () =>
		db.snippets.find({}, (err, items) =>
			sendCommand(window, { action: 'DB_LOAD', data: items }))
	);
}

module.exports = { db, registerListeners };