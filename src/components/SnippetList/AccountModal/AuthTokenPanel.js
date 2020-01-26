import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, InputGroup, FormGroup, Classes } from '@blueprintjs/core';

import './Panel.scss';

const AuthTokenPanel = ({ authToken, onAuthTokenChange, onAccept, loading }) => {
  const dialogBodyClass = classNames({
    [Classes.DIALOG_BODY]: true,
    'Panel--dialog-body': true
  }); 

  return (
    <>
      <div className={dialogBodyClass}>
        <FormGroup label="GitHub personal access token">
          <InputGroup
            placeholder="Token"
            value={authToken}
            onChange={onAuthTokenChange}
          />
        </FormGroup>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          {/* <Button disabled={!authToken}>Unlink</Button> */}
          <Button disabled={!authToken} onClick={onAccept} loading={loading}>Connect</Button>
        </div>
      </div>
    </>
  );
};

AuthTokenPanel.propTypes = {
  authToken: PropTypes.string.isRequired,
  onAuthTokenChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

export default AuthTokenPanel;
