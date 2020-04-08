import {
  initSnippets,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  setSearchSnippets,
  synchronizeGist,
  createBackupGist,
} from 'store/snippets/actions';
import { LOAD_SNIPPETS, ADD_SNIPPET, UPDATE_SNIPPET, DELETE_SNIPPET, SET_SEARCH_SNIPPETS } from 'store/snippets/types';
import { SET_GH_DATA } from 'store/auth/types';
import { SET_LOADING } from 'store/ui/types';

import { sourceType } from 'models/Snippet';

import mockStore from 'utils/test/mockStore';
import {
  mockSnippet,
  MOCK_CONTENT,
  MOCK_LAST_SYNCHRONIZED_GIST_DATE,
  UPDATED_AT,
  GIST_ID,
  MOCK_TOKEN,
} from 'utils/test/mockSnippets';

jest.mock('db/snippets');
jest.mock('utils/gistActions');
jest.mock('electron', () => {
  return {
    ipcRenderer: {
      send: jest.fn(),
    },
  };
});

describe('snippets actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const currentSnippetMock = mockSnippet();
    store = mockStore({
      snippets: {
        current: currentSnippetMock,
        list: [currentSnippetMock],
        lastId: 0,
      },
      auth: {
        lastSychronizedGistDate: new Date().toISOString(),
      },
    });
  });

  it('should initialize snippets', () => {
    return store.dispatch(initSnippets()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', LOAD_SNIPPETS);
    });
  });

  it('should add snippet', () => {
    store.dispatch(addSnippet());
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', ADD_SNIPPET);
  });

  it('should update snippet', () => {
    const snippetMock = {
      id: 0,
      title: 'test0',
    };

    store.dispatch(updateSnippet(snippetMock));
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', UPDATE_SNIPPET);
    expect(actions[0]).toHaveProperty('snippet.title', snippetMock.title);
  });

  it('should delete snippet', () => {
    store.dispatch(deleteSnippet());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: DELETE_SNIPPET, current: undefined, list: [] });
  });

  it('should set search query', () => {
    const query = 'query';

    store.dispatch(setSearchSnippets(query));
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: SET_SEARCH_SNIPPETS, query });
  });

  it('should not synchronize', () => {
    return store.dispatch(synchronizeGist(false, MOCK_TOKEN, GIST_ID)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({ type: SET_LOADING, loading: false });
    });
  });

  it('should synchronize with gist (fetch from gist)', () => {
    const currentSnippetMock = mockSnippet();
    store = mockStore({
      snippets: {
        current: currentSnippetMock,
        list: [currentSnippetMock],
        lastId: 0,
      },
      auth: {
        lastSychronizedGistDate: '2020-01-01T18:00:00.000Z',
      },
    });

    return store.dispatch(synchronizeGist(false, MOCK_TOKEN, GIST_ID)).then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({
        type: SET_GH_DATA,
        token: MOCK_TOKEN,
        backupGistId: GIST_ID,
        lastSychronizedGistDate: '2020-02-01T18:00:00.000Z',
      });
      expect(actions[2]).toHaveProperty('type', LOAD_SNIPPETS);
      expect(actions[2]).toHaveProperty('current.content', MOCK_CONTENT);
      expect(actions[3]).toEqual({ type: SET_LOADING, loading: false });
    });
  });

  it('should synchronize with gist (update gist without backing up local snippets)', () => {
    const currentSnippetMock = mockSnippet('2020-03-01T18:00:00.000Z');
    currentSnippetMock.source = sourceType.GIST;
    store = mockStore({
      snippets: {
        current: currentSnippetMock,
        list: [currentSnippetMock],
        lastId: 0,
      },
      auth: {
        lastSychronizedGistDate: '2020-02-01T18:00:00.000Z',
      },
    });

    return store.dispatch(synchronizeGist(false, MOCK_TOKEN, GIST_ID)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({
        type: SET_GH_DATA,
        token: MOCK_TOKEN,
        backupGistId: GIST_ID,
        lastSychronizedGistDate: MOCK_LAST_SYNCHRONIZED_GIST_DATE,
      });
      expect(actions[2]).toEqual({ type: SET_LOADING, loading: false });
    });
  });

  it('should create backup gist', () => {
    return store.dispatch(createBackupGist('description', MOCK_TOKEN)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({
        type: SET_GH_DATA,
        token: MOCK_TOKEN,
        backupGistId: GIST_ID,
        lastSychronizedGistDate: UPDATED_AT,
      });
      expect(actions[2]).toHaveProperty('type', LOAD_SNIPPETS);
      expect(actions[2]).toHaveProperty('current.content', MOCK_CONTENT);
      expect(actions[3]).toEqual({ type: SET_LOADING, loading: false });
    });
  });
});
