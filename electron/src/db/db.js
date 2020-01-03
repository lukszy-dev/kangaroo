const { app, ipcMain } = require('electron');
const Datastore = require('nedb');

const { DB_SNIPPETS, ADD, UPDATE, LOAD, DELETE } = require('./constants');

const dbFactory = (fileName) => {
	return new Datastore({
		filename: `${process.env.NODE_ENV === 'dev' ?
			'.' :
			app.getPath('userData')}/data/${fileName}`,
		autoload: true
	});
};

const db = {
	[DB_SNIPPETS]: dbFactory([DB_SNIPPETS] + '.db')
};

const add = (schema, obj) => {
	db[schema].insert(obj, err => {
		if (err) throw new Error(err);
	});
};

const update = (schema, obj) => {
	db[schema].update({ id: obj.id }, { ...obj }, {}, err => {
		if (err) throw new Error(err);
	});
};

const updateAll = (schema, changes) => {
	db[schema].update({}, { $set: changes}, {}, err => {
		if (err) throw new Error(err);
	});
};

const remove = (schema, id) => {
	db[schema].remove({ id }, err => {
		if (err) throw new Error(err);
	});
};

const findAll = (schema, callback) => {
	db[schema].find({}, (err, items) => {
		callback(items);
	});
};

const registerListeners = () => {
	db.snippets.ensureIndex({ fieldName: 'id', unique: true });

	ipcMain.on(ADD, (event, obj) =>
		add(DB_SNIPPETS, obj)
	);

	ipcMain.on(UPDATE, (event, obj) => 
		update(DB_SNIPPETS, obj)
	);

	ipcMain.on(DELETE, (event, id) =>
		remove(DB_SNIPPETS, id)
	);

	ipcMain.on(LOAD, (event) =>
		findAll(DB_SNIPPETS, (items) =>
			event.sender.send('DB_LOAD_REPLY', items))
	);
};

const removeListeners = () => {
	ipcMain.removeAllListeners();
};

module.exports = {
	dbActions: { add, update, remove, findAll, updateAll },
	registerListeners,
	removeListeners
};