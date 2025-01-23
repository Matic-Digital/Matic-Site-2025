'use client';

import { useEffect, useState } from 'react';

export function ScrollFadeText({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  );
}
