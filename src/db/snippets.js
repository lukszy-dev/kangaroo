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

let db;

const loadDatabase = () => {
  db = dbFactory(DB_SNIPPETS);
};

const add = (objArray) => {
  dbAdd(db, objArray);
};

const update = (obj) => {
  dbUpdate(db, obj);
};

const remove = (id) => {
  dbRemove(db, id);
};

const findAll = (callback) => {
  dbFindAll(db, callback);
};

const updateAll = (changes) => {
  dbUpdateAll(db, changes);
};

const removeQuery = (query) => {
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
