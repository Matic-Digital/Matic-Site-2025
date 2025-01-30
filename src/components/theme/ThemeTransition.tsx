'use client';

import { useEffect } from 'react';

export function ThemeTransition() {
  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none');
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    });
  }, []);

  return null;
}
