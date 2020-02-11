import { combineReducers } from 'redux';

import { uiReducer as ui } from './ui/reducers';
import { authReducer as auth } from './auth/reducers';
import { modalReducer as modal } from './modal/reducers';
import { editorReducer as editor } from './editor/reducers';
import { snippetsReducer as snippets } from './snippets/reducers';

export default combineReducers({
  ui,
  auth,
  modal,
  editor,
  snippets
});
