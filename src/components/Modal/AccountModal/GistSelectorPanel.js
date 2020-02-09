import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  AnchorButton
} from '@blueprintjs/core';

import Gist from 'models/Gist';

import '../Panel.scss';

const GistSelectorPanel = ({
  remoteGists,
  gistDescription,
  gistId,
  backupGistId,
  backupLocalSnippets,
  onGistSelect,
  onGistDescriptionChange,
  onBackupLocalSnippetsChange,
  onSynchronizeGist,
  onCreateGist,
  onDeleteAuthData,
  loading
}) => {
  const handleSynchronizeGist = (action) => () => {
    onSynchronizeGist(action)
  };

  const gistItems = remoteGists.map(gist => {
    return ({ label: gist.title, value: gist.id })
  });

  const renderGistCreator = () => {
    if (backupGistId) {
      return null;
    }

    return (
      <>
        <H5>Create new gist</H5>

        <FormGroup label="Description">
          <InputGroup
            placeholder="Description"
            onChange={onGistDescriptionChange}
            value={gistDescription}
          />
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

        <FormGroup><Divider /></FormGroup>
      </>
    );
  };

  const renderGistSelector = () => {
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
            <HTMLSelect
              value={gistId}
              options={gistItems}
              large={true}
              onChange={onGistSelect}
              fill={true}
            />
          )}
        </FormGroup>

        <Checkbox
          checked={backupLocalSnippets}
          label="Backup local snippets"
          onChange={onBackupLocalSnippetsChange}
        />

        <FormGroup>
          <Button
            disabled={!gistId}
            onClick={handleSynchronizeGist()}
            loading={loading}
            icon="cloud-download"
            text="Synchronize"
          />
        </FormGroup>
      </>
    );
  };

  const renderUnlinkAccountButton = () => {
    if (!backupGistId || remoteGists.length === 0) {
      return null;
    }

    return (
      <>
        <FormGroup><Divider /></FormGroup>
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

GistSelectorPanel.propTypes = {
  remoteGists: PropTypes.arrayOf(Gist),
  gistDescription: PropTypes.string,
  gistId: PropTypes.string,
  backupGistId: PropTypes.string,
  backupLocalSnippets: PropTypes.bool.isRequired,
  onGistSelect: PropTypes.func.isRequired,
  onGistDescriptionChange: PropTypes.func.isRequired,
  onBackupLocalSnippetsChange: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateGist: PropTypes.func.isRequired,
  onDeleteAuthData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default GistSelectorPanel;
