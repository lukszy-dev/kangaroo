import {
  SHOW_GUTTER,
  EditorState,
  EditorActionTypes
} from "./types";

const initialState: EditorState = {
  gutter: true
};

export const editorReducer = (
  state = initialState,
  action: EditorActionTypes
): EditorState => {
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
