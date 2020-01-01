import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Button, HTMLSelect, Divider, Classes } from '@blueprintjs/core';

import Gist from 'models/Gist';

const GistSelectorPanel = ({ gists }) => {
  const gistItems = gists.map(gist => {
    return ({ label: gist.title, value: gist.id })
  });

  return (
    <Fragment>
      <div className={Classes.DIALOG_BODY}>
        <InputGroup
          placeholder='Name'
        />
        <Button>Create</Button>
        <Divider style={{ margin: '10px 0' }} />
        <p>Select gist:</p>
        {gists.length > 1 && (
          <HTMLSelect
            options={gistItems}
            fill={true}
          />
        )}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <Button>Import</Button>
      </div>
    </Fragment>
  );
};

GistSelectorPanel.propTypes = {
  gists: PropTypes.arrayOf(Gist)
};

export default GistSelectorPanel;
