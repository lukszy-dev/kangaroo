import {
  dbFactory,
  dbAdd,
  dbUpdate,
  dbRemove,
  dbFind
} from './db';

import { DB_APP } from './constants';

let db;

const loadDatabase = () => {
  db = dbFactory(DB_APP);
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

const find = (id) => {
  dbFind(db, id);
};

export const app = {
  loadDatabase,
  add,
  update,
  remove,
  find
};
