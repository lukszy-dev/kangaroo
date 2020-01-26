import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputGroup, FormGroup, Button, HTMLSelect, Divider, Classes, H5 } from '@blueprintjs/core';

import Gist from 'models/Gist';

import './Panel.scss';

const GistSelectorPanel = ({
  remoteGists,
  gistDescription,
  gistId,
  onGistSelect,
  onGistDescriptionChange,
  onSynchronizeGist,
  onCreateGist,
  loading
}) => {
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
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              disabled={!gistDescription}
              onClick={onCreateGist}
              loading={loading}
            >
              Create
            </Button>
          </div>
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
        <FormGroup>
          <Divider />
        </FormGroup>

        <H5>Synchronize with existing </H5>

        <FormGroup>
          <HTMLSelect
            value={gistId}
            options={gistItems}
            onChange={onGistSelect}
            fill={true}
          />
        </FormGroup>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            disabled={!gistId}
            onClick={onSynchronizeGist}
            loading={loading}
          >
            Import
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classNames([[Classes.DIALOG_BODY], 'Panel--dialog-body'])}>
        {renderGistCreator()}
        {renderGistSelector()}
      </div>
    </>
  );
};

GistSelectorPanel.propTypes = {
  remoteGists: PropTypes.arrayOf(Gist),
  gistDescription: PropTypes.string,
  gistId: PropTypes.string,
  onGistSelect: PropTypes.func.isRequired,
  onGistDescriptionChange: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateGist: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default GistSelectorPanel;
