import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from './Loader';
import { Spinner } from '@blueprintjs/core';

configure({ adapter: new Adapter() });

describe('<Loader />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('renders without crashing', () => {
    wrapper.contains(<Spinner />);
  });
});
