import React, { useState, useEffect, useRef } from 'react';

import './ScrollableWrapper.scss';

type ScrollableWrapperProps = {
  children: React.ReactElement;
  topShadow: boolean;
  bottomShadow: boolean;
  alwaysOn: boolean;
};

const ScrollableWrapper: React.FC<ScrollableWrapperProps> = ({
  children,
  topShadow = true,
  bottomShadow = true,
  alwaysOn = false,
}: ScrollableWrapperProps) => {
  const [top, setActiveTop] = useState(alwaysOn);
  const [bottom, setActiveBottom] = useState(alwaysOn);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomShadow && contentRef.current) {
      const {
        current: { scrollHeight, clientHeight },
      } = contentRef;

      if (scrollHeight > clientHeight) {
        setActiveBottom(true);
      }
    }
  }, [bottomShadow]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = ({ target }: any): void => {
    if (alwaysOn) {
      return;
    }

    const { scrollHeight, clientHeight, scrollTop } = target;

    if (scrollHeight - scrollTop === clientHeight) {
      setActiveBottom(false);
      return;
    }

    if (scrollTop === 0) {
      setActiveTop(false);
      return;
    }

    if (top && bottom) {
      return;
    }

    setActiveTop(true);
    setActiveBottom(true);
  };

  return (
    <div className="ScrollableWrapper">
      <div className="ScrollableWrapper--content" onScroll={handleScroll} ref={contentRef}>
        {topShadow && <div className={`ScrollableWrapper--shadow top ${top ? 'active' : ''}`} />}

        {children}

        {bottomShadow && <div className={`ScrollableWrapper--shadow bottom ${bottom ? 'active' : ''}`} />}
      </div>
    </div>
  );
};

export default ScrollableWrapper;
