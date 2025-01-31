'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type ThemeVariant = 'light' | 'soft' | 'medium' | 'dark';

interface ScrollThemeTransitionProps {
  children: React.ReactNode;
  className?: string;
  theme?: ThemeVariant;
  topAligned?: boolean;
}

export function ScrollThemeTransition({
  children,
  className,
  theme = 'dark',
  topAligned = false
}: ScrollThemeTransitionProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const findActiveTheme = (): ThemeVariant => {
      if (!ref.current) return 'light';
      
      const allThemeComponents = Array.from(document.querySelectorAll('[data-scroll-theme]'));
      const currentIndex = allThemeComponents.indexOf(ref.current);
      
      // First check if we're inside the current component
      const currentRect = ref.current.getBoundingClientRect();
      
      // If we're scrolled into the component, use its theme
      if (currentRect.top <= 1 && currentRect.bottom > 0) {
        return theme;
      }
      
      // Then check all previous components
      for (let i = currentIndex - 1; i >= 0; i--) {
        const component = allThemeComponents[i] as HTMLElement;
        if (!component) continue;
        
        const rect = component.getBoundingClientRect();
        if (rect.top <= 1 && rect.bottom > 0) {
          return (component.getAttribute('data-scroll-theme') ?? 'light') as ThemeVariant;
        }
      }
      
      return 'light';
    };

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      
      // Add transition class to root element when scrolling
      document.documentElement.classList.add('theme-transition');
      
      if (topAligned) {
        // Always determine the active theme based on component positions
        const activeTheme = findActiveTheme();
        setTheme(activeTheme);
      } else {
        // Default behavior - change theme when component is in view
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setTheme(isVisible ? theme : 'light');
      }
      
      // Remove transition class after animation is complete
      const timeout = setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 600); // Match the transition duration in globals.css
      
      return () => clearTimeout(timeout);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, theme, topAligned, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      data-scroll-theme={theme}
      data-no-transition
    >
      {children}
    </div>
  );
}
