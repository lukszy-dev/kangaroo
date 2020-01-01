import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Classes } from '@blueprintjs/core';

const MethodPanel = () => {
  return (
    <Fragment>
      <div className={Classes.DIALOG_BODY} styles={{ display: 'flex' }}>
        <Button onClick={() => alert('Create')}>Create</Button>
        <Button onClick={() => alert('Import')}>Import</Button>
      </div>
    </Fragment>
  );
};

MethodPanel.propTypes = {

};

export default MethodPanel;
