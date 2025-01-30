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
  const { setTheme, theme: currentTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const handleThemeChange = useCallback((newTheme: string) => {
    if (newTheme === currentTheme) return;
    
    // Add transition class to html element
    document.documentElement.classList.add('theme-transition');
    setTheme(newTheme);

    // Remove the transition class after the transition is complete
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentTheme, setTheme]);

  const checkScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const isAtTop = rect.top <= 0 && rect.bottom > 0;

    if (isAtTop) {
      handleThemeChange(theme);
    } else if (rect.top > 0) {
      handleThemeChange('light');
    }
  }, [handleThemeChange, theme]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return;

    if (!topAligned) {
      if (entry.isIntersecting) {
        handleThemeChange(theme);
      } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
        handleThemeChange('light');
      }
    }
  }, [handleThemeChange, theme, topAligned]);

  useEffect(() => {
    setMounted(true);

    // Add the base transition styles to the document
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        transition: none;
      }
      :root.theme-transition,
      :root.theme-transition * {
        transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke !important;
        transition-duration: 0.3s !important;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
        will-change: color, background-color;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (topAligned) {
      window.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => window.removeEventListener('scroll', checkScroll);
    } else {
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
