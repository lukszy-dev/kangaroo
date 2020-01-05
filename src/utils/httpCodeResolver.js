export default (code, successCallback, errorCallback) => {
  switch(code) {
    case 200:
    case 201:
      successCallback();
      break;

    default:
      errorCallback();
      break;
  }
};