import React, { Fragment } from 'react';
import { Tooltip, Button, HTMLSelect, Position } from '@blueprintjs/core';

import TagBar from 'components/Editor/StatusBar/TagBar/TagBar';

import Snippet from 'models/Snippet';
import { languages } from 'models/languages';

import './StatusBar.scss';

type StatusBarProps = {
  snippet: Snippet | null;
  onShowGutter: () => void;
  onTagChange: (tag: string, remove: boolean) => void;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const StatusBar: React.FC<StatusBarProps> = ({
  snippet,
  onShowGutter,
  onTagChange,
  onLanguageChange,
}: StatusBarProps) => {
  const languageItems = Object.entries(languages).map(([key, value]) => ({ label: value.label, value: key }));

  return (
    <div className="StatusBar--container">
      <Tooltip content="Show gutter" position={Position.TOP}>
        <Button
          small={true}
          icon="list-detail-view"
          minimal={true}
          className="StatusBar--show-gutter"
          onClick={onShowGutter}
        />
      </Tooltip>

      {snippet ? (
        <Fragment>
          <TagBar selected={snippet.tags} onSelect={onTagChange} className="StatusBar--tag-bar" />

          <HTMLSelect
            value={snippet.language}
            minimal={true}
            iconProps={{ icon: 'caret-down' }}
            className="StatusBar--language-selector"
            onChange={onLanguageChange}
            options={languageItems}
          />
        </Fragment>
      ) : (
        <HTMLSelect minimal={true} iconProps={{ icon: 'caret-down' }} disabled={true} />
      )}
    </div>
  );
};

export default StatusBar;
