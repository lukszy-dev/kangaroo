import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from './Loader';
import { Spinner } from '@blueprintjs/core';

configure({ adapter: new Adapter() });

describe('<Loader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('should render', () => {
    wrapper.contains(<Spinner />);
  });
});
