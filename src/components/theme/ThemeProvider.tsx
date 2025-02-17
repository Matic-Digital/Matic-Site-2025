'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemeProviderProps } from 'next-themes';

interface ThemeProviderProps extends Omit<NextThemeProviderProps, 'children'> {
  children: React.ReactNode;
}

export function ThemeProvider({ 
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "class",
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
