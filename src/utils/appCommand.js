import { switchTheme } from '../actions/ui';
import { loadSnippets } from '../actions/snippets';

export const APP_COMMAND = 'APP_COMMAND';

export default (dispatch, message) => {
  const { action, data } = message;

  switch (action) {
    case 'DB_LOAD':
      dispatch(loadSnippets(data));
      break;

    case 'SWITCH_THEME':
      dispatch(switchTheme());
      break;

    case 'ERROR':
      break;

    default:
      break;
  }
};
