import React from 'react';
import PropTypes from 'prop-types';
import { HTMLSelect } from '@blueprintjs/core';

import Snippet from '../../models/Snippet';
import { languages } from './languages';

import './StatusBar.scss';

const StatusBar = ({ snippet, onLanguageChange }) => {
  const languageItems = Object.entries(languages).map(([key, value]) =>
    ({label: value, value: key})
  );
  return (
    <div className="StatusBar--container">
      { snippet ?
        <HTMLSelect
          value={snippet.language}
          minimal="true"
          iconProps={{icon: 'caret-down'}}
          style={{textTransform: 'capitalize'}}
          onChange={onLanguageChange}
          options={languageItems}
        /> :
        <HTMLSelect
          minimal="true"
          iconProps={{icon: 'caret-down'}}
          disabled={true}
        />
      }
    </div>
  );
};

StatusBar.propTypes = {
  snippet: PropTypes.instanceOf(Snippet),
  onLanguageChange: PropTypes.func
};

export default StatusBar;