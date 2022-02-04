import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';

import StatusBar from './StatusBar';

configure({ adapter: new Adapter() });

describe('<StatusBar />', () => {
  const mockProps = {
    snippetLanguage: 'text',
    snippetTags: '',
    snippetSource: 'local',
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
