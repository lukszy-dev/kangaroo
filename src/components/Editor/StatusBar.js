import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button, HTMLSelect, Position } from '@blueprintjs/core';

import Snippet from '../../models/Snippet';
import { languages } from './languages';

import './StatusBar.scss';

const StatusBar = ({ snippet, onShowGutter, onLanguageChange }) => {
  const languageItems = Object.entries(languages).map(([key, value]) =>
    ({label: value, value: key})
  );

  return (
    <div className="StatusBar--container">
      <Tooltip content="Show gutter" position={Position.TOP}>
        <Button
          small="true"
          icon="list-detail-view"
          minimal="true"
          style={{ marginLeft: "3px" }}
          onClick={onShowGutter}
        />
      </Tooltip>

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
  onShowGutter: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func
};

export default StatusBar;