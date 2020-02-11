import React from 'react';
import { Spinner } from '@blueprintjs/core';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="Loader--container">
      <Spinner
        className="Loader--spinner"
        size={150}
      />
    </div>
  );
};

export default Loader;
