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
  const [lastScrollY, setLastScrollY] = useState(0);
  const { setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const lastActiveTheme = useRef<ThemeVariant>('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const findActiveTheme = (): ThemeVariant => {
      if (!ref.current) return 'light';
      
      const allThemeComponents = Array.from(document.querySelectorAll('[data-scroll-theme]'));
      const scrollingUp = window.scrollY < lastScrollY;
      
      // Get all visible sections
      const sections = allThemeComponents
        .map(comp => ({
          element: comp as HTMLElement,
          rect: (comp as HTMLElement).getBoundingClientRect(),
          theme: (comp as HTMLElement).getAttribute('data-scroll-theme') as ThemeVariant
        }))
        .filter(section => {
          // Consider a section visible if it occupies a significant portion of the viewport
          const visibleThreshold = 0.3; // 30% visibility threshold
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.min(section.rect.bottom, viewportHeight) - Math.max(section.rect.top, 0);
          return visibleHeight > viewportHeight * visibleThreshold;
        });

      if (sections.length === 0) {
        return lastActiveTheme.current;
      }

      // Use the theme of the most visible section
      const mostVisibleSection = sections.reduce((prev, curr) => {
        const prevVisibleHeight = Math.min(prev.rect.bottom, window.innerHeight) - Math.max(prev.rect.top, 0);
        const currVisibleHeight = Math.min(curr.rect.bottom, window.innerHeight) - Math.max(curr.rect.top, 0);
        return currVisibleHeight > prevVisibleHeight ? curr : prev;
      });

      lastActiveTheme.current = mostVisibleSection.theme;
      return mostVisibleSection.theme;
    };

    const handleScroll = () => {
      if (!ref.current) return;
      
      const activeTheme = findActiveTheme();
      
      // Remove all theme classes first
      document.documentElement.classList.remove('light', 'soft', 'medium', 'dark');
      // Add the new theme class
      document.documentElement.classList.add(activeTheme);
      
      setLastScrollY(window.scrollY);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, setTheme, lastScrollY, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      data-scroll-theme={theme}
      data-no-transition
      {...(topAligned && { 'data-top-aligned': true })}
    >
      {children}
    </div>
  );
}
