import React from 'react';
import classNames from 'classnames';
import { GistsListResponseItem } from '@octokit/rest';

import {
  InputGroup,
  FormGroup,
  Button,
  HTMLSelect,
  Divider,
  Classes,
  Callout,
  H5,
  Intent,
  Checkbox,
  AnchorButton,
} from '@blueprintjs/core';

import '../Panel.scss';

type GistSelectorPanelProps = {
  remoteGists: GistsListResponseItem[];
  gistDescription: string;
  gistId: string;
  backupGistId: string;
  backupLocalSnippets: boolean;
  lastSychronizedGistDate: string;
  onGistSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onGistDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBackupLocalSnippetsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSynchronizeGist: () => void;
  onCreateGist: () => void;
  onDeleteAuthData: () => void;
  loading: boolean;
};

const GistSelectorPanel: React.FC<GistSelectorPanelProps> = ({
  remoteGists,
  gistDescription,
  gistId,
  backupGistId,
  backupLocalSnippets,
  lastSychronizedGistDate,
  onGistSelect,
  onGistDescriptionChange,
  onBackupLocalSnippetsChange,
  onSynchronizeGist,
  onCreateGist,
  onDeleteAuthData,
  loading,
}: GistSelectorPanelProps) => {
  const gistItems = remoteGists.map(gist => {
    const keys = Object.keys(gist.files);
    const title = keys[keys.length - 1];
    return { label: title, value: gist.id };
  });

  const renderGistCreator = (): React.ReactElement | null => {
    if (backupGistId) {
      return null;
    }

    return (
      <>
        <H5>Create new gist</H5>

        <FormGroup label="Description">
          <InputGroup placeholder="Description" onChange={onGistDescriptionChange} value={gistDescription} />
        </FormGroup>

        <FormGroup>
          <Button
            disabled={!gistDescription}
            onClick={onCreateGist}
            loading={loading}
            icon="cloud-upload"
            text="Create"
          />
        </FormGroup>

        <FormGroup>
          <Divider />
        </FormGroup>
      </>
    );
  };

  const renderGistSelector = (): React.ReactElement | null => {
    if (remoteGists.length === 0) {
      return null;
    }

    return (
      <>
        <H5>Synchronize with Gist</H5>

        <FormGroup>
          {backupGistId ? (
            <Callout>{gistItems[0].label}</Callout>
          ) : (
            <HTMLSelect value={gistId} options={gistItems} large={true} onChange={onGistSelect} fill={true} />
          )}
        </FormGroup>

        <Checkbox checked={backupLocalSnippets} label="Backup local snippets" onChange={onBackupLocalSnippetsChange} />

        <FormGroup>
          <Button
            disabled={!gistId}
            onClick={onSynchronizeGist}
            loading={loading}
            icon="cloud-download"
            text="Synchronize"
          />
          {lastSychronizedGistDate && (
            <span className={classNames('GistSelectorPanel--synchronization-date', 'bp3-text-muted', 'bp3-text-small')}>
              Last synchronized gist: {new Date(lastSychronizedGistDate).toISOString()}
            </span>
          )}
        </FormGroup>
      </>
    );
  };

  const renderUnlinkAccountButton = (): React.ReactElement | null => {
    if (!backupGistId || remoteGists.length === 0) {
      return null;
    }

    return (
      <>
        <FormGroup>
          <Divider />
        </FormGroup>
        <AnchorButton
          icon="log-out"
          minimal={true}
          intent={Intent.DANGER}
          onClick={onDeleteAuthData}
          text="Unlink GitHub account"
        />
      </>
    );
  };

  return (
    <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
      {renderGistCreator()}
      {renderGistSelector()}
      {renderUnlinkAccountButton()}
    </div>
  );
};

export default GistSelectorPanel;
