'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function TopPageTheme() {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    const checkScroll = () => {
      // If we're near the top of the page (within first 100px), set to light theme
      if (window.scrollY < 100) {
        setTheme('light');
      }
    };

    // Check initial position
    checkScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [setTheme]);

  return null;
}
