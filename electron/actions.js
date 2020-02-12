const { ipcMain } = require('electron');
const Store = require('electron-store');

const { GH_AUTH_TOKEN, BACKUP_GIST_ID, LAST_SYNCHRONIZED_GIST_DATE } = require('./constants');

const store = new Store();

ipcMain.on('LOAD_GH_DATA', event => {
  const token = store.get(GH_AUTH_TOKEN);
  const backupGistId = store.get(BACKUP_GIST_ID);
  const gistDate = store.get(LAST_SYNCHRONIZED_GIST_DATE);

  event.sender.send('LOAD_GH_DATA_REPLY', {
    token,
    backupGistId,
    gistDate,
  });
});

ipcMain.on('SET_GH_DATA', (event, data) => {
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
