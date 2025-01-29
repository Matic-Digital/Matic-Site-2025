'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ThemeInitializerProps {
  defaultTheme: 'light' | 'dark';
}

export function ThemeInitializer({ defaultTheme }: ThemeInitializerProps) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Only set the theme if it hasn't been set before
    if (!theme) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, setTheme, theme]);

  return null;
}
