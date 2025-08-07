'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function DefaultLightTheme() {
  const { setTheme } = useTheme();
  const lastTheme = useRef<string>('light');

  useEffect(() => {
    const checkScroll = () => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.7;

      // Get all elements that intersect with the trigger line
      const elements = document.elementsFromPoint(window.innerWidth / 2, triggerPoint);

      // Check if any of the intersecting elements are theme sections
      const hasThemeSection = elements.some((el) => el.closest('[data-theme-section]') !== null);

      // Set theme based on whether a theme section is at the trigger point
      const newTheme = hasThemeSection ? 'dark' : 'light';
      if (lastTheme.current !== newTheme) {
        lastTheme.current = newTheme;
        setTheme(newTheme);
      }
    };

    // Check initial position
    checkScroll();

    // Add scroll listener
    window.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [setTheme]);

  return null;
}
