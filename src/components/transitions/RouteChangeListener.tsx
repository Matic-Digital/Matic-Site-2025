'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Global state for route changes
let isChangingRoute = false;
let listeners: ((changing: boolean, progress: number) => void)[] = [];

/**
 * Add a listener for route change events
 * @param callback Function to call when route changes
 * @returns Function to remove the listener
 */
export function addRouteChangeListener(callback: (changing: boolean, progress: number) => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

/**
 * Check if a route change is in progress
 * @returns Boolean indicating if a route change is happening
 */
export function isRouteChanging() {
  return isChangingRoute;
}

/**
 * Component that listens for route changes and notifies listeners
 * This can be used to trigger animations, loading indicators, etc.
 */
export function RouteChangeListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const progressRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start a route change
    isChangingRoute = true;
    progressRef.current = 0;
    
    // Notify listeners immediately with 0% progress
    listeners.forEach(l => l(true, 0));
    
    // Simulate progress over time for better UX
    const updateProgress = () => {
      progressRef.current += 5;
      if (progressRef.current < 100) {
        listeners.forEach(l => l(true, progressRef.current));
        timerRef.current = setTimeout(updateProgress, 10);
      } else {
        // Complete the transition
        isChangingRoute = false;
        listeners.forEach(l => l(false, 100));
      }
    };
    
    // Start progress updates
    timerRef.current = setTimeout(updateProgress, 10);
    
    // Set a maximum timeout to prevent waiting too long
    const maxTimeout = setTimeout(() => {
      if (isChangingRoute) {
        isChangingRoute = false;
        listeners.forEach(l => l(false, 100));
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    }, 300); // Match transition duration

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(maxTimeout);
    };
  }, [pathname, searchParams]);

  return null;
}
