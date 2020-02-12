import React from 'react';
import classNames from 'classnames';
import { Button, InputGroup, FormGroup, Classes } from '@blueprintjs/core';

import '../Panel.scss';

type AuthTokenPanelProps = {
  authToken: string;
  onAuthTokenChange: () => void;
  onAccept: () => void;
  loading: boolean;
};

const AuthTokenPanel = ({ authToken, onAuthTokenChange, onAccept, loading }: AuthTokenPanelProps) => {
  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      <FormGroup label="GitHub personal access token">
        <InputGroup placeholder="Token" value={authToken || ''} onChange={onAuthTokenChange} />
      </FormGroup>

      <Button disabled={!authToken} onClick={onAccept} loading={loading} text="Connect" />
    </div>
  );
};

export default AuthTokenPanel;
