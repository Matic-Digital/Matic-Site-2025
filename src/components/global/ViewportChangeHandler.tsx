'use client';

import { useEffect, useState } from 'react';

/**
 * Component that monitors viewport changes and refreshes the page
 * when switching between mobile and desktop views to prevent layout issues
 */
export function ViewportChangeHandler() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Function to check if viewport is mobile
    const checkIfMobile = () => {
      const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
      return mobileMediaQuery.matches;
    };
    
    // Set initial state
    setIsMobile(checkIfMobile());
    
    // Handler for viewport changes
    const handleResize = () => {
      const currentIsMobile = checkIfMobile();
      
      // If we're switching between mobile and desktop, refresh the page
      if (isMobile !== null && currentIsMobile !== isMobile) {
        console.log(`Viewport changed from ${isMobile ? 'mobile' : 'desktop'} to ${currentIsMobile ? 'mobile' : 'desktop'}, refreshing page...`);
        window.location.reload();
      }
    };
    
    // Add event listener with debounce to avoid multiple refreshes
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]);
  
  // This component doesn't render anything
  return null;
}
