import { ADD, LOAD } from './dbActions';

export const APP_COMMAND = 'APP_COMMAND';
export const DB_COMMAND = 'DB_COMMAND';

export default (event, message) => {
  const { action } = message;

  switch (action) {
    case ADD:
      console.log(message);
      break;

    case LOAD:
      console.log(message.data);
      break;

    default:
      break;
  }
};
