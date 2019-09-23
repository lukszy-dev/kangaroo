import { loadSnippets } from '../actions/snippets';

export const APP_COMMAND = 'APP_COMMAND';

export default (dispatch, message) => {
  const { action, data } = message;

  console.log(action);

  switch (action) {
    case 'DB_LOAD':
      dispatch(loadSnippets(data));
      break;

    case 'SWITCH_THEME':
      // dispatch(switchTheme());
      break;

    default:
      break;
  }
};
