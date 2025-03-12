'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlurFade } from '@/components/magicui/BlurFade';
import { Skeleton } from '@/components/ui/skeleton';

interface WorkGridProps {
  works: Work[];
  status: string;
  _scrollRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const shuffleArray = (array: Work[]): Work[] => {
  // Create a new array with only defined values
  const validWorks = array.filter((work): work is Work => work !== undefined);
  const shuffled = [...validWorks];
  
  // Perform Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Use temporary variable for the swap to maintain type safety
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }

  return shuffled;
};

export function WorkGrid({ works, status }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);

  const handleImageLoad = (workSlug: string | undefined) => {
    if (workSlug) {
      setLoadedImages(prev => ({ ...prev, [workSlug]: true }));
    }
  };

  // Function to scroll to center the selected category
  const scrollToCenter = (button: HTMLButtonElement | null) => {
    if (!button || !categoryContainerRef.current) return;

    const container = categoryContainerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonWidth = button.offsetWidth;
    const buttonLeft = button.offsetLeft;

    // Calculate the scroll position that will center the button
    const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  // Effect to center the selected category when it changes
  React.useEffect(() => {
    if (selectedCategory === null) {
      const allButton = categoryContainerRef.current?.querySelector('button:first-child');
      scrollToCenter(allButton as HTMLButtonElement);
    } else {
      const selectedButton = categoryContainerRef.current?.querySelector(
        `button[data-category="${selectedCategory}"]`
      );
      scrollToCenter(selectedButton as HTMLButtonElement);
    }
  }, [selectedCategory]);

  // Extract unique categories from works
  const categories = works.reduce<Array<{ sys: { id: string }, name: string }>>((acc, work) => {
    work.categoriesCollection?.items?.forEach((category) => {
      if (!acc.some(c => c.sys.id === category.sys.id)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  // Filter works based on selected category
  const filteredWorks = useMemo(() => {
    if (!works) return [];
    if (selectedCategory === null) {
      return shuffleArray(works);
    }
    const filtered = works.filter(work => 
      work.categoriesCollection?.items?.some(
        (category) => category.sys.id === selectedCategory
      )
    );
    return shuffleArray(filtered);
  }, [works, selectedCategory]);

  // Loading state should only show when fetching new data
  const isLoading = status === 'loading' && !works;

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(5);
  }, [selectedCategory]);

  // Early return for loading state
  if (isLoading) {
    return (
      <Container className="overflow-hidden">
        <Box className="mb-8 flex flex-wrap gap-4">
          {['All', ...categories.map(c => c.name)].map((category) => (
            <div
              key={category}
              className="rounded-sm px-4 py-2 text-sm"
            >
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </Box>
        
        <div className="flex flex-col gap-3">
          {/* First item skeleton */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <Skeleton className="h-[680px] w-full" />
              <Box className="mt-4" gap={2}>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </Box>
            </div>
            
            {/* 2x2 grid skeletons */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[680px] w-full" />
              <Skeleton className="h-[810px] w-full" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[810px] w-full" />
              <Skeleton className="h-[680px] w-full" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const displayedWorks = filteredWorks.slice(0, displayCount);
  const hasMoreWorks = filteredWorks.length > displayCount;

  // Group works into sets of 5 for grid layout
  const workGroups = [];
  for (let i = 0; i < displayedWorks.length; i += 5) {
    workGroups.push(displayedWorks.slice(i, i + 5));
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 5);
  };

  return (
    <Container className="overflow-hidden">
      <Box className="mb-8 flex flex-wrap gap-4">
        <div
          ref={categoryContainerRef}
          className="no-scrollbar flex w-full gap-[0.625rem] overflow-x-auto md:w-auto md:flex-wrap"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm md:text-[0.875rem] leading-normal transition-colors ${
              selectedCategory === null
                ? 'bg-text text-background'
                : 'border border-[#A6A7AB] text-text'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.sys.id}
              data-category={category.sys.id}
              onClick={() => setSelectedCategory(category.sys.id)}
              className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm md:text-[0.875rem] leading-normal transition-colors ${
                selectedCategory === category.sys.id
                  ? 'bg-text text-background'
                  : 'border border-[#A6A7AB] text-text'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Box>
      {filteredWorks.length > 0 && (
        <div className="flex flex-col gap-3" key={selectedCategory ?? 'all'}>
          {/* Work items */}
          {workGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="grid gap-3 md:grid-cols-2 mb-3">
              <BlurFade 
                className="md:col-span-2" 
                inView 
                inViewMargin="-100px" 
                useBlur={false}
                shouldAnimate={!!group[0]?.slug && loadedImages[group[0].slug]}
              >
                <Link href={`/work/${group[0]?.slug}`} className="block">
                  <div className="group">
                    <div className="relative h-[680px] overflow-hidden">
                      {(group[0]?.homepageMedia?.url ?? group[0]?.featuredImage?.url) && (
                        (group[0]?.homepageMedia?.contentType?.startsWith('video/') || group[0]?.homepageMedia?.url?.endsWith('.mp4')) ? (
                          <>
                            <video
                              src={group[0].homepageMedia.url}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              style={{ 
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                maxWidth: 'none',
                              }}
                              preload="auto"
                              poster={group[0].homepageMedia.url.replace('.mp4', '.jpg')}
                            />
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                          </>
                        ) : (
                          <>
                            <Image
                              src={group[0].homepageMedia?.url ?? group[0].featuredImage.url}
                              alt={group[0].clientName ?? ''}
                              fill
                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                              onLoad={() => handleImageLoad(group[0]?.slug)}
                            />
                            <div 
                              className="absolute inset-0 pointer-events-none" 
                              style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} 
                            />
                          </>
                        )
                      )}
                      {/* Desktop layout */}
                      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
                        <div className="absolute inset-x-0 bottom-0 p-12 flex flex-col gap-[1.25rem]">
                          <div className="text-white h-[45px] flex">
                            {group[0]?.logo?.url && (
                              <div className="flex items-center">
                                <Image
                                  src={group[0].logo.url}
                                  alt={group[0].clientName ?? ''}
                                  width={296}
                                  height={45}
                                  className="object-contain max-h-[45px] invert brightness-0 border-none rounded-none"
                                  style={{ objectPosition: 'left' }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex">
                            <p className="text-white md:max-w-[42rem] md:text-[1.5rem] md:font-medium md:leading-[140%]">{group[0]?.briefDescription}</p>
                            <div className="ml-auto flex items-center gap-4">
                              <p className="text-white md:text-[1.5rem] md:font-medium md:leading-[140%]">See Work</p>
                              <ArrowRight className="text-white h-6 w-6 md:h-7 md:w-7" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile layout */}
                    <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text md:hidden">
                      <h3 className="mb-2 text-xl font-medium">{group[0]?.clientName}</h3>
                      {group[0]?.briefDescription && (
                        <p className="mb-4 text-sm">{group[0]?.briefDescription}</p>
                      )}
                      <span className="flex items-center gap-4">
                        <p className="text-[var(--background)] text-sm">See Work</p>
                        <ArrowRight className="text-[var(--background)] h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </BlurFade>

              <div className="flex flex-col gap-3">
                {/* Second item */}
                {group[1] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.1} 
                    useBlur={false}
                    shouldAnimate={!!group[1]?.slug && loadedImages[group[1].slug]}
                  >
                    <Link href={`/work/${group[1]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          {group[1]?.featuredImage?.url && (
                            group[1].featuredImage.url.includes('.mp4') ? (
                              <>
                                <video
                                  src={group[1].featuredImage.url}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                  style={{ 
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: 'none',
                                  }}
                                  preload="auto"
                                  poster={group[1].featuredImage.url.replace('.mp4', '.jpg')}
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={group[1].featuredImage.url}
                                  alt={group[1].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(group[1]?.slug)}
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{group[1]?.clientName}</h3>
                          {group[1]?.briefDescription && (
                            <p className="mb-4 text-sm">{group[1]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)] text-sm">See Work</p>
                            <ArrowRight className="text-[var(--background)] h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
                {/* Fourth item */}
                {group[3] && (
                  <BlurFade inView inViewMargin="-100px" delay={0.3} useBlur={false}>
                    <Link href={`/work/${group[3]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
                          {group[3]?.featuredImage?.url && (
                            group[3].featuredImage.url.includes('.mp4') ? (
                              <>
                                <video
                                  src={group[3].featuredImage.url}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={group[3].featuredImage.url}
                                  alt={group[3].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(group[3]?.slug)}
                                />
                                {group[3]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{group[3]?.clientName}</h3>
                          {group[3]?.briefDescription && (
                            <p className="mb-4 text-sm">{group[3]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)] text-sm">See Work</p>
                            <ArrowRight className="text-[var(--background)] h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {/* Third item */}
                {group[2] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.2} 
                    useBlur={false}
                    shouldAnimate={!!group[2]?.slug && loadedImages[group[2].slug]}
                  >
                    <Link href={`/work/${group[2]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
                          {group[2]?.featuredImage?.url && (
                            group[2].featuredImage.url.includes('.mp4') ? (
                              <>
                                <video
                                  src={group[2].featuredImage.url}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={group[2].featuredImage.url}
                                  alt={group[2].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(group[2]?.slug)}
                                />
                                {group[2]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{group[2]?.clientName}</h3>
                          {group[2]?.briefDescription && (
                            <p className="mb-4 text-sm">{group[2]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)] text-sm">See Work</p>
                            <ArrowRight className="text-[var(--background)] h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
                {/* Fifth item */}
                {group[4] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.4} 
                    useBlur={false}
                    shouldAnimate={!!group[4]?.slug && loadedImages[group[4].slug]}
                  >
                    <Link href={`/work/${group[4]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          {group[4]?.featuredImage?.url && (
                            group[4].featuredImage.url.includes('.mp4') ? (
                              <>
                                <video
                                  src={group[4].featuredImage.url}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={group[4].featuredImage.url}
                                  alt={group[4].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(group[4]?.slug)}
                                />
                                {group[4]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{group[4]?.clientName}</h3>
                          {group[4]?.briefDescription && (
                            <p className="mb-4 text-sm">{group[4]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)] text-sm">See Work</p>
                            <ArrowRight className="text-[var(--background)] h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
              </div>
            </div>
          ))}
          {hasMoreWorks && (
            <button
              onClick={handleLoadMore}
              className="mt-12 mb-16 mx-auto flex items-center gap-2 rounded-sm border border-[#A6A7AB] px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-text hover:text-background"
            >
              Load More Work
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </Container>
  );
}
