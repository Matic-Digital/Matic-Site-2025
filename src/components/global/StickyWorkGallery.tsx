'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Work } from '@/types';

interface StickyWorkGalleryProps {
  works: Work[];
}

export function StickyWorkGallery({ works }: StickyWorkGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const newIndex = Math.floor(scrollY / viewportHeight);
      setActiveIndex(Math.min(newIndex, works.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [works.length]);

  return (
    <div className="min-h-screen">
      {works.map((work, index) => (
        <div
          key={work.sys.id}
          style={{
            zIndex: 5 - index,
          }}
          className={`relative h-screen w-full ${index <= activeIndex ? 'sticky top-0' : ''}`}
        >
          <Image
            src={work.featuredImage.url}
            alt={work.clientName}
            fill
            className="object-cover border-none rounded-none"
            style={{ position: 'absolute' }}
          />
        </div>
      ))}
    </div>
  );
}