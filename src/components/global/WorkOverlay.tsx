'use client';

import { useEffect, useState, useRef } from 'react';
import { Section } from '@/components/global/matic-ds';
import { type Work } from '@/types';

interface WorkOverlayProps {
  works: Work[];
}

export function WorkOverlay({ works }: WorkOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetIndexRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Get the work section element
      const workSection = document.getElementById('work-section');
      if (!workSection) return;
      
      // Get the position of the work section
      const workSectionTop = workSection.offsetTop;
      
      // Calculate the total scrollable area and section height
      // Add an extra viewport height to ensure the last section has full scroll space
      const totalHeight = (works.length * 0.6) * viewportHeight;
      const scrollProgress = (scrollPosition - workSectionTop) / totalHeight;
      
      // Calculate the active index based on scroll progress
      const newIndex = Math.min(
        Math.floor(scrollProgress * works.length),
        works.length - 1
      );
      
      if (newIndex !== targetIndexRef.current) {
        targetIndexRef.current = newIndex;
        setActiveIndex(Math.max(0, newIndex));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [works.length]);

  return (
    <>
      {/* Container for scroll height - add extra height for last section */}
      <div className="relative" style={{ height: `${(works.length * 0.6) * 100}vh` }}>
        {/* Sticky container for content */}
        <div className="sticky top-0 left-0 w-full h-screen bg-black">
          {/* Background Sections */}
          <div className="absolute inset-0">
            {works.map((work, index) => (
              <div
                key={work.sys.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === activeIndex ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {/* Overlay content */}
                <div className="absolute inset-0 bg-black flex items-center justify-center p-4 md:p-8">
                  <h2 className="text-white font-chalet text-3xl md:text-4xl lg:text-5xl">{work.clientName}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
