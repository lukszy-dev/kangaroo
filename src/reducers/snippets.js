import {
  ADD_SNIPPET,
  UPDATE_SNIPPET,
  DELETE_SNIPPET,
  SET_CURRENT_SNIPPET,
  RECEIVE_SNIPPETS
} from '../actions/snippets';

import Snippet from '../models/Snippet';

const snippets = [
  new Snippet(
    { id: 1, title: 'Java', description: 'description', language: 'java', content: 'Java' }),
  new Snippet(
    { id: 2, title: 'JavaScript', description: 'description', language: 'javascript', content: 'JavaScript' }),
  new Snippet(
    { id: 3, title: 'React', description: 'description', language: 'javascript', content: 'React' })
];

const initial = {
  current: snippets ? snippets[0] : null,
  list: snippets,
  lastId: Math.max.apply(Math, snippets.map(s => s.id))
};

export default (state = initial, action) => {
  let list = [];

  switch (action.type) {
    case ADD_SNIPPET:
      const nextId = state.lastId + 1;
      const snippet = new Snippet({ id: nextId, title: 'New', language: 'text', content: '' });
      list = [...state.list, snippet];

      return {
        ...state,
        current: snippet,
        list,
        lastId: nextId
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
      list = state.list.filter(element => element.id !== state.current.id);

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