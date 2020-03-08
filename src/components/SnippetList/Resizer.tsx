import React, { CSSProperties } from 'react';

type ResizerProps = {
  onMouseDown: (event: React.MouseEvent) => void;
};

const Resizer: React.FC<ResizerProps> = ({ onMouseDown }: ResizerProps) => {
  const style: CSSProperties = {
    width: '4px',
    height: '100%',
    top: 0,
    right: '-2px',
    marginLeft: 'auto',
    position: 'absolute',
    cursor: 'col-resize',
  };

  return <span style={style} onMouseDown={onMouseDown} />;
};

export default Resizer;
