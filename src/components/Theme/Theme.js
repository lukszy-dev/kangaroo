import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Light, Dark } from './themes';

const Theme = ({ mode, children, className }) => {
  const variables = mode === 'dark' ? Dark : Light;
  const node = createRef();

  useEffect(() => {
    const updateCSSVariables = () => {
      if (!variables) {
        return;
      }

      Object.entries(variables).forEach(([prop, value]) =>
        node.current.style.setProperty(prop, value)
      );
    }

    updateCSSVariables();
  }, [node, variables]);

  const containerClassNames = classNames({
    'bp3-dark': mode === 'dark',
    'bp3-focus-disabled': true
  }, className);

  return (
    <div className={containerClassNames} ref={node}>
      { children }
    </div>
  );
}

Theme.propTypes = {
  mode: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string
};

Theme.Light = Light;
Theme.Dark = Dark;

export default Theme;
