import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import App from './App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers';

import './index.scss';

const { ipcRenderer } = window.require('electron');

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument(ipcRenderer))
);

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
