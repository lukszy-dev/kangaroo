import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect } from '@blueprintjs/core';

import Gist from 'models/Gist';

const GistSelectorPanel = ({ gists }) => {
  const gistItems = gists.map(gist => {
    return ({ label: gist.title, value: gist.id })
  });

  return (
    <Fragment>
      {gists.length > 1 && (
        <HTMLSelect
          options={gistItems}
        />
      )}
    </Fragment>
  );
};

GistSelectorPanel.propTypes = {
  gists: PropTypes.arrayOf(Gist)
};

export default GistSelectorPanel;
