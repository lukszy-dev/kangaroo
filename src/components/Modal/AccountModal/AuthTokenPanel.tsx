import classNames from 'classnames';
import { Button, InputGroup, FormGroup, Classes } from '@blueprintjs/core';

import styles from '../Panel.module.scss';

const cx = classNames.bind(styles);

type AuthTokenPanelProps = {
  authToken: string;
  onAuthTokenChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAccept: () => void;
  loading: boolean;
};

const AuthTokenPanel: React.FC<AuthTokenPanelProps> = ({ authToken, onAuthTokenChange, onAccept, loading }) => {
  return (
    <div className={cx([Classes.DIALOG_BODY], { [styles.dialogBody]: true })}>
      <FormGroup label="GitHub personal access token">
        <InputGroup placeholder="Token" value={authToken || ''} onChange={onAuthTokenChange} />
      </FormGroup>

      <Button disabled={!authToken} onClick={onAccept} loading={loading} text="Connect" />
    </div>
  );
};

export default AuthTokenPanel;
