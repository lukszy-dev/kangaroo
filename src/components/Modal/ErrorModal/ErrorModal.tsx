import React from 'react';
import classNames from 'classnames';
import { STATUS_CODES } from 'http';
import { FormGroup, Callout, Intent, Classes } from '@blueprintjs/core';

import '../Panel.scss';

type ErrorModalProps = {
  error: {
    status?: string;
    message?: string;
  };
};

const ErrorModal: React.FC<ErrorModalProps> = ({ error }) => {
  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      <FormGroup>
        <Callout intent={Intent.DANGER}>ERROR: {error.status ? STATUS_CODES[error.status] : error.message}</Callout>
      </FormGroup>
    </div>
  );
};

export default ErrorModal;
