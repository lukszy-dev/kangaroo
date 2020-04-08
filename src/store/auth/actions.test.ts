import { setAuthToken } from 'store/auth/actions';
import { SET_GISTS } from 'store/auth/types';
import { SET_LOADING } from 'store/ui/types';

import mockStore from 'utils/test/mockStore';
import { GIST_ID, MOCK_TOKEN, MOCK_INVALID_TOKEN } from 'utils/test/mockSnippets';

jest.mock('utils/gistActions');
jest.mock('electron', () => {
  return {
    ipcRenderer: {
      send: jest.fn(),
    },
  };
});

describe('auth actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        lastSychronizedGistDate: new Date().toISOString(),
      },
    });
  });

  it('should set authentication token', () => {
    return store.dispatch(setAuthToken(MOCK_TOKEN)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({ type: SET_GISTS, gists: [{ id: GIST_ID }] });
      expect(actions[2]).toEqual({ type: SET_LOADING, loading: false });
    });
  });

  it('should return error on authentication token setting', () => {
    return store.dispatch(setAuthToken(MOCK_INVALID_TOKEN)).catch((error) => {
      const actions = store.getActions();
      expect(error).toEqual('ERROR');
      expect(actions[0]).toEqual({ type: SET_LOADING, loading: true });
      expect(actions[1]).toEqual({ type: SET_LOADING, loading: false });
    });
  });
});
