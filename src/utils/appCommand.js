import { switchTheme } from 'store/ui/actions';

export const APP_COMMAND = 'APP_COMMAND';

export default (dispatch, message) => {
  const { action } = message;

  switch (action) {
    case 'SWITCH_THEME':
      dispatch(switchTheme());
      break;

    case 'ERROR':
      break;

    default:
      break;
  }
};
