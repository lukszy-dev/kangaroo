import { combineReducers } from 'redux';
import ui from './ui';
import snippets from './snippets';

export default combineReducers({
  ui,
  snippets
});