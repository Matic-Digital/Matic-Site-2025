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
      
      // If we're at the very top of the page, use light theme
      if (window.scrollY === 0) {
        lastActiveTheme.current = 'light';
        return 'light';
      }

      // Get all visible sections
      const sections = allThemeComponents
        .map(comp => ({
          element: comp as HTMLElement,
          rect: (comp as HTMLElement).getBoundingClientRect(),
          theme: (comp as HTMLElement).getAttribute('data-scroll-theme') as ThemeVariant
        }))
        .filter(section => section.rect.bottom > 0 && section.rect.top < window.innerHeight);

      if (sections.length === 0) {
        lastActiveTheme.current = 'light';
        return 'light';
      }

      // When scrolling up and coming from light theme, prevent soft theme
      if (scrollingUp && lastActiveTheme.current === 'light') {
        const lightSection = sections.find(section => section.theme === 'light');
        if (lightSection && lightSection.rect.bottom > window.innerHeight * 0.3) {
          lastActiveTheme.current = 'light';
          return 'light';
        }

        const darkSection = sections.find(section => section.theme === 'dark');
        if (darkSection && darkSection.rect.top <= 0) {
          lastActiveTheme.current = 'dark';
          return 'dark';
        }

        // Keep light theme if no other theme should be active
        return 'light';
      }

      // Normal theme selection
      const visibleAtTop = sections.find(section => section.rect.top <= 0);
      if (visibleAtTop) {
        lastActiveTheme.current = visibleAtTop.theme;
        return visibleAtTop.theme;
      }

      // If no section is at the top, use the highest visible section
      const highestSection = sections.reduce((prev, curr) => 
        prev.rect.top < curr.rect.top ? prev : curr
      );

      lastActiveTheme.current = highestSection.theme;
      return highestSection.theme;
    };

    const handleScroll = () => {
      if (!ref.current) return;
      
      // Add transition class to root element when scrolling
      document.documentElement.classList.add('theme-transition');
      
      const activeTheme = findActiveTheme();
      
      // Remove all theme classes first
      document.documentElement.classList.remove('light', 'soft', 'medium', 'dark');
      // Add the new theme class
      document.documentElement.classList.add(activeTheme);
      
      setLastScrollY(window.scrollY);
      
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
  }, [mounted, setTheme, lastScrollY]);

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
