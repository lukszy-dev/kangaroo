const namespace = name => `DB_${name}`;
const ADD = namespace('ADD');
const LOAD = namespace('LOAD');

module.exports = { ADD, LOAD };