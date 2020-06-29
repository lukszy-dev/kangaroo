import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import SnippetListElement from './SnippetListElement';

configure({ adapter: new Adapter() });

describe('<SnippetListElement />', () => {
  const mockProps = {
    snippetId: 1,
    snippetTags: '1,2,3',
    snippetTitle: 'Test',
    currentlySelectedId: 1,
    onChangeSnippet: jest.fn(),
    onContextMenu: jest.fn(),
  };

  it('renders without crashing', () => {
    shallow(<SnippetListElement {...mockProps} />);
  });

  it('matches snapshot', () => {
    const wrapper = renderer.create(<SnippetListElement {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
