import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputGroup, FormGroup, Button, HTMLSelect, Divider, Classes, H5 } from '@blueprintjs/core';

import Gist from 'models/Gist';
import { SYNCHRONIZE_TYPE } from 'actions/snippets';

import './Panel.scss';

const GistSelectorPanel = ({
  remoteGists,
  gistDescription,
  gistId,
  backupGistId,
  onGistSelect,
  onGistDescriptionChange,
  onSynchronizeGist,
  onCreateGist,
  loading
}) => {
  const handleSynchronizeGist = (action) => () => {
    onSynchronizeGist(action)
  };

  const gistItems = remoteGists.map(gist => {
    return ({ label: gist.title, value: gist.id })
  });

  const renderGistCreator = () => {
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
          >
            Create
          </Button>
        </FormGroup>

        <FormGroup>
          <Divider />
        </FormGroup>
      </>
    );
  };

  const renderGistSelector = () => {
    if (remoteGists.length < 1) {
      return;
    }

    return (
      <>
        {backupGistId && (
          <>
            <H5>Backup snippets</H5>

            <FormGroup>
              <Button
                onClick={handleSynchronizeGist(SYNCHRONIZE_TYPE.BACKUP)}
                loading={loading}
                icon="cloud-upload"
              >
                Backup
              </Button>
            </FormGroup>

            <FormGroup>
              <Divider />
            </FormGroup>
          </>
        )}

        <H5>Synchronize with Gist</H5>

        <FormGroup>
          <HTMLSelect
            value={gistId}
            options={gistItems}
            onChange={onGistSelect}
            fill={true}
          />
        </FormGroup>

        <Button
          disabled={!gistId}
          onClick={handleSynchronizeGist(SYNCHRONIZE_TYPE.IMPORT)}
          loading={loading}
          icon="cloud-download"
        >
          Import
        </Button>
      </>
    );
  };

  return (
    <>
      <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
        {!gistId && renderGistCreator()}
        {renderGistSelector()}
      </div>
    </>
  );
};

GistSelectorPanel.propTypes = {
  remoteGists: PropTypes.arrayOf(Gist),
  gistDescription: PropTypes.string,
  gistId: PropTypes.string,
  backupGistId: PropTypes.string,
  onGistSelect: PropTypes.func.isRequired,
  onGistDescriptionChange: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateGist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default GistSelectorPanel;
