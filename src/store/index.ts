import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ipcRenderer } from 'electron';

import { uiReducer as ui } from './ui/reducers';
import { authReducer as auth } from './auth/reducers';
import { modalReducer as modal } from './modal/reducers';
import { editorReducer as editor } from './editor/reducers';
import { snippetsReducer as snippets } from './snippets/reducers';

const rootReducer = combineReducers({
  ui,
  auth,
  modal,
  editor,
  snippets,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument(ipcRenderer))));

export default store;
