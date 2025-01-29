'use client';

import { useState, useEffect, useRef } from 'react';
import { type Work } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WorkSectionProps {
  works: Work[];
}

export function WorkSection({ works }: WorkSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reversedWorks = [...works].reverse();
  const activeWork = reversedWorks[activeIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollDistance = height - viewportHeight;
      const scrollPerSection = totalScrollDistance / (reversedWorks.length - 1);
      
      // Calculate progress based on current scroll position
      const scrollProgress = Math.max(0, -top / scrollPerSection);
      const newIndex = Math.min(
        Math.floor(scrollProgress),
        reversedWorks.length - 1
      );

      if (newIndex >= 0 && newIndex < reversedWorks.length) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reversedWorks.length]);
  
  if (!activeWork) return null;

  return (
    <div 
      ref={sectionRef}
      className="relative w-full"
      style={{ 
        // Add one more viewport height to ensure the last item gets full scroll time
        height: `${(reversedWorks.length) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images */}
        {reversedWorks.map((work, index) => (
          <div
            key={work.sys.id}
            className={cn(
              "absolute inset-0 w-full transition-opacity duration-700",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
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
            {/* Overlay gradient */}
            <div className="absolute inset-0 w-full bg-gradient-to-t from-black/80 to-black/20" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 flex h-screen w-full items-center">
          <div className="w-full">
            <div className="max-w-[90rem] px-8 md:px-12 lg:px-16">
              <div className="relative flex items-center gap-6">
                <div className="text-4xl md:text-6xl font-medium text-white leading-none">
                  We partner with
                </div>

                {/* Scrolling titles */}
                <div className="relative h-[1.5em] -mt-8">
                  {reversedWorks.map((work, index) => (
                    <div 
                      key={work.sys.id}
                      className={cn(
                        "absolute transition-all duration-700",
                        index === activeIndex 
                          ? "opacity-100 translate-y-0" 
                          : index < activeIndex
                            ? "opacity-30 -translate-y-16"
                            : "opacity-30 translate-y-16"
                      )}
                      style={{
                        transform: `translateY(${(index - activeIndex) * 4}rem)`
                      }}
                    >
                      <h3 className="text-4xl md:text-6xl font-medium text-white whitespace-nowrap leading-none">
                        {work.clientName}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
