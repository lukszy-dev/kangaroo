import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputGroup, FormGroup, Button, HTMLSelect, Divider, Classes, H5 } from '@blueprintjs/core';

import Gist from 'models/Gist';

import './Panel.scss';

const GistSelectorPanel = ({
  remoteGists,
  gistName,
  gistId,
  onGistSelect,
  onGistNameChange,
  onSynchronizeGist,
  onCreateGist
}) => {
  const gistItems = remoteGists.map(gist => {
    return ({ label: gist.title, value: gist.id })
  });

  const renderGistSelector = () => {
    if (remoteGists.length < 1) {
      return;
    }

    return (
      <Fragment>
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
          <Button disabled={!gistId} onClick={onSynchronizeGist}>Import</Button>
        </div>
      </Fragment>
    );
  };

  const dialogBodyClass = classNames({
    [Classes.DIALOG_BODY]: true,
    'Panel--dialog-body': true
  }); 

  return (
    <Fragment>
      <div className={dialogBodyClass}>
        <H5>Create new gist</H5>

        <FormGroup label='Name'>
          <InputGroup
            placeholder='Name'
            onChange={onGistNameChange}
            value={gistName}
          />
        </FormGroup>

        <FormGroup label='Description'>
          <InputGroup
            placeholder='Description'
          />
        </FormGroup>

        <FormGroup>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button disabled={!gistName} onClick={onCreateGist}>Create</Button>
          </div>
        </FormGroup>

        {renderGistSelector()}
      </div>
    </Fragment>
  );
};

GistSelectorPanel.propTypes = {
  remoteGists: PropTypes.arrayOf(Gist),
  gistName: PropTypes.string,
  gistId: PropTypes.string,
  onGistSelect: PropTypes.func.isRequired,
  onGistNameChange: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateGist: PropTypes.func.isRequired
};

export default GistSelectorPanel;
