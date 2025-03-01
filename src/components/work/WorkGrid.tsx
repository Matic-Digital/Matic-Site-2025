'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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

export function WorkGrid({ works, status, _scrollRef, className }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [_currentPage] = useState(1);
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

  // Reset page when category changes
  useEffect(() => {
    // Removed currentPage reset as currentPage is not used anywhere
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

  const remainingGroups = [];
  for (let i = 5; i < filteredWorks.length; i += 5) {
    remainingGroups.push(filteredWorks.slice(i, i + 5));
  }

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
          {/* First 5 items */}
          <>
            {/* First item - full width */}
            <div className="grid gap-3 md:grid-cols-2">
              <BlurFade 
                className="md:col-span-2" 
                inView 
                inViewMargin="-100px" 
                useBlur={false}
                shouldAnimate={!!filteredWorks[0]?.slug && loadedImages[filteredWorks[0].slug]}
              >
                <Link href={`/work/${filteredWorks[0]?.slug}`} className="block">
                  <div className="group">
                    <div className="relative h-[680px] overflow-hidden">
                      {filteredWorks[0]?.featuredImage?.url && (
                        filteredWorks[0].featuredImage.url.includes('.mp4') ? (
                          <video
                            src={filteredWorks[0].featuredImage.url}
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
                            poster={filteredWorks[0].featuredImage.url.replace('.mp4', '.jpg')}
                          />
                        ) : (
                          <>
                            <Image
                              src={filteredWorks[0].featuredImage.url}
                              alt={filteredWorks[0].clientName ?? ''}
                              fill
                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                              onLoad={() => handleImageLoad(filteredWorks[0]?.slug)}
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
                          <div className="text-white">
                            {filteredWorks[0]?.logo?.url && (
                              <Image
                                src={filteredWorks[0].logo.url}
                                alt={filteredWorks[0].clientName ?? ''}
                                width={296}
                                height={64}
                                className="object-contain invert brightness-0 border-none rounded-none"
                              />
                            )}
                          </div>
                          <div className="flex">
                            <p className="text-white md:max-w-[42rem] md:text-[1.5rem] md:font-medium md:leading-[140%]">{filteredWorks[0]?.briefDescription}</p>
                            <Link href={`/work/${filteredWorks[0]?.slug}`} className="ml-auto flex items-center gap-4">
                              <p className="text-white">See Work</p>
                              <ArrowRight className="text-white" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile layout */}
                    <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text md:hidden">
                      <h3 className="mb-2 text-xl font-medium">{filteredWorks[0]?.clientName}</h3>
                      {filteredWorks[0]?.briefDescription && (
                        <p className="mb-4 text-sm">{filteredWorks[0]?.briefDescription}</p>
                      )}
                      <span className="flex items-center gap-4">
                        <p className="text-[var(--background)]">See Work</p>
                        <ArrowRight className="text-[var(--background)]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </BlurFade>

              <div className="flex flex-col gap-3">
                {/* Second item */}
                {filteredWorks[1] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.1} 
                    useBlur={false}
                    shouldAnimate={!!filteredWorks[1]?.slug && loadedImages[filteredWorks[1].slug]}
                  >
                    <Link href={`/work/${filteredWorks[1]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          {filteredWorks[1]?.featuredImage?.url && (
                            filteredWorks[1].featuredImage.url.includes('.mp4') ? (
                              <video
                                src={filteredWorks[1].featuredImage.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <Image
                                  src={filteredWorks[1].featuredImage.url}
                                  alt={filteredWorks[1].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(filteredWorks[1]?.slug)}
                                />
                                {filteredWorks[1]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{filteredWorks[1]?.clientName}</h3>
                          {filteredWorks[1]?.briefDescription && (
                            <p className="mb-4 text-sm">{filteredWorks[1]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)]">See Work</p>
                            <ArrowRight className="text-[var(--background)]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
                {/* Fourth item */}
                {filteredWorks[3] && (
                  <BlurFade inView inViewMargin="-100px" delay={0.3} useBlur={false}>
                    <Link href={`/work/${filteredWorks[3]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
                          {filteredWorks[3]?.featuredImage?.url && (
                            filteredWorks[3].featuredImage.url.includes('.mp4') ? (
                              <video
                                src={filteredWorks[3].featuredImage.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <motion.div
                                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                  style={{
                                    backgroundImage: `url(${filteredWorks[3]?.featuredImage?.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                  }}
                                  initial={{ scale: 1 }}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                {filteredWorks[3]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{filteredWorks[3]?.clientName}</h3>
                          {filteredWorks[3]?.briefDescription && (
                            <p className="mb-4 text-sm">{filteredWorks[3]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)]">See Work</p>
                            <ArrowRight className="text-[var(--background)]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {/* Third item */}
                {filteredWorks[2] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.2} 
                    useBlur={false}
                    shouldAnimate={!!filteredWorks[2]?.slug && loadedImages[filteredWorks[2].slug]}
                  >
                    <Link href={`/work/${filteredWorks[2]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
                          {filteredWorks[2]?.featuredImage?.url && (
                            filteredWorks[2].featuredImage.url.includes('.mp4') ? (
                              <video
                                src={filteredWorks[2].featuredImage.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <Image
                                  src={filteredWorks[2].featuredImage.url}
                                  alt={filteredWorks[2].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(filteredWorks[2]?.slug)}
                                />
                                {filteredWorks[2]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{filteredWorks[2]?.clientName}</h3>
                          {filteredWorks[2]?.briefDescription && (
                            <p className="mb-4 text-sm">{filteredWorks[2]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)]">See Work</p>
                            <ArrowRight className="text-[var(--background)]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
                {/* Fifth item */}
                {filteredWorks[4] && (
                  <BlurFade 
                    inView 
                    inViewMargin="-100px" 
                    delay={0.4} 
                    useBlur={false}
                    shouldAnimate={!!filteredWorks[4]?.slug && loadedImages[filteredWorks[4].slug]}
                  >
                    <Link href={`/work/${filteredWorks[4]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          {filteredWorks[4]?.featuredImage?.url && (
                            filteredWorks[4].featuredImage.url.includes('.mp4') ? (
                              <video
                                src={filteredWorks[4].featuredImage.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <>
                                <Image
                                  src={filteredWorks[4].featuredImage.url}
                                  alt={filteredWorks[4].clientName ?? ''}
                                  fill
                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-none border-none"
                                  onLoad={() => handleImageLoad(filteredWorks[4]?.slug)}
                                />
                                {filteredWorks[4]?.featuredImage?.url && (
                                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                          <h3 className="mb-2 text-xl font-medium">{filteredWorks[4]?.clientName}</h3>
                          {filteredWorks[4]?.briefDescription && (
                            <p className="mb-4 text-sm">{filteredWorks[4]?.briefDescription}</p>
                          )}
                          <span className="flex items-center gap-4">
                            <p className="text-[var(--background)]">See Work</p>
                            <ArrowRight className="text-[var(--background)]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </BlurFade>
                )}
              </div>
            </div>
          </>

          {/* Remaining items in groups of 5 */}
          {remainingGroups.map((workGroup, index) => {
            if (workGroup.length === 0) return null;

            return (
              <div className="flex flex-col gap-3" key={`${selectedCategory ?? 'all'}-group-${index}`}>
                {/* First item in group - full width */}
                <div className="grid gap-3 md:grid-cols-2">
                  <Link href={`/work/${workGroup[0]?.slug}`} className="block md:col-span-2">
                    <div className="group">
                      <div className="relative h-[680px] overflow-hidden">
                        {workGroup[0]?.featuredImage?.url && (
                          workGroup[0].featuredImage.url.includes('.mp4') ? (
                            <video
                              src={workGroup[0].featuredImage.url}
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
                              poster={workGroup[0].featuredImage.url.replace('.mp4', '.jpg')}
                            />
                          ) : (
                            <>
                              <motion.div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                  backgroundImage: `url(${workGroup[0]?.featuredImage?.url})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat'
                                }}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                              />
                              {workGroup[0]?.featuredImage?.url && (
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              )}
                            </>
                          )
                        )}
                        {/* Desktop layout */}
                        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
                          <div className="absolute inset-x-0 bottom-0 p-12">
                            <div className="text-white">
                              {workGroup[0]?.logo?.url && (
                                <Image
                                  src={workGroup[0].logo.url}
                                  alt={workGroup[0].clientName ?? ''}
                                  width={296}
                                  height={64}
                                  className="object-contain invert brightness-0 border-none rounded-none"
                                />
                              )}
                            </div>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                              <span className="flex items-center gap-2 text-white pointer-events-auto">
                                See Work
                                <ArrowRight className="w-6 h-6" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mobile layout */}
                      <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text md:hidden">
                        <h3 className="mb-2 text-xl font-medium">{workGroup[0]?.clientName}</h3>
                        {workGroup[0]?.briefDescription && (
                          <p className="mb-4 text-sm">{workGroup[0]?.briefDescription}</p>
                        )}
                        <span className="flex items-center gap-4">
                          <p className="text-[var(--background)]">See Work</p>
                          <ArrowRight className="text-[var(--background)]" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Remaining items in 2-column grid */}
                  {workGroup.length > 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-3">
                        {/* Second item */}
                        {workGroup[1] && (
                          <Link href={`/work/${workGroup[1]?.slug}`} className="block">
                            <div className="group">
                              <div className="relative h-[680px] overflow-hidden">
                                {workGroup[1]?.featuredImage?.url && (
                                  workGroup[1].featuredImage.url.includes('.mp4') ? (
                                    <video
                                      src={workGroup[1].featuredImage.url}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  ) : (
                                    <>
                                      <motion.div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(${workGroup[1]?.featuredImage?.url})`,
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat'
                                        }}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                      />
                                      {workGroup[1]?.featuredImage?.url && (
                                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                              <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                                <h3 className="mb-2 text-xl font-medium">{workGroup[1]?.clientName}</h3>
                                {workGroup[1]?.briefDescription && (
                                  <p className="mb-4 text-sm">{workGroup[1]?.briefDescription}</p>
                                )}
                                <span className="flex items-center gap-4">
                                  <p className="text-[var(--background)]">See Work</p>
                                  <ArrowRight className="text-[var(--background)]" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {/* Fourth item */}
                        {workGroup[3] && (
                          <Link href={`/work/${workGroup[3]?.slug}`} className="block">
                            <div className="group">
                              <div className="relative h-[810px] overflow-hidden">
                                {workGroup[3]?.featuredImage?.url && (
                                  workGroup[3].featuredImage.url.includes('.mp4') ? (
                                    <video
                                      src={workGroup[3].featuredImage.url}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  ) : (
                                    <>
                                      <motion.div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(${workGroup[3]?.featuredImage?.url})`,
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat'
                                        }}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                      />
                                      {workGroup[3]?.featuredImage?.url && (
                                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                              <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                                <h3 className="mb-2 text-xl font-medium">{workGroup[3]?.clientName}</h3>
                                {workGroup[3]?.briefDescription && (
                                  <p className="mb-4 text-sm">{workGroup[3]?.briefDescription}</p>
                                )}
                                <span className="flex items-center gap-4">
                                  <p className="text-[var(--background)]">See Work</p>
                                  <ArrowRight className="text-[var(--background)]" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* Third item */}
                        {workGroup[2] && (
                          <Link href={`/work/${workGroup[2]?.slug}`} className="block">
                            <div className="group">
                              <div className="relative h-[810px] overflow-hidden">
                                {workGroup[2]?.featuredImage?.url && (
                                  workGroup[2].featuredImage.url.includes('.mp4') ? (
                                    <video
                                      src={workGroup[2].featuredImage.url}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  ) : (
                                    <>
                                      <motion.div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(${workGroup[2]?.featuredImage?.url})`,
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat'
                                        }}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                      />
                                      {workGroup[2]?.featuredImage?.url && (
                                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                              <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                                <h3 className="mb-2 text-xl font-medium">{workGroup[2]?.clientName}</h3>
                                {workGroup[2]?.briefDescription && (
                                  <p className="mb-4 text-sm">{workGroup[2]?.briefDescription}</p>
                                )}
                                <span className="flex items-center gap-4">
                                  <p className="text-[var(--background)]">See Work</p>
                                  <ArrowRight className="text-[var(--background)]" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {/* Fifth item */}
                        {workGroup[4] && (
                          <Link href={`/work/${workGroup[4]?.slug}`} className="block">
                            <div className="group">
                              <div className="relative h-[680px] overflow-hidden">
                                {workGroup[4]?.featuredImage?.url && (
                                  workGroup[4].featuredImage.url.includes('.mp4') ? (
                                    <video
                                      src={workGroup[4].featuredImage.url}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="h-full w-full border-none rounded-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  ) : (
                                    <>
                                      <motion.div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{
                                          backgroundImage: `url(${workGroup[4]?.featuredImage?.url})`,
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center',
                                          backgroundRepeat: 'no-repeat'
                                        }}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                      />
                                      {workGroup[4]?.featuredImage?.url && (
                                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                              <div className="relative flex flex-col flex-1 min-h-[180px] px-4 py-6 transition-all duration-500 ease-out text-text group-hover:translate-y-[-4px]">
                                <h3 className="mb-2 text-xl font-medium">{workGroup[4]?.clientName}</h3>
                                {workGroup[4]?.briefDescription && (
                                  <p className="mb-4 text-sm">{workGroup[4]?.briefDescription}</p>
                                )}
                                <span className="flex items-center gap-4">
                                  <p className="text-[var(--background)]">See Work</p>
                                  <ArrowRight className="text-[var(--background)]" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
