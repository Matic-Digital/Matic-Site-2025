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
  const [isMobile, setIsMobile] = useState(false);
  
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
      const currentPercentage = (scrollTop / scrollableHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, currentPercentage)));
      
      // Find current breakpoint based on scroll percentage
      const currentBreakpointIndex = activeBreakpoints.findIndex(
        (bp) => currentPercentage < bp.percentage
      );

      // Get current and next breakpoints
      const activeIndex = currentBreakpointIndex === -1 
        ? activeBreakpoints.length - 1 
        : Math.max(0, currentBreakpointIndex - 1);
      
      const currentBreakpoint = activeBreakpoints[activeIndex];
      const nextBreakpoint = activeBreakpoints[activeIndex + 1];

      if (!currentBreakpoint) return;

      // Update theme classes
      const root = document.documentElement;
      root.classList.forEach(className => {
        if (className === 'dark' || className === 'blue') root.classList.remove(className);
      });
      
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

    handleScroll(); // Initial scroll check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [breakpoints, mobileBreakpoints, isMobile]);

  if (!showPercentage) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex h-10 w-12 items-center justify-center rounded-full bg-text text-background font-mono text-sm transition-colors duration-200 overflow-hidden">
      {scrollPercentage.toFixed(2)}%
    </div>
  );
}
