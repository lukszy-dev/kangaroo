const { Menu, MenuItem, app } = require('electron');
const { GH_AUTH_TOKEN, BACKUP_GIST_ID, LAST_SYNCHRONIZED_GIST_DATE, THEME } = require('./constants');

const initActions = (ipcMain, window, store) => {
  ipcMain.handle('LOAD_GH_DATA', () => {
    const token = store.get(GH_AUTH_TOKEN);
    const backupGistId = store.get(BACKUP_GIST_ID);
    const gistDate = store.get(LAST_SYNCHRONIZED_GIST_DATE);

    return {
      token,
      backupGistId,
      gistDate,
    };
  });

  ipcMain.handle('SET_GH_DATA', (_event, data) => {
    const { token, backupGistId, gistDate } = data;

    if (token) {
      store.set(GH_AUTH_TOKEN, token);
    }

    if (backupGistId) {
      store.set(BACKUP_GIST_ID, backupGistId);
    }

    if (gistDate) {
      store.set(LAST_SYNCHRONIZED_GIST_DATE, gistDate);
    }
  });

  ipcMain.handle('DELETE_GH_DATA', () => {
    store.delete(GH_AUTH_TOKEN);
    store.delete(BACKUP_GIST_ID);
    store.delete(LAST_SYNCHRONIZED_GIST_DATE);
  });

  ipcMain.handle('SWITCH_THEME', (_event, theme) => {
    store.set(THEME, theme);
    return theme;
  });

  ipcMain.handle('GET_THEME', () => {
    return store.get(THEME);
  });

  ipcMain.handle('GET_USER_DATA_PATH', () => {
    return app.getPath('userData');
  });

  const contextMenu = new Menu();
  const deleteMenuItem = new MenuItem({
    label: 'Delete',
    click: () => {
      window.webContents.send('DELETE_SNIPPET');
    }
  });
  contextMenu.append(deleteMenuItem);

  ipcMain.handle('OPEN_CONTEXT_MENU', (_event) => {
    contextMenu.popup();
  });
};

module.exports = { initActions };
