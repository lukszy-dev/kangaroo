import { combineReducers } from 'redux';

import { uiReducer } from './ui/reducers';
import { authReducer } from './auth/reducers';
import { modalReducer } from './modal/reducers';
import { editorReducer } from './editor/reducers';
import { snippetsReducer } from './snippets/reducers';

export default combineReducers({
  uiReducer,
  authReducer,
  modalReducer,
  editorReducer,
  snippetsReducer
});
