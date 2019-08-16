import {
  ADD_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
  SET_CURRENT_SNIPPET,
  RECEIVE_SNIPPETS
} from '../actions/snippets';

import Snippet from '../models/Snippet';

const snippets = [
  new Snippet({ id: 1, title: 'Java', description: 'description', content: 'Java' }),
  new Snippet({ id: 2, title: 'JavaScript', description: 'description', content: 'JavaScript' }),
  new Snippet({ id: 3, title: 'React', description: 'description', content: 'React' })
];

const initial = {
  current: snippets ? snippets[0] : '',
  list: snippets
};

export default (state = initial, action) => {
  let list = [];

  switch (action.type) {
    case ADD_SNIPPET:
      const snippet = { id: state.list.length + 1, title: 'New', content: '' };
      list = [...state.list, snippet];

      return {
        ...state,
        current: snippet,
        list
      };

    case UPDATE_SNIPPET:
      const toUpdateIndex = state.list.findIndex(element => element.id === state.current.id);
      const updated = { ...action.snippet };
      list = [...state.list];
      list[toUpdateIndex] = updated;

      return {
        ...state,
        current: updated,
        list
      };

    case DELETE_SNIPPET:
      const toDeleteIndex = state.list.findIndex(element => element.id === state.current.id);
      list = [...state.list];
      list.splice(toDeleteIndex, 1);

      console.log(list);

      return {
        ...state,
        current: list[0],
        list
      };

    case SET_CURRENT_SNIPPET:
      return {
        ...state,
        current: state.list.find(element => element.id === action.id)
      };

    case RECEIVE_SNIPPETS:
      return {
        ...state
      };

    default:
      return state;
  }
}