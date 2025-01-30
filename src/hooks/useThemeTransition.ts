'use client';

import { useEffect, useState } from 'react';

interface UseThemeTransitionOptions {
  threshold?: number;
  offset?: number;
}

export function useThemeTransition(
  ref: React.RefObject<HTMLElement>,
  options: UseThemeTransitionOptions = {}
) {
  const [shouldTransition, setShouldTransition] = useState(false);
  const { threshold = 0.5, offset = 0 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldTransition(entry?.isIntersecting ?? false);
      },
      {
        threshold,
        rootMargin: `${offset}px`
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold, offset]);

  return shouldTransition;
}
