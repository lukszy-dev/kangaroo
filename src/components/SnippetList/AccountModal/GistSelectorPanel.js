import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputGroup, FormGroup, Button, HTMLSelect, Divider, Classes } from '@blueprintjs/core';

import Gist from 'models/Gist';

import './Panel.scss';

const GistSelectorPanel = ({
  remoteGists,
  gistName,
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

        <FormGroup label='Select existing Gist'>
          <HTMLSelect
            options={gistItems}
            onSelect={onGistSelect}
            fill={true}
          />
        </FormGroup>

        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onSynchronizeGist}>Import</Button>
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
        <FormGroup label='New Gist name'>
          <InputGroup
            placeholder='Gist name'
            onChange={onGistNameChange}
            value={gistName}
          />
        </FormGroup>
        <FormGroup>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onCreateGist}>Create</Button>
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
  onGistSelect: PropTypes.func.isRequired,
  onGistNameChange: PropTypes.func.isRequired,
  onSynchronizeGist: PropTypes.func.isRequired,
  onCreateGist: PropTypes.func.isRequired
};

export default GistSelectorPanel;
