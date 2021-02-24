import store from 'store';
import { ipcRenderer } from 'electron';

import { AppDispatch } from 'store/types';
import { deleteSnippet } from 'store/snippets/actions';

const dispatch: AppDispatch = store.dispatch;

ipcRenderer.addListener('DELETE_SNIPPET', () => dispatch(deleteSnippet()));

export const menuOpen = (): void => {
  ipcRenderer.invoke('OPEN_CONTEXT_MENU');
};
