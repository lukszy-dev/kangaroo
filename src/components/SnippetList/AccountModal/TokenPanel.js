import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from '@blueprintjs/core';

const TokenPanel = ({ userToken, onUserTokenChange }) => {  
  return (
    <Fragment>
      <p>GitHub personal access token:</p>
      <InputGroup
        placeholder="Token"
        value={userToken}
        onChange={onUserTokenChange}
      />
    </Fragment>
  );
};

TokenPanel.propTypes = {
  userToken: PropTypes.string.isRequired,
  onUserTokenChange: PropTypes.func.isRequired
};

export default TokenPanel;
