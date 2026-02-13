import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GTM_ID, trackPageView } from '../config/gtm';

/**
 * GoogleTagManager Component
 * 
 * This component tracks page views for React Router navigation.
 * It automatically sends page_view events to GTM dataLayer when routes change.
 * 
 * Make sure to update GTM_ID in src/config/gtm.js to match the ID in index.html
 */
function GoogleTagManager() {
  const location = useLocation();
  const lastPathRef = useRef('');

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    
    // Only track if the path has actually changed (prevents duplicates from StrictMode)
    if (currentPath !== lastPathRef.current) {
      lastPathRef.current = currentPath;
      trackPageView(currentPath);
    }
  }, [location]);

  // This component doesn't render anything
  return null;
}

export default GoogleTagManager;
