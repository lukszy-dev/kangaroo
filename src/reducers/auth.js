import { INIT_LOGIN, SET_USER } from "../actions/auth";

const initial = {
  user: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      break;

    case SET_USER:
      return {
        ...state,
        user: action.user
      };

    default:
      break;
  }
}
