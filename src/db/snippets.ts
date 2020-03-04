import Datastore from 'nedb';

import { dbFactory, dbAdd, dbUpdate, dbRemove, dbRemoveQuery, dbFindAll, dbUpdateAll } from './db';
import { DB_SNIPPETS } from './constants';
import { SnippetInterface } from 'models/Snippet';

let db: Datastore;

const loadDatabase = () => {
  db = dbFactory(DB_SNIPPETS);
};

const add = (objArray: {} | {}[]) => {
  dbAdd(db, objArray);
};

const update = (obj: { id: number }) => {
  dbUpdate(db, obj);
};

const remove = (id: number) => {
  dbRemove(db, id);
};

const findAll = (callback: (items: SnippetInterface[]) => void) => {
  dbFindAll(db, callback);
};

const updateAll = (changes: {}) => {
  dbUpdateAll(db, changes);
};

const removeQuery = (query: {}) => {
  dbRemoveQuery(db, query);
};

export const snippetsDb = {
  loadDatabase,
  add,
  update,
  remove,
  removeQuery,
  findAll,
  updateAll,
};
