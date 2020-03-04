let _mainWindow;

exports.getMainWindow = () => {
  return _mainWindow;
};

exports.setMainWindow = mainWindow => {
  _mainWindow = mainWindow;
};
