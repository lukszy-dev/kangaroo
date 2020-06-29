import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import EditorHeader from './EditorHeader';

configure({ adapter: new Adapter() });

describe('<EditorHeader />', () => {
  const mockProps = {
    snippetId: 1,
    snippetTitle: 'test',
    onTitleChange: jest.fn(),
  };

  it('render without crashing', () => {
    shallow(<EditorHeader {...mockProps} />);
  });

  it('matches snapshot', () => {
    const wrapper = renderer.create(<EditorHeader {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
