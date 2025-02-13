'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function PageThemeManager() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let the page render and check for ScrollThemeTransition
    const timeout = setTimeout(() => {
      const hasScrollTheme = document.querySelector('[data-scroll-theme]');
      if (!hasScrollTheme) {
        setTheme('light');
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname, setTheme]);

  return null;
}
