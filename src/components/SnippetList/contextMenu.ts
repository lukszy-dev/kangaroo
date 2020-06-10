import store from 'store';
import { remote } from 'electron';

import { AppDispatch } from 'store/types';
import { deleteSnippet } from 'store/snippets/actions';

const menu = new remote.Menu();
const dispatch: AppDispatch = store.dispatch;
const deleteMenuItem = new remote.MenuItem({
  label: 'Delete',
  click: (): void => dispatch(deleteSnippet()),
});
menu.append(deleteMenuItem);

export const menuOpen = (): void => {
  menu.popup({ window: remote.getCurrentWindow() });
};
