import Datastore from 'nedb';

const { remote } = require('electron');

const dbFactory = (name) => {
  const db = new Datastore({
    filename: `${process.env.NODE_ENV === 'development' ?
    '.' :
    remote.app.getPath('userData')}/data/${name}.db`,
    autoload: true
  });

  db.ensureIndex({ fieldName: 'id', unique: true });

  return db;
};

const dbAdd = (db, objArray) => {
  db.insert(objArray, err => {
    if (err) throw new Error(err);
  });
};

const dbUpdate = (db, obj) => {
  db.update({ id: obj.id }, { ...obj }, {}, err => {
    if (err) throw new Error(err);
  });
};

const dbUpdateAll = (db, changes) => {
  db.update({}, { $set: changes }, { multi: true }, err => {
    if (err) throw new Error(err);
  });
};

const dbRemove = (db, id) => {
  db.remove({ id }, err => {
    if (err) throw new Error(err);
  });
};

const dbRemoveAll = (db) => {
  db.remove({}, { multi: true }, err => {
    if (err) throw new Error(err);
  });
};

const dbFind = (db, id) => {
  db.find({ id: id }, err => {
    if (err) throw new Error(err);
  });
};

const dbFindAll = (db, callback) => {
  db.find({}, (err, items) => {
    if (err) throw new Error(err);
    callback(items);
  });
};

export {
  dbFactory,
  dbAdd,
  dbUpdate,
  dbRemove,
  dbRemoveAll,
  dbFind,
  dbFindAll,
  dbUpdateAll
};
