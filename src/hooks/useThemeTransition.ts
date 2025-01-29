import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export interface ThemeTransitionOptions {
  topAligned?: boolean;
}

export interface ThemeTransitionContextType {
  targetRef: RefObject<HTMLDivElement>;
}

export function useThemeTransition(options: ThemeTransitionOptions = {}): ThemeTransitionContextType {
  const { topAligned = false } = options;
  const { setTheme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollPosition = useRef(0);
  const transitionThreshold = 100; // pixels to trigger theme change

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const checkScroll = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = topAligned ? viewportHeight * 0.3 : viewportHeight * 0.5;
      const currentScrollY = window.scrollY;
      
      // Only process if we've scrolled more than the threshold
      if (Math.abs(currentScrollY - lastScrollPosition.current) > transitionThreshold) {
        lastScrollPosition.current = currentScrollY;
        
        // Calculate how far we are from the trigger point
        const distanceFromTrigger = Math.abs(rect.top - triggerPoint);
        const transitionZone = viewportHeight * 0.2; // 20% of viewport height as transition zone
        
        if (distanceFromTrigger < transitionZone) {
          // We're in the transition zone
          if (rect.top < triggerPoint) {
            setTheme('dark');
          } else {
            setTheme('light');
          }
        }
      }
    };

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial position
    checkScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [setTheme, topAligned]);

  return { targetRef };
}
