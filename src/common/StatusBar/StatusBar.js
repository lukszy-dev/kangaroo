import React from 'react';

import { Button } from '@blueprintjs/core';

import './StatusBar.css';

const StatusBar = () => {
  return (
    <div className="StatusBar--container">
      <Button icon="caret-down" minimal={true}>Java</Button>
    </div>
  );
};

export default StatusBar;