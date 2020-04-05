import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import StatusBar from './StatusBar';
import Snippet from 'models/Snippet';

configure({ adapter: new Adapter() });

describe('<StatusBar />', () => {
  const mockProps = {
    snippet: new Snippet({ id: 0, title: 'TEST' }),
    onShowGutter: jest.fn(),
    onTagChange: jest.fn(),
    onLanguageChange: jest.fn(),
  };

  it('render without crashing', () => {
    shallow(<StatusBar {...mockProps} />);
  });

  it('matches snapshot', () => {
    const wrapper = renderer.create(<StatusBar {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
