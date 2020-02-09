import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { STATUS_CODES } from 'http';
import { FormGroup, Callout, Intent, Classes } from '@blueprintjs/core';

import '../Panel.scss';

const ErrorModal = ({ error }) => {
  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      <FormGroup>
        <Callout intent={Intent.DANGER}>
          {error.status ? STATUS_CODES[error.status] : JSON.stringify(error)}
        </Callout>
      </FormGroup>
    </div>
  )
};

ErrorModal.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default ErrorModal;
