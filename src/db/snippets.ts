import Datastore from 'nedb';

import {
  dbFactory,
  dbAdd,
  dbUpdate,
  dbRemove,
  dbRemoveQuery,
  dbFindAll,
  dbUpdateAll
} from './db';

import { DB_SNIPPETS } from './constants';

let db: Datastore;

const loadDatabase = () => {
  db = dbFactory(DB_SNIPPETS);
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

const findAll = (callback: (items: any) => void) => {
  dbFindAll(db, callback);
};

const updateAll = (changes: any) => {
  dbUpdateAll(db, changes);
};

const removeQuery = (query: any) => {
  dbRemoveQuery(db, query);
};

export const snippetsDb = {
  loadDatabase,
  add,
  update,
  remove,
  removeQuery,
  findAll,
  updateAll
};
