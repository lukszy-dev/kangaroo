import React, { useEffect, createRef } from "react";
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Light, Dark } from "./themes";

const Theme = ({ mode, children, classNames }) => {
  const variables = mode === 'dark' ? Dark : Light;

  const node = createRef();

  useEffect(() => {
    const updateCSSVariables = () => {
      if (!variables) {
        return;
      }

      Object.entries(variables).forEach(([prop, value]) => node.current.style.setProperty(prop, value));
    }

    updateCSSVariables();
  }, [node, variables])

  return (
    <div className={cn({ 'bp3-dark': mode === 'dark' }, classNames)} ref={node}>
      { children }
    </div>
  );
}

Theme.propTypes = {
  mode: PropTypes.string.isRequired,
  children: PropTypes.any,
  classNames: PropTypes.string
};

Theme.Light = Light;
Theme.Dark = Dark;

export default Theme;