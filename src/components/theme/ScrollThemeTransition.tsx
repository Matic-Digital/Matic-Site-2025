'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import styles from './ScrollThemeTransition.module.css';

export type ThemeVariant = 'light' | 'soft' | 'medium' | 'dark';

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
    // Set initial theme when mounted
    if (theme) {
      document.documentElement.classList.forEach(className => {
        if (['light', 'soft', 'medium', 'dark'].includes(className)) {
          document.documentElement.classList.remove(className);
        }
      });
      document.documentElement.classList.add(theme);
      lastActiveTheme.current = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const findActiveTheme = (): ThemeVariant => {
      if (!ref.current) return 'light';
      
      const allThemeComponents = Array.from(document.querySelectorAll('[data-scroll-theme]'));
      
      // Get all visible sections
      const sections = allThemeComponents
        .map(comp => ({
          element: comp as HTMLElement,
          rect: (comp as HTMLElement).getBoundingClientRect(),
          theme: (comp as HTMLElement).getAttribute('data-scroll-theme') as ThemeVariant,
          topAligned: (comp as HTMLElement).hasAttribute('data-top-aligned')
        }))
        .filter(section => {
          if (section.topAligned) {
            // For top-aligned sections, consider them visible in two cases:
            // 1. When they touch the top of the viewport (for activation)
            // 2. When they're in view but not past the viewport (to prevent them from taking over when scrolled past)
            return section.rect.top <= 0 && section.rect.bottom > 0;
          }
          
          // For regular sections, use the visibility threshold
          const visibleThreshold = 0.3; // 30% visibility threshold
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.min(section.rect.bottom, viewportHeight) - Math.max(section.rect.top, 0);
          return visibleHeight > viewportHeight * visibleThreshold;
        });

      if (sections.length === 0) {
        return lastActiveTheme.current;
      }

      // For top-aligned sections, prioritize them only when they're exactly at the top
      const topAlignedSection = sections.find(s => s.topAligned && s.rect.top <= 0 && s.rect.top > -50);
      if (topAlignedSection) {
        lastActiveTheme.current = topAlignedSection.theme;
        return topAlignedSection.theme;
      }

      // If no top-aligned sections at the top, use the most visible section
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
      
      // Apply the new theme class smoothly
      document.documentElement.classList.forEach(className => {
        if (['light', 'soft', 'medium', 'dark'].includes(className) && className !== activeTheme) {
          document.documentElement.classList.remove(className);
        }
      });
      
      // Add the new theme class if it's not already present
      if (!document.documentElement.classList.contains(activeTheme)) {
        document.documentElement.classList.add(activeTheme);
      }
      
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
      data-scroll-theme={theme}
      className={cn('relative', styles.themeTransition, className)}
      {...(topAligned && { 'data-top-aligned': true })}
    >
      {children}
    </div>
  );
}
