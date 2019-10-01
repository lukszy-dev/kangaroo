const namespace = name => `DB_${name}`;

const ADD = namespace('ADD');
const LOAD = namespace('LOAD');
const UPDATE = namespace('UPDATE');
const DELETE = namespace('DELETE');

module.exports = { ADD, LOAD, UPDATE, DELETE };