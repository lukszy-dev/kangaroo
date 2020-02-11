import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import App from './App';
import rootReducer from 'store/index';
import { appDb, snippetsDb } from './db';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const { ipcRenderer } = window.require('electron');
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk.withExtraArgument(ipcRenderer))
  )
);

appDb.loadDatabase();
snippetsDb.loadDatabase();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
