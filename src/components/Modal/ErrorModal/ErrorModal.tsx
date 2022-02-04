import classNames from 'classnames';
import { STATUS_CODES } from 'http';
import { FormGroup, Callout, Intent, Classes } from '@blueprintjs/core';

import styles from '../Panel.module.scss';

const cx = classNames.bind(styles);

type ErrorModalProps = {
  error: {
    status?: string;
    message?: string;
  };
};

const ErrorModal: React.FC<ErrorModalProps> = ({ error }) => {
  return (
    <div className={cx([Classes.DIALOG_BODY], { [styles.dialogBody]: true })}>
      <FormGroup>
        <Callout intent={Intent.DANGER}>ERROR: {error.status ? STATUS_CODES[error.status] : error.message}</Callout>
      </FormGroup>
    </div>
  );
};

export default ErrorModal;
