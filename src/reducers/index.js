import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import editor from './editor';
import snippets from './snippets';

export default combineReducers({
  ui,
  auth,
  editor,
  snippets
});