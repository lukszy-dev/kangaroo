const { google } = require('googleapis');
const uuidv4 = require('uuid/v4');

const NOTIFICATION_ENDPOINT = 'https://proggramik.com/functions/sendNotification';

let _driveApiClient;

const getDriveApiClient = (authClient) => {
  if (_driveApiClient == null) {
    google.drive({ version: 'v3', auth: authClient.oauth2Client });
  }
  return _driveApiClient;
};

const listFiles = async (query, onSuccess, onError) => {
  if (!_driveApiClient) {
    console.error('API client not initialized');
  }

  _driveApiClient.files.list({ q: query })
    .then((response) => {
      if (onSuccess) {
        onSuccess(response.data.files);
      }
      return response.data.files;
    })
    .catch((error) => {
      onError(error);
    });
};

const createFile = async (fileMetadata) => {
  if (!_driveApiClient) {
    console.error('API client not initialized');
  }

  _driveApiClient.files.create({ resource: fileMetadata })
    .then((response) => {
      return response.data;
    });
};

// const getFile = (name, files) => {
//   return files.find(file => file.name === name);
// };

const watchForChanges = async (fileId) => {
  if (!_driveApiClient) {
    console.error('API client not initialized');
  }

  const requestBody = {
    type: 'web_hook',
    id: uuidv4(),
    address: NOTIFICATION_ENDPOINT
  };

  _driveApiClient.files.watch({ fileId, requestBody })
    .then((response) => {
      return response;
    });
};

module.exports = { getDriveApiClient, createFile, listFiles, watchForChanges };