const AUTH_TOKEN = 'auth_token';

const FILE_NAME = 'sm_data';
const QUERY = "name='" + FILE_NAME + "' and mimeType='text/plain'";

const FILE_METADATA = {
  name: FILE_NAME,
  mimeType: 'text/plain'
};

module.exports = { AUTH_TOKEN, FILE_NAME, FILE_METADATA, QUERY };