import React, { memo } from 'react';
import { Tooltip, Button, HTMLSelect, Position, Icon, Navbar } from '@blueprintjs/core';
import classNames from 'classnames';

import TagBar from 'components/SnippetEditor/StatusBar/TagBar/TagBar';

import { languages } from 'models/languages';

import './StatusBar.scss';

type StatusBarProps = {
  snippetLanguage?: string;
  snippetTags?: string;
  snippetSource?: string;
  onShowGutter: () => void;
  onTagChange: (tag: string, remove: boolean) => void;
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const languageItems = Object.entries(languages).map(([key, value]) => ({ label: value.label, value: key }));

const StatusBar: React.FC<StatusBarProps> = ({
  snippetLanguage,
  snippetTags,
  snippetSource,
  onShowGutter,
  onTagChange,
  onLanguageChange,
}) => (
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

    {snippetSource && (
      <>
        <TagBar tags={snippetTags} onSelect={onTagChange} className="StatusBar--tag-bar" />
        <Navbar.Divider />

        <div className="StatusBar--synchronization-icon-container">
          <Icon icon="cloud" className="StatusBar--synchronization-icon" />
          <div className={classNames('StatusBar--synchronization-icon-status', snippetSource)} />
        </div>
        <Navbar.Divider />
      </>
    )}

    {snippetLanguage ? (
      <HTMLSelect
        value={snippetLanguage}
        minimal={true}
        iconProps={{ icon: 'caret-down' }}
        className="StatusBar--language-selector"
        onChange={onLanguageChange}
        options={languageItems}
      />
    ) : (
      <HTMLSelect minimal={true} iconProps={{ icon: 'caret-down' }} disabled={true} />
    )}
  </div>
);

export default memo(StatusBar);
