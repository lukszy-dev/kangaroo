import React from 'react';
import { Spinner } from '@blueprintjs/core';

import './Loader.scss';

const Loader: React.FC = () => (
  <div className="Loader--container">
    <Spinner className="Loader--spinner" size={Spinner.SIZE_LARGE} />
  </div>
);

export default Loader;
