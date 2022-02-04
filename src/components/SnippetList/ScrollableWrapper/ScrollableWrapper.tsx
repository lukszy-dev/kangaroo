import { useState, useEffect, useRef } from 'react';

import styles from './ScrollableWrapper.module.scss';

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
}) => {
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
    <div className={styles.root}>
      <div className={styles.content} onScroll={handleScroll} ref={contentRef}>
        {topShadow && <div className={`${styles.shadow} top ${top ? 'active' : ''}`} />}

        {children}

        {bottomShadow && <div className={`${styles.shadow} bottom ${bottom ? 'active' : ''}`} />}
      </div>
    </div>
  );
};

export default ScrollableWrapper;
