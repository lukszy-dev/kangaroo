const { app, ipcMain } = require('electron');
const Datastore = require('nedb');

const { ADD, UPDATE, LOAD, DELETE } = require('./constants');
const { sendCommand } = require('./utils');

const dbFactory = (fileName) => {
	return new Datastore({
		filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getPath('userData')}/data/${fileName}`,
		autoload: true
	});
};

const db = {
	snippets: dbFactory('snippets.db')
};

const registerListeners = (window) => {
	db.snippets.ensureIndex({ fieldName: 'id', unique: true });

	ipcMain.on(ADD, (event, obj) =>
		db.snippets.insert(obj, err => {
			if (err) throw new Error(err);
		})
	);

	ipcMain.on(UPDATE, (event, obj) => 
		db.snippets.update({ id: obj.id }, { ...obj }, {}, err => {
			if (err) throw new Error(err);
		})
	);

	ipcMain.on(DELETE, (event, id) =>
		db.snippets.remove({ id }, err => {
			if (err) throw new Error(err);
		})
	);

	ipcMain.on(LOAD, () =>
		db.snippets.find({}, (err, items) =>
			sendCommand(window, { action: 'DB_LOAD', data: items }))
	);
}

module.exports = { db, registerListeners };