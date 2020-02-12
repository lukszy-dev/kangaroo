import Datastore from 'nedb';

import { dbFactory, dbAdd, dbUpdate, dbRemove, dbFind } from './db';

import { DB_APP } from './constants';

let db: Datastore;

const loadDatabase = () => {
  db = dbFactory(DB_APP);
};

const add = (objArray: {} | Array<{}>) => {
  dbAdd(db, objArray);
};

const update = (obj: { id: number }) => {
  dbUpdate(db, obj);
};

const remove = (id: number) => {
  dbRemove(db, id);
};

const find = (id: number) => {
  dbFind(db, id);
};

export const appDb = {
  loadDatabase,
  add,
  update,
  remove,
  find,
};
