const sendCommand = (window, command) => {
  window.webContents.send('APP_COMMAND', command);
};

module.exports = { sendCommand };
