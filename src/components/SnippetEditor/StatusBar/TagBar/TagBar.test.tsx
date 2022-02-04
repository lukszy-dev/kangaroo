import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';

import TagBar from './TagBar';

configure({ adapter: new Adapter() });

describe('<TagBar />', () => {
  const mockProps = {
    tags: '1,2,3',
    onSelect: jest.fn(),
  };

  it('render without crashing', () => {
    shallow(<TagBar {...mockProps} />);
  });

  it('matches snapshot', () => {
    const wrapper = renderer.create(<TagBar {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
