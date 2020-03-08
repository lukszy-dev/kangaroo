import React from 'react';
import { Tooltip, Button, HTMLSelect, Position } from '@blueprintjs/core';

import Snippet from '../../../models/Snippet';
import { languages } from '../../../models/languages';

import './StatusBar.scss';

type StatusBarProps = {
  snippet: Snippet | null;
  onShowGutter: () => void;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const StatusBar: React.FC<StatusBarProps> = ({ snippet, onShowGutter, onLanguageChange }: StatusBarProps) => {
  const languageItems = Object.entries(languages).map(([key, value]) => ({ label: value.label, value: key }));

  return (
    <div className="StatusBar--container">
      <Tooltip content="Show gutter" position={Position.TOP}>
        <Button
          small={true}
          icon="list-detail-view"
          minimal={true}
          style={{ marginLeft: '3px' }}
          onClick={onShowGutter}
        />
      </Tooltip>

      {snippet ? (
        <HTMLSelect
          value={snippet.language}
          minimal={true}
          iconProps={{ icon: 'caret-down' }}
          style={{ textTransform: 'capitalize' }}
          onChange={onLanguageChange}
          options={languageItems}
        />
      ) : (
        <HTMLSelect minimal={true} iconProps={{ icon: 'caret-down' }} disabled={true} />
      )}
    </div>
  );
};

export default StatusBar;
