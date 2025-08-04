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
  storageKey = 'theme', // Sync with ThemeToggle
  ...props 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize with saved theme immediately to prevent flash
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      return (savedTheme as Theme) || defaultTheme;
    }
    return defaultTheme;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'blue');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Set mounted immediately without delay
    setMounted(true);
    
    // Ensure theme is applied on mount
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'blue');
    root.classList.add(theme);
  }, [theme]);

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
