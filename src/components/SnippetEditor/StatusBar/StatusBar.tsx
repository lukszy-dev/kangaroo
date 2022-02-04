import { memo } from 'react';
import classNames from 'classnames';
import { Button, HTMLSelect, Position, Icon, Navbar } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

import TagBar from 'components/SnippetEditor/StatusBar/TagBar/TagBar';
import { languages } from 'models/languages';

import styles from './StatusBar.module.scss';

const cx = classNames.bind(styles);

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
  <div className={styles.container}>
    <Tooltip2 content="Show gutter" position={Position.TOP}>
      <Button
        small={true}
        icon="list-detail-view"
        minimal={true}
        className={styles.showGutter}
        onClick={onShowGutter}
      />
    </Tooltip2>

    {snippetSource && (
      <>
        <TagBar tags={snippetTags} onSelect={onTagChange} />
        <Navbar.Divider />

        <Tooltip2 content={snippetSource.toUpperCase()} position={Position.TOP}>
          <div className={styles.synchronizationIconContainer}>
            <Icon icon="cloud" className={styles.synchronizationIcon} />
            <div className={cx({ [styles.synchronizationIconStatus]: true, [styles[snippetSource]]: true })} />
          </div>
        </Tooltip2>
        <Navbar.Divider />
      </>
    )}

    {snippetLanguage ? (
      <HTMLSelect
        value={snippetLanguage}
        minimal={true}
        iconProps={{ icon: 'caret-down' }}
        className={styles.languageSelector}
        onChange={onLanguageChange}
        options={languageItems}
      />
    ) : (
      <HTMLSelect minimal={true} iconProps={{ icon: 'caret-down' }} disabled={true} />
    )}
  </div>
);

export default memo(StatusBar);
