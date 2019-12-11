import { combineReducers } from 'redux';
import ui from './ui';
import editor from './editor';
import snippets from './snippets';

export default combineReducers({
  ui,
  editor,
  snippets
});