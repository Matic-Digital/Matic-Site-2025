'use client';

import { useEffect, useState, useRef } from 'react';
import { Box } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface WorkOverlayProps {
  works: Work[];
}

export function WorkOverlayClient({ works }: WorkOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const targetIndexRef = useRef<number>(0);

  // Initialize viewport height after mount
  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (index: number) => {
    if (!viewportHeight) return; // Don't scroll if viewport height isn't initialized
    const workSection = document.getElementById('work-section');
    if (!workSection) return;

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    setIsScrolling(true);
    targetIndexRef.current = index;
    setActiveIndex(index);

    const totalHeight = (works.length * 0.6) * viewportHeight;
    const sectionHeight = totalHeight / works.length;
    const targetScroll = workSection.offsetTop + (index * sectionHeight);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    // Set a longer timeout to ensure the scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      setActiveIndex(targetIndexRef.current);
    }, 1000);
  };

  useEffect(() => {
    if (!viewportHeight) return; // Don't handle scroll if viewport height isn't initialized

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY;
      
      const workSection = document.getElementById('work-section');
      if (!workSection) return;
      
      const workSectionTop = workSection.offsetTop;
      const totalHeight = (works.length * 0.6) * viewportHeight;
      const scrollProgress = (scrollPosition - workSectionTop) / totalHeight;
      
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [works.length, isScrolling, viewportHeight]);

  // Don't render content until viewportHeight is initialized
  if (!viewportHeight) return null;

  return (
    <>
      {/* Container for scroll height - add extra height for last section */}
      <div className="relative" style={{ height: `${(works.length + 0.5) * 60}vh` }}>
        {/* Sticky container for content */}
        <div className="sticky top-0 left-0 w-full h-screen md:h-screen">
          {/* Background Sections */}
          <div className="absolute inset-0">
            {works.map((work, index) => (
              <div
                key={work.sys.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${work.featuredImage.url})` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
            ))}
          </div>

          {/* Overlay Content */}
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-full max-w-[95rem] px-6 md:px-12 lg:px-24">
              <Box direction="col" className="h-screen justify-between md:justify-center w-full relative">
                <Box direction="col" className="gap-2">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 pt-24">
                      <h1 className="font-chalet text-background text-3xl md:text-4xl lg:text-5xl">Recent work with</h1>
                      
                      {/* Work list - positioned differently on mobile vs desktop */}
                      <div className="md:static md:block hidden">
                        <Box direction="col" gap={2} className="items-start">
                          {works.map((work, index) => (
                            <h1
                              key={work.sys.id}
                              className={`
                                whitespace-nowrap 
                                transition-all 
                                duration-500
                                absolute
                                top-24
                                text-left
                                font-chalet
                                cursor-pointer
                                text-3xl md:text-4xl lg:text-5xl
                                ${index === activeIndex ? 'text-background' : ''}
                                ${index < activeIndex ? 'text-background/40' : ''}
                                ${index > activeIndex ? 'text-background/20' : ''}
                              `}
                              style={{
                                transform: `translateY(${(index - activeIndex) * 50}px)`,
                              }}
                              onClick={() => scrollToSection(index)}
                            >
                              {work.clientName}
                              {index === activeIndex && (
                                <span className="inline-block ml-2 md:ml-4 opacity-0 animate-fade-in">
                                  <ArrowRight className="w-[1.25em] h-[1.25em] -mb-2 md:-mb-4" />
                                </span>
                              )}
                            </h1>
                          ))}
                        </Box>
                      </div>
                    </div>
                  </div>
                </Box>
                
                {/* Mobile work list */}
                <Box direction="col" className="absolute bottom-24 md:hidden">
                  <Box direction="col" gap={2} className="items-start">
                    {works.map((work, index) => (
                      <h1
                        key={work.sys.id}
                        className={`
                          whitespace-nowrap 
                          transition-all 
                          duration-500
                          absolute
                          top-0
                          text-left
                          font-chalet
                          cursor-pointer
                          text-3xl md:text-4xl lg:text-5xl
                          ${index === activeIndex ? 'text-background' : ''}
                          ${index < activeIndex ? 'text-background/40' : ''}
                          ${index > activeIndex ? 'text-background/20' : ''}
                        `}
                        style={{
                          transform: `translateY(${(index - activeIndex) * 50}px)`,
                        }}
                        onClick={() => scrollToSection(index)}
                      >
                        {work.clientName}
                        {index === activeIndex && (
                          <span className="inline-block ml-2 md:ml-4 opacity-0 animate-fade-in">
                            <ArrowRight className="w-[1.25em] h-[1.25em] -mb-2 md:-mb-4" />
                          </span>
                        )}
                      </h1>
                    ))}
                  </Box>
                </Box>
                
                <Link href="/work" className='absolute bottom-16 right-6 md:right-0 md:bottom-24 md:left-0'>
                  <Button variant="secondary">See all work</Button>
                </Link>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
