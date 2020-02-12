import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Button } from '@blueprintjs/core';
import SnippetListElement from './SnippetListElement';
import Snippet from 'models/Snippet';

configure({ adapter: new Adapter() });

describe('<SnippetListElement />', () => {
  const mockProps = {
    element: new Snippet({ id: 1, title: 'Test' }),
    currentlySelectedId: 1,
    onChangeSnippet: jest.fn(),
    onContextMenu: jest.fn(),
  };

  it('renders without crashing', () => {
    shallow(<SnippetListElement {...mockProps} />);
  });

  it('renders with <Button /> if sourceType is GIST', () => {
    const wrapper = shallow(<SnippetListElement {...mockProps} />);
    wrapper.contains(<Button />);
  });
});
