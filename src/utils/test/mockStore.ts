import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import ReduxThunk, { ThunkDispatch } from 'redux-thunk';
import { ipcRenderer, IpcRenderer } from 'electron';

import { RootState } from 'store/types';

const middlewares = [ReduxThunk.withExtraArgument(ipcRenderer)];

export default configureMockStore<RootState, Action<string>, ThunkDispatch<RootState, IpcRenderer, Action<string>>>(
  middlewares,
);
