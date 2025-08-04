'use client';

import { useEffect, useState } from 'react';

type ThemeBreakpoint = {
  percentage: number;
  theme: 'light' | 'dark' | 'blue';  
};

type ScrollProgressProps = {
  breakpoints: readonly ThemeBreakpoint[];
  mobileBreakpoints?: readonly ThemeBreakpoint[];
  showPercentage?: boolean;
};

const defaultBreakpoints: readonly ThemeBreakpoint[] = [
  {
    percentage: 0,
    theme: 'light'
  },
  {
    percentage: 20,
    theme: 'dark'
  }
];

export function ScrollProgress({
  breakpoints = defaultBreakpoints,
  mobileBreakpoints,
  showPercentage = true
}: ScrollProgressProps) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize mobile state correctly on first render
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Apply initial theme immediately during component initialization
  useState(() => {
    if (typeof window !== 'undefined') {
      const initialIsMobile = window.innerWidth < 768;
      const activeBreakpoints = initialIsMobile && mobileBreakpoints ? mobileBreakpoints : breakpoints;
      
      // Find the correct initial theme based on current scroll position
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const currentPercentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      
      // Sort breakpoints and find the active one
      const sortedBreakpoints = [...activeBreakpoints].sort((a, b) => a.percentage - b.percentage);
      let activeBreakpoint = sortedBreakpoints[0]; // Default to first breakpoint
      
      for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
        if (currentPercentage >= sortedBreakpoints[i]!.percentage) {
          activeBreakpoint = sortedBreakpoints[i];
          break;
        }
      }
      
      if (activeBreakpoint) {
        const root = document.documentElement;
        // Remove ALL existing theme classes
        root.classList.remove('dark', 'light', 'blue');
        // Add the correct initial theme based on scroll position
        root.classList.add(activeBreakpoint.theme);
        root.style.setProperty('--theme-transition-progress', '0');
      }
    }
    return null;
  });
  
  // Update mobile state on window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Using Tailwind's md breakpoint
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Sort breakpoints by percentage to ensure proper interpolation
    const activeBreakpoints = [...(isMobile && mobileBreakpoints ? mobileBreakpoints : breakpoints)]
      .sort((a, b) => a.percentage - b.percentage);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollableHeight = documentHeight - windowHeight;
      const currentPercentage = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, currentPercentage)));
      
      // Find current breakpoint based on scroll percentage
      // We want the breakpoint that is <= currentPercentage
      let activeIndex = 0;
      for (let i = activeBreakpoints.length - 1; i >= 0; i--) {
        if (currentPercentage >= activeBreakpoints[i]!.percentage) {
          activeIndex = i;
          break;
        }
      }
      
      const currentBreakpoint = activeBreakpoints[activeIndex];
      const nextBreakpoint = activeBreakpoints[activeIndex + 1];

      // Safety check - should not happen with proper breakpoints
      if (!currentBreakpoint) return;

      // Update theme classes
      const root = document.documentElement;
      // Remove all theme classes efficiently
      root.classList.remove('dark', 'light', 'blue');
      // Add the current theme
      root.classList.add(currentBreakpoint.theme);

      // Calculate and set transition progress
      if (nextBreakpoint) {
        const range = nextBreakpoint.percentage - currentBreakpoint.percentage;
        const progress = Math.min(1, Math.max(0, (currentPercentage - currentBreakpoint.percentage) / range));
        root.style.setProperty('--theme-transition-progress', progress.toString());
      } else {
        root.style.setProperty('--theme-transition-progress', '1');
      }
    };

    // Initial scroll check with slight delay to ensure proper theme application
    const initialScrollCheck = () => {
      requestAnimationFrame(() => {
        handleScroll();
      });
    };
    
    initialScrollCheck();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [breakpoints, mobileBreakpoints, isMobile]);

  if (!showPercentage) return null;

  return (
    <div className="hidden fixed top-24 right-4 z-50 h-10 w-12 items-center justify-center rounded-full bg-text text-background font-mono text-sm transition-colors duration-200 overflow-hidden">
      {scrollPercentage.toFixed(2)}%
    </div>
  );
}
