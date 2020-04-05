import React from 'react';
import classNames from 'classnames';
import { STATUS_CODES } from 'http';
import { FormGroup, Callout, Intent, Classes } from '@blueprintjs/core';

import '../Panel.scss';

type ErrorModalProps = {
  error: { status?: string };
};

const ErrorModal: React.FC<ErrorModalProps> = ({ error }) => {
  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      <FormGroup>
        <Callout intent={Intent.DANGER}>{error.status ? STATUS_CODES[error.status] : JSON.stringify(error)}</Callout>
      </FormGroup>
    </div>
  );
};

export default ErrorModal;
