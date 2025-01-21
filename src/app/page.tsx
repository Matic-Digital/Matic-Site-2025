'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/global/matic-ds';
import { HeroGradient } from '@/components/global/HeroGradient';
import { WhatWeDo } from '@/components/global/WhatWeDo';
import { WorkOverlay } from '@/components/global/WorkOverlay';

/**
 * Landing page
 */
const workSections = [
  'Work 1',
  'Work 2',
  'Work 3',
  'Work 4',
  'Work 5'
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Get the work section element
      const workSection = document.getElementById('work-section');
      if (!workSection) return;
      
      // Get the position of the work section
      const workSectionTop = workSection.offsetTop;
      
      // Only update active index if we've scrolled past the work section start
      if (scrollPosition >= workSectionTop) {
        const scrolledPastTop = scrollPosition - workSectionTop;
        const newIndex = Math.min(
          Math.floor(scrolledPastTop / viewportHeight),
          workSections.length - 1
        );
        setActiveIndex(Math.max(0, newIndex));
      } else {
        setActiveIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Section className="relative !p-0">
        <HeroGradient text="Change happens here." />
      </Section>
      <WhatWeDo />
      <div id="work-section" className="relative">
        {/* Container for scroll height - add extra viewport height for last section */}
        <div style={{ height: `${(workSections.length + 1) * 100}vh` }}>
          {/* Sticky container for content */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
            {/* Background Sections */}
            {workSections.map((section, index) => (
              <div 
                key={section}
                className={`
                  absolute inset-0 w-full h-full 
                  transition-opacity duration-500
                  ${index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  bg-gradient-to-br from-purple-600/80 to-blue-500/80
                `}
                style={{
                  filter: `hue-rotate(${index * 30}deg) brightness(${1 + index * 0.1})`
                }}
              />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 z-10">
              <WorkOverlay sections={workSections} activeSection={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
