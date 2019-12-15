import { SHOW_GUTTER } from "../actions/editor";

const initial = {
  gutter: true
};

export default (state = initial, action) => {
  switch (action.type) {
    case SHOW_GUTTER:
      return {
        ...state,
        gutter: !state.gutter
      };

    default:
      return state;
  }
};
