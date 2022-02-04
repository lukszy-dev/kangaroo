import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configureMockStore } from '@jedmao/redux-mock-store';
import renderer from 'react-test-renderer';

import SnippetListHeader from './SnippetListHeader';

configure({ adapter: new Adapter() });

describe('<SnippetListHeader />', () => {
  const mockStore = configureMockStore();
  const mockProps = {
    query: '',
    onSearchChange: jest.fn(),
  };
  const initialState = { auth: { token: 'TOKEN' } };

  let store;

  it('renders without crashing', () => {
    store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <SnippetListHeader {...mockProps} />
      </Provider>,
    );
  });

  it('matches snapshot', () => {
    store = mockStore(initialState);
    const wrapper = renderer.create(
      <Provider store={store}>
        <SnippetListHeader {...mockProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
