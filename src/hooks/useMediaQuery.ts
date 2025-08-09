'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design using media queries
 * @param query CSS media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null and update after mount to avoid hydration mismatch
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true to indicate client-side rendering
    setMounted(true);

    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Update state with initial value
    setMatches(mediaQuery.matches);

    // Define callback function for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Clean up event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  // Return false during SSR to avoid hydration mismatch
  return mounted ? matches : false;
}
