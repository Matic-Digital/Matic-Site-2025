'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemeProviderProps } from 'next-themes';

type Theme = 'dark' | 'light' | 'blue';

interface ThemeProviderProps extends Omit<NextThemeProviderProps, 'children'> {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  enableSystem = true,
  attribute = "class",
  storageKey = 'matic-ui-theme',
  ...props 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'blue');

    if (mounted) {
      root.classList.add(theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTimeout(() => {
        setTheme(savedTheme as Theme);
        setMounted(true);
      }, 300);
    } else {
      setMounted(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, theme);
    }
  }, [storageKey, theme, mounted]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme,
      }}
    >
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
