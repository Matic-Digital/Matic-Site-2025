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
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeWork = works[activeIndex];
  const router = useRouter();

  const handleTitleClick = (index: number) => {
    const work = works[index];
    setActiveIndex(index);
    
    // Navigate to work page
    setTimeout(() => {
      router.push(`/work/${work?.slug}`);
    }, 600);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
    const parent = sectionRef.current.parentElement;
      if (!parent) return;

      const { top } = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate total scroll distance needed for all sections
      const totalScrollDistance = viewportHeight * works.length;
      const scrolled = -top;
      
      // Calculate progress including space for last section
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      // Calculate current section
      const rawIndex = (scrolled / viewportHeight);
      const targetIndex = Math.min(
        works.length - 1,
        Math.max(0, Math.floor(rawIndex))
      );
      
      if (targetIndex !== activeIndex) {
        setActiveIndex(targetIndex);
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [works.length, activeIndex]);
  
  if (!activeWork) return null;

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-background dark:bg-background"
      style={{
        // Add one more viewport height to ensure space for last section
        height: `${works.length * 100}vh`,
        position: 'relative'
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ 
        position: scrollProgress >= 0.95 ? 'relative' : 'sticky'
      }}>
        {/* Background Images */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          featuredImage: { url: '' },
          clientName: '',
          slug: ''
        } as Work].map((work, index) => (
          <div
            key={work.sys.id}
            className={cn(
              "absolute inset-0 w-full",
              index === activeIndex ? "z-10" : "z-0"
            )}
            style={{
              opacity: index === activeIndex ? 1 : 0
            }}
          >
            {work.featuredImage?.url && (
              <Image
                src={work.featuredImage.url}
                alt={work.clientName ?? 'Work background'}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        ))}

        {/* Overlay gradient */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          featuredImage: { url: '' },
          clientName: '',
          slug: ''
        } as Work].map((work, index) => (
          <div
            key={`overlay-${work.sys.id}`}
            className={cn(
              "absolute inset-0 w-full z-20",
              "bg-gradient-to-t from-foreground/60 via-foreground/40 to-background dark:from-background dark:via-background/60 dark:to-background/20",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

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
                        "absolute left-0 w-full transition-all duration-500 ease-out",
                        index === activeIndex ? "opacity-100 z-10" : "opacity-30"
                      )}
                      style={{
                        transform: `translateY(${(index - activeIndex) * 4}rem)`,
                      }}
                    >
                      <div className="flex items-center gap-3 relative">
                        <div className="flex items-center gap-3">
                          <h2 
                            className="text-white whitespace-nowrap hover:opacity-80 transition-opacity font-chalet-newyork text-[2rem] leading-tight cursor-pointer"
                            onClick={() => handleTitleClick(index)}
                          >
                            {work.clientName}
                          </h2>
                          {work.clientName && index === activeIndex && (
                            <ArrowRight 
                              className="h-8 w-8 text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity" 
                              onClick={() => router.push(`/work/${work.slug}`)}
                            />
                          )}
                        </div>
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
