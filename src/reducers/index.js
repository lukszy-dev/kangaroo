import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import modal from './modal';
import editor from './editor';
import snippets from './snippets';

export default combineReducers({
  ui,
  auth,
  modal,
  editor,
  snippets
});