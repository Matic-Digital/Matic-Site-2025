'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import cn from 'classnames';

interface ScrollThemeTransitionProps {
  children: React.ReactNode;
  topAligned?: boolean;
  className?: string;
  theme?: string;
}

export function ScrollThemeTransition({
  children,
  topAligned = false,
  className,
  theme = 'dark'
}: ScrollThemeTransitionProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const isAtTop = rect.top <= 0 && rect.bottom > 0;

    if (isAtTop) {
      setTheme(theme);
    } else if (rect.top > 0) {
      setTheme('light');
    }
  }, [setTheme, theme]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return;

    if (!topAligned) {
      if (entry.isIntersecting) {
        setTheme(theme);
      } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
        setTheme('light');
      }
    }
  }, [setTheme, theme, topAligned]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (topAligned) {
      // For top-aligned sections, use scroll event
      window.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll(); // Check initial position
      return () => window.removeEventListener('scroll', checkScroll);
    } else {
      // For center-aligned sections, use intersection observer
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: [0],
        rootMargin: '-50% 0px'
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [handleIntersection, checkScroll, topAligned]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      data-theme-section=""
    >
      {children}
    </div>
  );
}
