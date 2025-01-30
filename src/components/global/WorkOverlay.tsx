'use client';

import { useEffect, useState, useRef } from 'react';
import { type Work } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const gradientStyles = [
  `linear-gradient(165deg, 
    var(--background) 0%, 
    rgba(var(--background-rgb), 0.1) 20%,
    rgba(var(--background-rgb), 0) 35%,
    rgba(var(--background-rgb), 0) 65%,
    rgba(var(--background-rgb), 0.1) 80%,
    var(--background) 100%
  )`,
  `linear-gradient(195deg, 
    var(--background) 0%, 
    rgba(var(--background-rgb), 0.15) 25%,
    rgba(var(--background-rgb), 0) 40%,
    rgba(var(--background-rgb), 0) 60%,
    rgba(var(--background-rgb), 0.15) 75%,
    var(--background) 100%
  )`,
  `linear-gradient(180deg, 
    var(--background) 0%, 
    rgba(var(--background-rgb), 0.2) 30%,
    rgba(var(--background-rgb), 0) 45%,
    rgba(var(--background-rgb), 0) 55%,
    rgba(var(--background-rgb), 0.2) 70%,
    var(--background) 100%
  )`,
  `linear-gradient(150deg, 
    var(--background) 0%, 
    rgba(var(--background-rgb), 0.1) 15%,
    rgba(var(--background-rgb), 0) 30%,
    rgba(var(--background-rgb), 0) 70%,
    rgba(var(--background-rgb), 0.1) 85%,
    var(--background) 100%
  )`,
  `linear-gradient(210deg, 
    var(--background) 0%, 
    rgba(var(--background-rgb), 0.15) 35%,
    rgba(var(--background-rgb), 0) 50%,
    rgba(var(--background-rgb), 0) 50%,
    rgba(var(--background-rgb), 0.15) 65%,
    var(--background) 100%
  )`
];

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
        <div className="sticky top-0 left-0 w-full h-screen bg-background">
          {/* Background Sections */}
          <div className="absolute inset-0">
            {works.map((work, index) => (
              <div 
                key={work.sys.id}
                className={cn(
                  "absolute inset-0 transition-all duration-75",
                  index === activeIndex ? "opacity-100" : "opacity-0"
                )}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={work.featuredImage?.url ?? ''}
                    alt={work.clientName}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Background gradient */}
                <div 
                  className="absolute inset-0 transition-[background] duration-75"
                  style={{
                    background: gradientStyles[index % gradientStyles.length]
                  }}
                />
                
                {/* Overlay content */}
                <div className="absolute inset-0 bg-black flex items-center justify-center p-4 md:p-8">
                  <h1 className="text-foreground font-chalet">{work.clientName}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
