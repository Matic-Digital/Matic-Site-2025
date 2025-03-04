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
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeWork = works[activeIndex];
  const router = useRouter();

  // Debug logging to check if homepageMedia is present
  useEffect(() => {
    console.log('Works data:', works);
    console.log('Works with media details:', works.map(work => ({
      clientName: work.clientName,
      hasHomepageMedia: !!work.homepageMedia?.url,
      homepageMediaUrl: work.homepageMedia?.url,
      featuredImageUrl: work.featuredImage?.url
    })));
  }, [works]);

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
      
      const { top } = sectionRef.current.getBoundingClientRect();
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
      className="relative w-full bg-base"
      style={{
        // Add one more viewport height to ensure space for last section
        height: `${(works.length + 1) * 100}vh`,
        position: 'relative'
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images */}
        {[...works, { 
          sys: { id: 'detach-frame' }, 
          featuredImage: { url: works[works.length - 1]?.featuredImage?.url ?? '' },
          clientName: '',
          slug: ''
        } as Work].map((work, index) => {
          // Use homepageMedia if available, otherwise use featuredImage
          const mediaToShow = work.homepageMedia?.url 
            ? work.homepageMedia 
            : work.featuredImage;
          
          return (
            <div
              key={work.sys.id}
              className={cn(
                "absolute inset-0 w-full transition-opacity duration-700",
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {mediaToShow?.url && (
                mediaToShow.url.includes('.mp4') ? (
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
              <div className={cn(
                "absolute inset-0 bg-base/30 transition-opacity duration-700",
                {
                  'opacity-0': index === works.length && scrollProgress > 0.5,
                  'opacity-100': !(index === works.length && scrollProgress > 0.5)
                }
              )} />
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
          // Use homepageMedia if available for the last work, otherwise use featuredImage
          const lastWorkMedia = works[works.length - 1]?.homepageMedia?.url
            ? works[works.length - 1]?.homepageMedia
            : works[works.length - 1]?.featuredImage;
          
          // For the detach frame, use the last work's media
          if (work.sys.id === 'detach-frame' && lastWorkMedia?.url) {
            // Create a properly typed ContentfulAsset
            const asset: ContentfulAsset = {
              sys: { id: 'detach-frame-asset' },
              title: 'Detach Frame Asset',
              description: '',
              url: lastWorkMedia.url,
              width: lastWorkMedia.width || 1920,
              height: lastWorkMedia.height || 1080,
              size: 0,
              fileName: 'detach-frame.jpg',
              contentType: 'image/jpeg'
            };
            work.featuredImage = asset;
          }
          
          return (
            <div
              key={`overlay-${work.sys.id}`}
              className={cn(
                "absolute inset-0 w-full z-30",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
              style={{ backgroundImage: 'linear-gradient(180deg, transparent 0%, transparent 30%, hsl(var(--maticblack) / 0.1) 60%, hsl(var(--maticblack) / 0.3) 80%, hsl(var(--maticblack)) 100%)' }}
            />
          );
        })}
        {/* Content */}
        <div className="relative z-40 flex h-screen w-full items-center pointer-events-auto">
          <div className="w-full">
            <div className="max-w-[90rem] px-8 md:px-12 lg:px-16">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 h-screen">
                {/* Recent work with */}
                <div className="pt-24 md:pt-0 w-full md:max-w-[17rem]">
                  <h1 className="text-white font-chalet-newyork text-[1.75rem] md:text-[2rem] leading-[1.1]">
                    Recent work with
                  </h1>
                </div>

                {/* Scrolling titles */}
                <div className="flex-grow flex items-end md:items-center pb-24 md:pb-0 w-full">
                  <div className="relative h-[4rem] w-full">
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
