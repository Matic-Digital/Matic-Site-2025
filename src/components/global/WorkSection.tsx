'use client';

import { useState, useEffect, useRef } from 'react';
import { type Work, type ContentfulAsset } from '@/types/contentful';
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
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const activeWork = works[activeIndex];
  const router = useRouter();
  
  // Mobile detection effect
  useEffect(() => {
    const checkIfMobile = () => {
      const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(mobileMediaQuery.matches);
      
      const handleResize = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
      };
      mobileMediaQuery.addEventListener('change', handleResize);
      
      return () => mobileMediaQuery.removeEventListener('change', handleResize);
    };
    
    const cleanupMobileDetection = checkIfMobile();
    return () => {
      cleanupMobileDetection();
    };
  }, []);

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
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate total scroll distance needed for all sections
      const totalScrollDistance = viewportHeight * works.length;
      const scrolled = Math.max(0, -top + viewportHeight);
      
      // Calculate progress including space for last section
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      // Calculate current section
      const rawIndex = ((scrolled - viewportHeight) / viewportHeight);
      const targetIndex = Math.min(
        works.length - 1,
        Math.max(0, Math.floor(rawIndex))
      );
      
      if (targetIndex !== activeIndex) {
        setActiveIndex(targetIndex);
      }
      setScrollProgress(progress);
      
      // Handle sticky behavior for mobile only
      if (isMobile && stickyContainerRef.current) {
        // Calculate how far we've scrolled into the section
        const scrolledIntoSection = -top;
        const sectionHeight = height;
        
        // We want to be sticky when we're within the section bounds
        const shouldBeSticky = scrolledIntoSection >= 0 && scrolledIntoSection < (sectionHeight - viewportHeight);
        
        if (shouldBeSticky) {
          // When within the section bounds, use fixed positioning
          Object.assign(stickyContainerRef.current.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: '10'
          });
        } else if (scrolledIntoSection >= (sectionHeight - viewportHeight)) {
          // When we've scrolled past the section, position at the bottom
          Object.assign(stickyContainerRef.current.style, {
            position: 'absolute',
            top: `${sectionHeight - viewportHeight}px`,
            left: '0',
            width: '100%',
            zIndex: '1'
          });
        } else {
          // When at the top of the section, position at the top
          Object.assign(stickyContainerRef.current.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: '1'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [works.length, activeIndex, isMobile]);
  
  if (!activeWork) return null;
  
  // Helper function to get the appropriate media to show
  const getMediaToShow = (work: Work) => {
    if (!work) return null;
    return work.homepageMedia?.url ? work.homepageMedia : work.featuredImage;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-base"
      style={{
        // Add one more viewport height to ensure space for last section
        height: `${(works.length + 1) * 100}vh`,
        position: 'relative',
        // Force a stacking context
        zIndex: 1
      }}
    >
      <div 
        ref={stickyContainerRef}
        className="h-screen w-full overflow-hidden sticky top-0"
        style={{
          zIndex: 2
        }}>
        {/* Background Images */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          // Use the last work's homepageMedia if available, otherwise use featuredImage
          homepageMedia: works[works.length - 1]?.homepageMedia,
          featuredImage: works[works.length - 1]?.featuredImage,
          clientName: '',
          slug: ''
        } as Work].map((work, index) => {
          const mediaToShow = getMediaToShow(work);
          
          return (
            <div
              key={work.sys.id}
              className={cn(
                "absolute inset-0 w-full transition-opacity duration-700",
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {mediaToShow?.url && (
                (mediaToShow.url.includes('.mp4') || mediaToShow.contentType?.includes('video')) ? (
                  <video
                    src={mediaToShow.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover border-none rounded-none"
                  />
                ) : (
                  <Image
                    src={mediaToShow.url}
                    alt={mediaToShow.title || ''}
                    width={mediaToShow.width || 1920}
                    height={mediaToShow.height || 1080}
                    className="absolute inset-0 h-full w-full object-cover border-none rounded-none"
                    priority={index === 0}
                  />
                )
              )}
              <div 
                className={cn(
                  "absolute inset-0 bg-base/30 transition-opacity duration-700",
                  {
                    'opacity-0': index === works.length && scrollProgress > 0.5,
                    'opacity-100': !(index === works.length && scrollProgress > 0.5)
                  }
                )}
              />
            </div>
          );
        })}
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 w-full h-full z-30 pointer-events-none"
        >
          {[...works, { 
            sys: { id: 'detach-frame' }, 
            homepageMedia: works[works.length - 1]?.homepageMedia,
            featuredImage: works[works.length - 1]?.featuredImage,
            clientName: '',
            slug: ''
          } as Work].map((work, index) => {
            // Get the media to show using our helper function
            const mediaToShow = getMediaToShow(work);
            
            // For the detach frame, use the last work's media
            if (work.sys.id === 'detach-frame' && mediaToShow?.url) {
              // Create a properly typed ContentfulAsset
              const asset: ContentfulAsset = {
                sys: { id: 'detach-frame-asset' },
                title: 'Detach Frame Asset',
                description: '',
                url: mediaToShow.url,
                width: mediaToShow.width || 1920,
                height: mediaToShow.height || 1080,
                size: 0,
                fileName: 'detach-frame-asset',
                contentType: mediaToShow.contentType || 'image/jpeg'
              };
              
              // Update both homepageMedia and featuredImage to ensure consistency
              if (mediaToShow === work.homepageMedia) {
                work.homepageMedia = asset;
              } else {
                work.featuredImage = asset;
              }
            }
            
            return (
              <div
                key={`overlay-${work.sys.id}`}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-700",
                  index === activeIndex ? "opacity-100" : "opacity-0"
                )}
                style={{
                  backgroundImage: 'linear-gradient(180deg, transparent 0%, transparent 30%, hsl(var(--maticblack) / 0.1) 60%, hsl(var(--maticblack) / 0.3) 80%, hsl(var(--maticblack)) 100%)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            );
          })}
        </div>
        {/* Content */}
        <div 
          className="relative z-50 flex h-screen w-full items-center pointer-events-auto"
        >
          <div className="w-full">
            <div className="max-w-[90rem] px-8 md:px-12 lg:px-16">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 h-screen">
                {/* Recent work with */}
                <div 
                  className="pt-24 md:pt-0 w-full md:max-w-[17rem]"
                  style={{
                    position: 'sticky',
                    top: '10vh'
                  }}
                >
                  <h1 
                    className="text-white font-chalet-newyork text-[1.75rem] md:text-[2rem] leading-[1.1]"
                  >
                    Recent work with
                  </h1>
                </div>

                {/* Scrolling titles */}
                <div 
                  className="flex-grow flex items-end md:items-center pb-24 md:pb-0 w-full"
                >
                  <div 
                    className="relative h-[4rem] w-full"
                  >
                    {[...works, { 
                      sys: { id: 'detach-frame' }, 
                      homepageMedia: works[works.length - 1]?.homepageMedia,
                      featuredImage: works[works.length - 1]?.featuredImage,
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
                        <div className="flex items-center gap-3 mt-4">
                          <h2 
                            className="text-white hover:opacity-80 transition-opacity font-chalet-newyork text-[1.75rem] md:text-[2rem] leading-[1.1] cursor-pointer"
                            onClick={() => handleTitleClick(index)}
                          >
                            {work.clientName}
                          </h2>
                          {work.clientName && index === activeIndex && (
                            <ArrowRight 
                              className="h-6 w-6 md:h-8 md:w-8 text-text opacity-80 cursor-pointer hover:opacity-100 transition-opacity" 
                              onClick={() => router.push(`/work/${work.slug}`)}
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
      </div>
    </section>
  );
}
