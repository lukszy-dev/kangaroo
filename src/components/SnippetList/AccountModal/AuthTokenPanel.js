import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, Classes } from '@blueprintjs/core';

const AuthTokenPanel = ({ authToken, onAuthTokenChange, onAccept, loading }) => {
  const handleSetAuthToken = () => {
    onAccept(authToken);
  };

  return (
    <Fragment>
      <div className={Classes.DIALOG_BODY}>
        <p>GitHub personal access token:</p>
        <InputGroup
          placeholder='Token'
          value={authToken}
          onChange={onAuthTokenChange}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button disabled={!authToken} onClick={handleSetAuthToken} loading={loading}>Connect</Button>
        </div>
      </div>
    </Fragment>
  );
};

AuthTokenPanel.propTypes = {
  authToken: PropTypes.string.isRequired,
  onAuthTokenChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

export default AuthTokenPanel;
