import { useEffect, createRef } from 'react';
import classNames from 'classnames';

import { Light, Dark } from './themes';

type ThemeProps = {
  mode: string;
  children: React.ReactElement;
  className: string;
};

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

const Theme: React.FC<ThemeProps> = ({ mode, children, className }) => {
  const variables = mode === ThemeType.DARK ? Dark : Light;
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const updateCSSVariables = (): void => {
      if (!variables) {
        return;
      }

      Object.entries(variables).forEach(([prop, value]) => {
        const node = containerRef.current;
        if (node) {
          node.style.setProperty(prop, value);
        }
      });
    };

    updateCSSVariables();
  }, [containerRef, variables]);

  const containerClassNames = classNames(
    {
      'bp3-dark': mode === ThemeType.DARK,
      'bp3-focus-disabled': true,
    },
    className,
  );

  return (
    <div className={containerClassNames} ref={containerRef}>
      {children}
    </div>
  );
};

export default Theme;
