import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Classes } from '@blueprintjs/core';

const MethodPanel = () => {
  return (
    <Fragment>
      <div className={Classes.DIALOG_FOOTER} style={{ margin: '20px auto 0 auto' }}>
        <ButtonGroup>
          <Button large={true} onClick={() => alert('Create')}>Create</Button>
          <Button large={true} onClick={() => alert('Import')}>Import</Button>
        </ButtonGroup>
      </div>
    </Fragment>
  );
};

MethodPanel.propTypes = {

};

export default MethodPanel;
