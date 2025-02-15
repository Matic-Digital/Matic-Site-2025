'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function PageThemeManager() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setTheme('light');
  }, [pathname, setTheme]);

  return null;
}
