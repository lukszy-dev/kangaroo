export default (code, successCallback, errorCallback) => {
  switch(code) {
    case 200:
      successCallback();
      break;

    default:
      errorCallback();
      break;
  }
};