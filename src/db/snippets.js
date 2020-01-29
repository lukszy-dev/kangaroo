import {
  dbFactory,
  dbAdd,
  dbUpdate,
  dbRemove,
  dbRemoveAll,
  dbFindAll,
  dbUpdateAll
} from './db';

import { DB_SNIPPETS } from './constants';

let db;

const loadDatabase = () => {
  db = dbFactory(DB_SNIPPETS);
};

const add = (obj) => {
  dbAdd(db, obj);
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

const removeAll = () => {
  dbRemoveAll(db);
};

export const snippets = {
  loadDatabase,
  add,
  update,
  remove,
  removeAll,
  findAll,
  updateAll
};
