'use client';

import { useEffect, useState } from 'react';

type ThemeBreakpoint = {
  percentage: number;
  theme: string;  
};

type ScrollProgressProps = {
  breakpoints: ThemeBreakpoint[];
  mobileBreakpoints?: ThemeBreakpoint[];
  showPercentage?: boolean;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

const defaultBreakpoints: ThemeBreakpoint[] = [
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
  const [currentTheme, setCurrentTheme] = useState(breakpoints[0]?.theme);
  const [nextTheme, setNextTheme] = useState(breakpoints[1]?.theme);
  
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
        : currentBreakpointIndex - 1;
      
      const currentBreakpoint = activeBreakpoints[activeIndex];
      const nextBreakpoint = activeBreakpoints[activeIndex + 1];

      if (!currentBreakpoint) return;

      const activeTheme = currentBreakpoint.theme;
      let progress = 0;

      // Calculate transition progress if there's a next breakpoint
      if (nextBreakpoint) {
        const range = nextBreakpoint.percentage - currentBreakpoint.percentage;
        progress = Math.min(1, Math.max(0, (currentPercentage - currentBreakpoint.percentage) / range));
      }

      // Update theme classes
      const root = document.documentElement;
      
      // Remove all existing theme classes except dark (for backwards compatibility)
      root.classList.forEach(className => {
        if (className !== 'dark') root.classList.remove(className);
      });
      
      // Add current theme class and update dark mode
      root.classList.add(activeTheme);
      root.classList.toggle('dark', activeTheme === 'dark');

      // Set transition progress
      root.style.setProperty('--theme-transition-progress', `${progress}`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset to initial theme
      const root = document.documentElement;
      const initialTheme = activeBreakpoints[0]?.theme;
      if (initialTheme) {
        root.classList.forEach(className => {
          if (className !== 'dark') root.classList.remove(className);
        });
        root.classList.add(initialTheme);
        root.style.setProperty('--theme-transition-progress', '0');
      }
    };
  }, [breakpoints, mobileBreakpoints, isMobile]); // Re-run effect when breakpoints or mobile state changes

  if (!showPercentage) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-text text-background font-mono text-sm transition-colors duration-200">
      {scrollPercentage.toFixed(2)}%
    </div>
  );
}
