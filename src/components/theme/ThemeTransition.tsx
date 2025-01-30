'use client';

import { useEffect } from 'react';

export function ThemeTransition() {
  useEffect(() => {
    // Add transition class to html element
    document.documentElement.classList.add('theme-transition');

    // Remove the transition class after the transition is complete
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
