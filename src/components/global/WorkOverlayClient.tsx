'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WorkOverlayProps {
  works: Work[];
}

export function WorkOverlayClient({ works }: WorkOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const targetIndexRef = useRef<number>(0);

  const scrollToSection = (index: number) => {
    const workSection = document.getElementById('work-section');
    if (!workSection) return;

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    setIsScrolling(true);
    targetIndexRef.current = index;
    setActiveIndex(index);

    const viewportHeight = window.innerHeight;
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
    const handleScroll = () => {
      if (isScrolling) return;

      const viewportHeight = window.innerHeight;
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
  }, [works.length, isScrolling]);

  return (
    <>
      {/* Container for scroll height - add extra height for last section */}
      <div className="relative" style={{ height: `${(works.length + 0.5) * 100}vh` }}>
        {/* Sticky container for content */}
        <div className="sticky top-0 left-0 w-full h-screen">
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
          <Container>
            <Box direction="col" className="h-screen justify-center w-full">
              <Box direction="col" className="gap-2 pl-4 md:pl-20">
                <div className="relative h-8">
                  <div className="absolute -left-0 flex items-center gap-2 md:gap-4">
                    <h1 className="font-chalet text-white text-3xl md:text-4xl lg:text-5xl">Recent work with</h1>
                    <Box direction="col" gap={2} className="items-start">
                      {works.map((work, index) => (
                        <h1
                          key={work.sys.id}
                          className={`
                            whitespace-nowrap 
                            transition-all 
                            duration-500
                            absolute
                            text-left
                            font-chalet
                            cursor-pointer
                            text-3xl md:text-4xl lg:text-5xl
                            ${index === activeIndex ? 'text-white' : ''}
                            ${index < activeIndex ? 'text-white/40' : ''}
                            ${index > activeIndex ? 'text-white/20' : ''}
                          `}
                          style={{
                            transform: `translateY(${(index - activeIndex) * 50}px)`,
                          }}
                          onClick={() => scrollToSection(index)}
                        >
                          {work.clientName}
                          {index === activeIndex && (
                            <span className="inline-block ml-3 md:ml-4 opacity-0 animate-fade-in">
                              <ArrowRight className="w-[1.25em] h-[1.25em]" />
                            </span>
                          )}
                        </h1>
                      ))}
                    </Box>
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
}
