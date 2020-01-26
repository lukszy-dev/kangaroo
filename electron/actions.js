const { ipcMain } = require('electron');
const Store = require('electron-store');

const { GH_AUTH_TOKEN, BACKUP_GIST_ID } = require('./constants');

const store = new Store();

ipcMain.on('LOAD_GH_AUTH_DATA', (event) => {
  const token = store.get(GH_AUTH_TOKEN);
  const backupGistId = store.get(BACKUP_GIST_ID);
  event.sender.send('LOAD_GH_AUTH_DATA_REPLY', {
    token,
    backupGistId
  });
});

ipcMain.on('SET_GH_AUTH_DATA', (event, data) => {
  const { token, backupGistId } = data;

  if (token) {
    store.set(GH_AUTH_TOKEN, token);
  }

  if (backupGistId) {
    store.set(BACKUP_GIST_ID, backupGistId);
  }
});

ipcMain.on('DELETE_GH_AUTH_DATA', () => {
  store.delete(GH_AUTH_TOKEN);
  store.delete(BACKUP_GIST_ID);
});
