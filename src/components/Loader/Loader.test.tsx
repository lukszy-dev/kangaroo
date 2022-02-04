import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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
