'use client';

import { useEffect } from 'react';
import { initializeThemeTransitions } from '@/lib/theme-transition';

export function ThemeTransitionManager() {
  useEffect(() => {
    initializeThemeTransitions();
  }, []);

  return null;
}
