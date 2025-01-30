'use client';

import { useState, useEffect, useRef } from 'react';
import { type Work } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkSectionProps {
  works: Work[];
}

export function WorkSection({ works }: WorkSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeWork = works[activeIndex];
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);
  const router = useRouter();

  const handleTitleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent title click
    if (activeWork?.slug) {
      router.push(`/work/${activeWork?.slug}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const parentTop = sectionRef.current.parentElement?.getBoundingClientRect().top ?? 0;
      const parentBottom = sectionRef.current.parentElement?.getBoundingClientRect().bottom ?? 0;
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY.current;
      
      // Check if we're in the sticky section and haven't scrolled past it
      if (parentTop < 0 && parentBottom > window.innerHeight) {
        // Accumulate scroll distance
        scrollAccumulator.current += Math.abs(scrollDelta);
        
        // Check if we've scrolled enough to trigger transition
        if (scrollAccumulator.current >= 500) {
          if (scrollDelta > 0 && activeIndex < works.length - 1) {
            setActiveIndex(prev => prev + 1);
          } else if (scrollDelta < 0 && activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
          }
          // Reset accumulator after transition
          scrollAccumulator.current = 0;
        }
      } else {
        // Reset accumulator when not in sticky section
        scrollAccumulator.current = 0;
      }
      
      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [works.length, activeIndex]);
  
  if (!activeWork) return null;

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative w-full bg-background dark:bg-background",
        "transition-colors duration-500"
      )}
      style={{
        height: `${(works.length * 0.6) * 100}vh`,
        top: 0
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          featuredImage: { url: '' },
          clientName: '',
          slug: ''
        } as Work].map((work, index) => {
          const isActive = index === activeIndex;
          const isNext = index === activeIndex + 1;
          const isPrev = index === activeIndex - 1;
          return (
            <div
              key={work.sys.id}
              className={cn(
                "absolute inset-0 w-full",
                isActive ? "z-10" : 
                isNext ? "z-0" : 
                isPrev ? "z-0" : "z-0"
              )}
            >
              {work.featuredImage?.url && (
                <Image
                  src={work.featuredImage.url}
                  alt={work.clientName ?? 'Work background'}
                  fill
                  className={cn(
                    "object-cover transition-all duration-500",
                    isActive ? "opacity-100" : 
                    isNext || isPrev ? "opacity-90" : "opacity-0"
                  )}
                  priority
                />
              )}
            </div>
          );
        })}

        {/* Overlay gradient */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          featuredImage: { url: '' },
          clientName: '',
          slug: ''
        } as Work].map((work, index) => {
          const isActive = index === activeIndex;
          const isNext = index === activeIndex + 1;
          const isPrev = index === activeIndex - 1;
          
          return (
            <div
              key={`overlay-${work.sys.id}`}
              className={cn(
                "absolute inset-0 w-full transition-all duration-75 z-20",
                "bg-gradient-to-t from-foreground/60 via-foreground/40 to-background dark:from-background dark:via-background/60 dark:to-background/20",
                isActive ? "opacity-100" : 
                isNext || isPrev ? "opacity-90" : "opacity-0"
              )}
            />
          );
        })}

        {/* Content */}
        <div className="relative z-50 flex h-screen w-full items-center pointer-events-auto">
          <div className="w-full">
            <div className="max-w-[90rem] px-8 md:px-12 lg:px-16">
              <div className="relative flex items-center gap-6">
                {/* Recent work with */}
                <h1 className="text-white whitespace-nowrap font-chalet-newyork text-[2rem] leading-tight opacity-90">
                  Recent work with
                </h1>

                {/* Scrolling titles */}
                <div className="relative h-[4rem] mt-6">
                  {[...works, { 
                    sys: { id: 'detach-frame' }, 
                    featuredImage: { url: '' },
                    clientName: '',
                    slug: ''
                  } as Work].map((work, index) => (
                    <div 
                      key={work.sys.id}
                      className={cn(
                        "absolute left-0 w-full transform will-change-transform",
                        index === activeIndex 
                          ? "opacity-100"
                          : "opacity-30"
                      )}
                      style={{
                        transform: `translateY(${(index - activeIndex) * 4}rem)`,
                        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <h1 
                          className="text-white whitespace-nowrap hover:opacity-80 transition-opacity font-chalet-newyork text-[2rem] leading-tight cursor-pointer"
                          onClick={() => handleTitleClick(index)}
                        >
                          {work.clientName}
                        </h1>
                        {index === activeIndex && (
                          <ArrowRight 
                            className="h-8 w-8 text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity" 
                            onClick={handleArrowClick}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
