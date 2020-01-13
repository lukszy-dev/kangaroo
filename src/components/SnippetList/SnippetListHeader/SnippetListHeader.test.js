import React from 'react';
import renderer from 'react-test-renderer';
import SnippetListHeader from './SnippetListHeader';

describe('<SnippetListHeader />', () => {
  it('should render', () => {
    const component = renderer.create(
      <SnippetListHeader />
    );
  });
});