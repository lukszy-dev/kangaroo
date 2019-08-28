import React from 'react';
import PropTypes from 'prop-types';

const Resizer = ({ onMouseDown }) => {
  const style = {
    width: '4px',
    height: '100%',
    top: 0,
    right: '-2px',
    marginLeft: 'auto',
    position: 'absolute',
    cursor: 'col-resize',
    zIndex: 100
  };

  return (
    <span
      style={style}
      onMouseDown={event => onMouseDown(event)}
    />
  );
};

Resizer.propTypes = {
  onMouseDown: PropTypes.func.isRequired
};

export default Resizer;