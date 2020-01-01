import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, Classes } from '@blueprintjs/core';

const AuthTokenPanel = ({ authToken, onAccept, loading }) => {

  const handleOnAuthTokenChange = (event) => {
    // setToken(event.target.value);
  };

  const handleSetAuthToken = () => {
    onAccept(authToken);
  };

  return (
    <Fragment>
      <div className={Classes.DIALOG_BODY}>
        <p>GitHub personal access token:</p>
        <InputGroup
          placeholder="Token"
          value={authToken}
          onChange={handleOnAuthTokenChange}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button disabled={!authToken} onClick={handleSetAuthToken} loading={loading}>Set</Button>
        </div>
      </div>
    </Fragment>
  );
};

AuthTokenPanel.propTypes = {
  authToken: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

export default AuthTokenPanel;
