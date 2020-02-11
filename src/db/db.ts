import Datastore from 'nedb';

const { remote } = require('electron');

const dbFactory = (name: string) => {
  const db = new Datastore({
    filename: `${process.env.NODE_ENV === 'development' ?
    '.' :
    remote.app.getPath('userData')}/data/${name}.db`,
    autoload: true
  });

  db.ensureIndex({ fieldName: 'id', unique: true });

  return db;
};

const dbAdd = (db: Datastore, objArray: {} | Array<{}>) => {
  db.insert(objArray, err => {
    if (err) throw new Error(err.message);
  });
};

const dbUpdate = (db: Datastore, obj: { id: number }) => {
  db.update({ id: obj.id }, { ...obj }, {}, err => {
    if (err) throw new Error(err.message);
  });
};

const dbUpdateAll = (db: Datastore, changes: any) => {
  db.update({}, { $set: changes }, { multi: true }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbRemove = (db: Datastore, id: number) => {
  db.remove({ id }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbRemoveQuery = (db: Datastore, query: any) => {
  db.remove(query, { multi: true }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbFind = (db: Datastore, id: number) => {
  db.find({ id: id }, (err: any) => {
    if (err) throw new Error(err.message);
  });
};

const dbFindAll = (db: Datastore, callback: (items: any) => void) => {
  db.find({}, (err: any, items: any) => {
    if (err) throw new Error(err.message);
    callback(items);
  });
};

export {
  dbFactory,
  dbAdd,
  dbUpdate,
  dbRemove,
  dbRemoveQuery,
  dbFind,
  dbFindAll,
  dbUpdateAll
};
