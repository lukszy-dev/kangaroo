import Datastore from 'nedb';
import { remote } from 'electron';

const dbFactory = (name: string) => {
  const db = new Datastore({
    filename: `${process.env.NODE_ENV === 'development' ? '.' : remote.app.getPath('userData')}/data/${name}.db`,
    autoload: true,
  });

  db.ensureIndex({ fieldName: 'id', unique: true });

  return db;
};

const dbAdd = (db: Datastore, objArray: {} | {}[]) => {
  db.insert(objArray, err => {
    if (err) throw new Error(err.message);
  });
};

const dbUpdate = (db: Datastore, obj: { id: number }) => {
  db.update({ id: obj.id }, { ...obj }, {}, err => {
    if (err) throw new Error(err.message);
  });
};

const dbUpdateAll = (db: Datastore, changes: {}) => {
  db.update({}, { $set: changes }, { multi: true }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbRemove = (db: Datastore, id: number) => {
  db.remove({ id }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbRemoveQuery = (db: Datastore, query: {}) => {
  db.remove(query, { multi: true }, err => {
    if (err) throw new Error(err.message);
  });
};

const dbFind = (db: Datastore, id: number) => {
  db.find({ id: id }, {}, err => {
    if (err) throw new Error(err.message);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbFindAll = (db: Datastore, callback: (items: any) => void) => {
  db.find({}, {}, (err, items) => {
    if (err) throw new Error(err.message);
    callback(items);
  });
};

export { dbFactory, dbAdd, dbUpdate, dbRemove, dbRemoveQuery, dbFind, dbFindAll, dbUpdateAll };
