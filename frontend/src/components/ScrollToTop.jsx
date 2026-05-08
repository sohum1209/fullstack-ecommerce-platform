import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo(0, 0);
  }, [location]); // Depend on the location to trigger when the route changes

  return null;
};

export default ScrollToTop;
