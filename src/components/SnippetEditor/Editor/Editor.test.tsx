import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configureMockStore } from '@jedmao/redux-mock-store';
import renderer from 'react-test-renderer';

import Editor from './Editor';

jest.mock('ace-builds/webpack-resolver', () => jest.fn());

configure({ adapter: new Adapter() });

describe('<Editor />', () => {
  const mockStore = configureMockStore();
  const mockProps = {
    gutter: true,
    onChange: jest.fn(),
  };
  const initialState = { ui: { theme: 'dark', leftPanelWidth: 200 } };

  let store;

  it('render without crashing', () => {
    store = mockStore(initialState);
    shallow(
      <Provider store={store}>
        <Editor {...mockProps} />
      </Provider>,
    );
  });

  it('matches snapshot', () => {
    store = mockStore(initialState);
    const wrapper = renderer.create(
      <Provider store={store}>
        <Editor {...mockProps} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
