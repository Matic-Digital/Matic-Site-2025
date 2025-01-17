'use client';

import { useEffect } from 'react';

export function ScrollDetector() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.documentElement.classList.add('scroll-active');
      } else {
        document.documentElement.classList.remove('scroll-active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
