import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, InputGroup, FormGroup, Classes } from '@blueprintjs/core';

import '../Panel.scss';

const AuthTokenPanel = ({ authToken, onAuthTokenChange, onAccept, loading }) => {
  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      <FormGroup label="GitHub personal access token">
        <InputGroup
          placeholder="Token"
          value={authToken || ''}
          onChange={onAuthTokenChange}
        />
      </FormGroup>

      <Button
        disabled={!authToken}
        onClick={onAccept}
        loading={loading}
        text="Connect"
      />
    </div>
  );
};

AuthTokenPanel.propTypes = {
  authToken: PropTypes.string.isRequired,
  onAuthTokenChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

export default AuthTokenPanel;
