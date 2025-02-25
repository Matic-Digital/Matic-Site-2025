'use client';

import { useState, useEffect, useMemo } from 'react';
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
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export function WorkGrid({ works, status, scrollRef }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    if (selectedCategory === null) return works;
    return works.filter(work => 
      work.categoriesCollection?.items?.some(
        (category) => category.sys.id === selectedCategory
      )
    );
  }, [works, selectedCategory]);

  // Loading state should only show when fetching new data
  const isLoading = status === 'loading' && !works;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
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
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-sm px-4 py-2 text-sm transition-colors ${
            selectedCategory === null ? 'text-background bg-text' : 'border border-text text-text'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.sys.id}
            onClick={() => setSelectedCategory(category.sys.id)}
            className={`rounded-sm px-4 py-2 text-sm transition-colors ${
              selectedCategory === category.sys.id ? 'bg-text text-background' : 'border border-text text-text'
            }`}
          >
            {category.name}
          </button>
        ))}
      </Box>
      {filteredWorks.length > 0 && (
        <div className="flex flex-col gap-3" key={selectedCategory ?? 'all'}>
          {/* First 5 items */}
          <>
            {/* First item - full width */}
            <div className="grid gap-3 md:grid-cols-2">
              <BlurFade className="md:col-span-2" inView inViewMargin="-100px">
                <Link href={`/work/${filteredWorks[0]?.slug}`} className="block">
                  <div className="group">
                    <div className="relative h-[680px] overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${filteredWorks[0]?.featuredImage?.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                      
                      {/* Desktop layout */}
                      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
                        <div className="absolute inset-x-0 bottom-0 p-12">
                          <div className="text-white">
                            {filteredWorks[0]?.logo?.url && (
                              <Image
                                src={filteredWorks[0].logo.url}
                                alt={filteredWorks[0].clientName ?? ''}
                                width={296}
                                height={64}
                                className="object-contain invert border-none rounded-none"
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
                    <div className="px-4 py-6 transition-all duration-500 ease-out text-text md:hidden">
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
                  <BlurFade inView inViewMargin="-100px" delay={0.1}>
                    <Link href={`/work/${filteredWorks[1]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${filteredWorks[1]?.featuredImage?.url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            }}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                        </div>
                        <div className="px-4 py-6 transition-all duration-500 ease-out text-text">
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
                  <BlurFade inView inViewMargin="-100px" delay={0.3}>
                    <Link href={`/work/${filteredWorks[3]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
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
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                        </div>
                        <div className="px-4 py-6 transition-all duration-500 ease-out text-text">
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
                  <BlurFade inView inViewMargin="-100px" delay={0.2}>
                    <Link href={`/work/${filteredWorks[2]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[810px] overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${filteredWorks[2]?.featuredImage?.url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            }}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                        </div>
                        <div className="px-4 py-6 transition-all duration-500 ease-out text-text">
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
                  <BlurFade inView inViewMargin="-100px" delay={0.4}>
                    <Link href={`/work/${filteredWorks[4]?.slug}`} className="block">
                      <div className="group">
                        <div className="relative h-[680px] overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${filteredWorks[4]?.featuredImage?.url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            }}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                        </div>
                        <div className="px-4 py-6 transition-all duration-500 ease-out text-text">
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
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                        
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
                                  className="object-contain invert border-none rounded-none"
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
                      <div className="px-4 py-6 transition-all duration-500 ease-out text-text md:hidden">
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
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </div>
                              <div className="px-4 py-6 transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
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
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </div>
                              <div className="px-4 py-6 transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
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
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </div>
                              <div className="px-4 py-6 transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
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
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0, 2, 39, 0.00) 0%, rgba(0, 2, 39, 0.30) 52.5%, rgba(0, 2, 39, 0.60) 90%, #000227 100%)' }} />
                              </div>
                              <div className="px-4 py-6 transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
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
