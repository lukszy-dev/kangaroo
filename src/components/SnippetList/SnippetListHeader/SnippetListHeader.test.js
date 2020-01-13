import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SnippetListHeader from './SnippetListHeader';

const mockProps = {
  query: '',
  onAddSnippet: jest.fn(),
  onSearchChange: jest.fn(),
  onSetAuthToken: jest.fn(),
  onSynchronizeGist: jest.fn(),
  onCreateBackupGist: jest.fn()
};

configure({ adapter: new Adapter() });

describe('<SnippetListHeader />', () => {
  it('renders without crashing', () => {
    shallow(<SnippetListHeader {...mockProps} />);
  });
});
