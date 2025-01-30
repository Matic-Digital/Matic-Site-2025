'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ScrollThemeTransitionProps {
  children: React.ReactNode;
  className?: string;
  theme?: string;
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
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (newTheme: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      document.documentElement.classList.add('theme-transition');
      setTheme(newTheme);
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
        isTransitioning.current = false;
      }, 600);
    };

    const checkPreviousSections = () => {
      if (!ref.current) return false;
      const currentRect = ref.current.getBoundingClientRect();
      const previousElement = ref.current.previousElementSibling;
      
      if (previousElement) {
        const previousRect = previousElement.getBoundingClientRect();
        return previousRect.bottom > 0;
      }
      return false;
    };

    const handleScroll = () => {
      if (!ref.current || isTransitioning.current) return;

      const rect = ref.current.getBoundingClientRect();
      const previousSectionVisible = checkPreviousSections();

      if (previousSectionVisible) {
        applyTheme('light');
        return;
      }

      if (topAligned) {
        if (rect.top <= 0 && rect.top >= -10) {
          applyTheme(theme);
        } else if (rect.top > 0) {
          applyTheme('light');
        }
      } else {
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          applyTheme(theme);
        } else {
          applyTheme('light');
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, theme, topAligned, setTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {topAligned && (
        <div 
          ref={sentinelRef}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            pointerEvents: 'none',
            visibility: 'hidden'
          }} 
        />
      )}
      <div
        ref={ref}
        className={cn('relative', className)}
        data-scroll-theme={theme}
      >
        {children}
      </div>
    </>
  );
}
