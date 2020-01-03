const namespace = name => `DB_${name}`;

/* DB */

const DB_SNIPPETS = 'snippets';

/* ACTIONS */

const ADD = namespace('ADD');
const LOAD = namespace('LOAD');
const UPDATE = namespace('UPDATE');
const DELETE = namespace('DELETE');

module.exports = { DB_SNIPPETS, ADD, LOAD, UPDATE, DELETE };