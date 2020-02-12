import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import SnippetListHeader from './SnippetListHeader';

configure({ adapter: new Adapter() });

describe('<SnippetListHeader />', () => {
  const mockStore = configureStore();
  const mockProps = {
    query: '',
    onAddSnippet: jest.fn(),
    onSearchChange: jest.fn(),
    onSetAuthToken: jest.fn(),
    onSynchronizeGist: jest.fn(),
    onCreateBackupGist: jest.fn(),
    onDeleteAuthData: jest.fn(),
  };

  let store;

  it('renders without crashing', () => {
    store = mockStore({});
    shallow(
      <Provider store={store}>
        <SnippetListHeader {...mockProps} />
      </Provider>,
    );
  });
});
