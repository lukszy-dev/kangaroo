import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './ScrollableWrapper.scss';

const ScrollableWrapper = ({ children, topShadow = true, bottomShadow = true, alwaysOn = false }) => {
  const [top, setActiveTop] = useState(alwaysOn);
  const [bottom, setActiveBottom] = useState(alwaysOn);

  const contentRef = useRef(null);

  useEffect(() => {
    if (bottomShadow) {
      const { current: { scrollHeight, clientHeight } } = contentRef;

      if (scrollHeight > clientHeight) {
        setActiveBottom(true);
      }
    }
  }, [bottomShadow]);

  const handleScroll = ({ target }) => {
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
        { topShadow && <div className={`ScrollableWrapper--shadow top ${top ? 'active': ''}`} /> }

        { children }

        { bottomShadow && <div className={`ScrollableWrapper--shadow bottom ${bottom ? 'active': ''}`} /> }
      </div>
    </div>
  );
};

ScrollableWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  topShadow: PropTypes.bool,
  bottomShadow: PropTypes.bool,
  alwaysOn: PropTypes.bool
};

export default ScrollableWrapper;