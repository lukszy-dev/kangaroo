import { AppDispatch } from 'store/types';
import { switchTheme } from 'store/ui/actions';

export const APP_COMMAND = 'APP_COMMAND';

export type AppCommandMessage = {
  action: {};
};

export default (dispatch: AppDispatch, message: AppCommandMessage) => {
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
