'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ThemeInitializerProps {
  defaultTheme: string;
}

export function ThemeInitializer({ defaultTheme }: ThemeInitializerProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme, setTheme]);

  return null;
}
