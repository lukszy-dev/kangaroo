import {
  ADD_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
  SET_CURRENT_SNIPPET,
  LOAD_SNIPPETS,
  SET_SEARCH_SNIPPETS,
  SnippetsState,
  SnippetsActionTypes,
} from './types';

const initialState: SnippetsState = {
  current: null,
  list: [],
  query: '',
  lastId: 0,
};

export const snippetsReducer = (state = initialState, action: SnippetsActionTypes): SnippetsState => {
  switch (action.type) {
    case ADD_SNIPPET:
      return {
        ...state,
        current: action.snippet,
        list: action.list,
        lastId: action.snippet.id,
      };

    case UPDATE_SNIPPET:
      return {
        ...state,
        current: action.snippet,
        list: action.list,
      };

    case DELETE_SNIPPET:
      return {
        ...state,
        current: action.current,
        list: action.list,
      };

    case SET_CURRENT_SNIPPET:
      return {
        ...state,
        current: state.list.find(element => element.id === action.id) || null,
      };

    case LOAD_SNIPPETS:
      return {
        ...state,
        list: action.list,
        current: action.current,
        lastId: action.lastId,
      };

    case SET_SEARCH_SNIPPETS:
      return {
        ...state,
        query: action.query,
      };

    default:
      return state;
  }
};
