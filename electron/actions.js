const { GH_AUTH_TOKEN, BACKUP_GIST_ID, LAST_SYNCHRONIZED_GIST_DATE, THEME } = require('./constants');

const initActions = (ipcMain, store) => {
  ipcMain.on('LOAD_GH_DATA', (event) => {
    const token = store.get(GH_AUTH_TOKEN);
    const backupGistId = store.get(BACKUP_GIST_ID);
    const gistDate = store.get(LAST_SYNCHRONIZED_GIST_DATE);

    event.sender.send('LOAD_GH_DATA_REPLY', {
      token,
      backupGistId,
      gistDate,
    });
  });

  ipcMain.on('SET_GH_DATA', (_event, data) => {
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

  ipcMain.on('DELETE_GH_DATA', () => {
    store.delete(GH_AUTH_TOKEN);
    store.delete(BACKUP_GIST_ID);
    store.delete(LAST_SYNCHRONIZED_GIST_DATE);
  });

  ipcMain.on('SWITCH_THEME', (_event, theme) => {
    store.set(THEME, theme);
  });

  ipcMain.on('GET_THEME', (event) => {
    const theme = store.get(THEME);
    event.sender.send('GET_THEME_REPLY', theme);
  });
};

module.exports = { initActions };
