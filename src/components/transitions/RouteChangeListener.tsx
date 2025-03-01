'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Global state for route changes
let isChangingRoute = false;
let listeners: ((changing: boolean) => void)[] = [];

export function addRouteChangeListener(callback: (changing: boolean) => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
}

export function isRouteChanging() {
  return isChangingRoute;
}

export function RouteChangeListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    isChangingRoute = true;
    listeners.forEach(l => l(true));

    const timer = setTimeout(() => {
      isChangingRoute = false;
      listeners.forEach(l => l(false));
    }, 300); // Match transition duration

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
