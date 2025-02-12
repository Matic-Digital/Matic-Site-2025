'use client';

import { useState, useEffect } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface WorkGridProps {
  works: Work[];
}

export function WorkGrid({ works }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from works
  const categories = works.reduce<Array<{ sys: { id: string }, name: string }>>((acc, work) => {
    work.categoriesCollection?.items?.forEach((category) => {
      if (!acc.some(c => c.sys.id === category.sys.id)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  const filteredWorks = selectedCategory
    ? works.filter((work) => 
        work.categoriesCollection?.items?.some(
          (category) => category.sys.id === selectedCategory
        )
      )
    : works;

  if (!works?.length) {
    return null;
  }

  const remainingGroups = [];
  for (let i = 5; i < filteredWorks.length; i += 5) {
    remainingGroups.push(filteredWorks.slice(i, i + 5));
  }

  return (
    <>
      <Container>

      <Box className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-none px-4 py-2 text-sm transition-colors ${
            selectedCategory === null ? 'text-base bg-text' : 'border border-text text-text'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.sys.id}
            onClick={() => setSelectedCategory(category.sys.id)}
            className={`rounded-none px-4 py-2 text-sm transition-colors ${
              selectedCategory === category.sys.id ? 'bg-text text-base' : 'border border-text text-text'
            }`}
          >
            {category.name}
          </button>
        ))}
      </Box>
      </Container>

      {filteredWorks.length > 0 && (
        <div className="flex flex-col gap-3">
          {/* First 5 items */}
          <>
            {/* First item - full width */}
            <Box
              className="aspect-video relative overflow-hidden md:col-span-2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${filteredWorks[0]?.featuredImage?.url})`
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <div className="relative flex items-end w-full">
                  <div className="text-[var(--blue-200)]">
                    {filteredWorks[0]?.logo?.url && (
                      <Image
                        src={filteredWorks[0].logo.url}
                        alt={filteredWorks[0].clientName ?? ''}
                        width={300}
                        height={100}
                        className="h-auto w-[360px] border-none invert"
                        priority
                      />
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    <Link
                      href={`/work/${filteredWorks[0]?.slug}`}
                      className="flex items-center gap-4 duration-200 hover:opacity-90"
                    >
                      <p className="text-white">See Work</p>
                      <ArrowRight className="text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </Box>

            {/* Items 2-5 in 2-column grid */}
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                {/* Second item */}
                {filteredWorks[1] && (
                  <div>
                    <div className="relative h-[680px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${filteredWorks[1]?.featuredImage?.url})`
                        }}
                      />
                    </div>
                    <div className="px-4 py-6">
                      <h3 className="mb-2 text-xl font-medium">{filteredWorks[1]?.clientName}</h3>
                      {filteredWorks[1]?.briefDescription && (
                        <p className="mb-4 text-sm">{filteredWorks[1]?.briefDescription}</p>
                      )}
                      <Link
                        href={`/work/${filteredWorks[1]?.slug}`}
                        className="flex items-center gap-4"
                      >
                        <p className="text-[var(--background)]">See Work</p>
                        <ArrowRight className="text-[var(--background)]" />
                      </Link>
                    </div>
                  </div>
                )}
                {/* Fourth item */}
                {filteredWorks[3] && (
                  <div>
                    <div className="relative h-[810px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${filteredWorks[3]?.featuredImage?.url})`
                        }}
                      />
                    </div>
                    <div className="px-4 py-6">
                      <h3 className="mb-2 text-xl font-medium">{filteredWorks[3]?.clientName}</h3>
                      {filteredWorks[3]?.briefDescription && (
                        <p className="mb-4 text-sm">{filteredWorks[3]?.briefDescription}</p>
                      )}
                      <Link
                        href={`/work/${filteredWorks[3]?.slug}`}
                        className="flex items-center gap-4"
                      >
                        <p className="text-[var(--background)]">See Work</p>
                        <ArrowRight className="text-[var(--background)]" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {/* Third item */}
                {filteredWorks[2] && (
                  <div>
                    <div className="relative h-[810px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${filteredWorks[2]?.featuredImage?.url})`
                        }}
                      />
                    </div>
                    <div className="px-4 py-6">
                      <h3 className="mb-2 text-xl font-medium">{filteredWorks[2]?.clientName}</h3>
                      {filteredWorks[2]?.briefDescription && (
                        <p className="mb-4 text-sm">{filteredWorks[2]?.briefDescription}</p>
                      )}
                      <Link
                        href={`/work/${filteredWorks[2]?.slug}`}
                        className="flex items-center gap-4"
                      >
                        <p className="text-[var(--background)]">See Work</p>
                        <ArrowRight className="text-[var(--background)]" />
                      </Link>
                    </div>
                  </div>
                )}
                {/* Fifth item */}
                {filteredWorks[4] && (
                  <div>
                    <div className="relative h-[680px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${filteredWorks[4]?.featuredImage?.url})`
                        }}
                      />
                    </div>
                    <div className="px-4 py-6">
                      <h3 className="mb-2 text-xl font-medium">{filteredWorks[4]?.clientName}</h3>
                      {filteredWorks[4]?.briefDescription && (
                        <p className="mb-4 text-sm">{filteredWorks[4]?.briefDescription}</p>
                      )}
                      <Link
                        href={`/work/${filteredWorks[4]?.slug}`}
                        className="flex items-center gap-4"
                      >
                        <p className="text-[var(--background)]">See Work</p>
                        <ArrowRight className="text-[var(--background)]" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
          {/* Remaining items in groups of 5 */}
          {remainingGroups.map((workGroup, index) => {
            if (workGroup.length === 0) return null;

            return (
              <div key={index}>
                {/* First item in group - full width */}
                <Box
                  className="aspect-video relative overflow-hidden md:col-span-2"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[0]?.featuredImage?.url})`
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div className="relative flex items-end w-full">
                      <div className="text-[var(--blue-200)]">
                        {workGroup[0]?.logo?.url && (
                          <Image
                            src={workGroup[0].logo.url}
                            alt={workGroup[0].clientName ?? ''}
                            width={300}
                            height={100}
                            className="h-auto w-[360px] border-none invert"
                          />
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center">
                        <Link
                          href={`/work/${workGroup[0]?.slug}`}
                          className="flex items-center gap-4 duration-200 hover:opacity-90"
                        >
                          <p className="text-white">See Work</p>
                          <ArrowRight className="text-white" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Remaining items in 2-column grid */}
                {workGroup.length > 1 && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      {/* Second item */}
                      {workGroup[1] && (
                        <div>
                          <div className="relative h-[680px] overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[1]?.featuredImage?.url})`
                              }}
                            />
                          </div>
                          <div className="px-4 py-6">
                            <h3 className="mb-2 text-xl font-medium">{workGroup[1]?.clientName}</h3>
                            {workGroup[1]?.briefDescription && (
                              <p className="mb-4 text-sm">{workGroup[1]?.briefDescription}</p>
                            )}
                            <Link
                              href={`/work/${workGroup[1]?.slug}`}
                              className="flex items-center gap-4"
                            >
                              <p className="text-[var(--background)]">See Work</p>
                              <ArrowRight className="text-[var(--background)]" />
                            </Link>
                          </div>
                        </div>
                      )}
                      {/* Fourth item */}
                      {workGroup[3] && (
                        <div>
                          <div className="relative h-[810px] overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[3]?.featuredImage?.url})`
                              }}
                            />
                          </div>
                          <div className="px-4 py-6">
                            <h3 className="mb-2 text-xl font-medium">{workGroup[3]?.clientName}</h3>
                            {workGroup[3]?.briefDescription && (
                              <p className="mb-4 text-sm">{workGroup[3]?.briefDescription}</p>
                            )}
                            <Link
                              href={`/work/${workGroup[3]?.slug}`}
                              className="flex items-center gap-4"
                            >
                              <p className="text-[var(--background)]">See Work</p>
                              <ArrowRight className="text-[var(--background)]" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {/* Third item */}
                      {workGroup[2] && (
                        <div>
                          <div className="relative h-[810px] overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[2]?.featuredImage?.url})`
                              }}
                            />
                          </div>
                          <div className="px-4 py-6">
                            <h3 className="mb-2 text-xl font-medium">{workGroup[2]?.clientName}</h3>
                            {workGroup[2]?.briefDescription && (
                              <p className="mb-4 text-sm">{workGroup[2]?.briefDescription}</p>
                            )}
                            <Link
                              href={`/work/${workGroup[2]?.slug}`}
                              className="flex items-center gap-4"
                            >
                              <p className="text-[var(--background)]">See Work</p>
                              <ArrowRight className="text-[var(--background)]" />
                            </Link>
                          </div>
                        </div>
                      )}
                      {/* Fifth item */}
                      {workGroup[4] && (
                        <div>
                          <div className="relative h-[680px] overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[4]?.featuredImage?.url})`
                              }}
                            />
                          </div>
                          <div className="px-4 py-6">
                            <h3 className="mb-2 text-xl font-medium">{workGroup[4]?.clientName}</h3>
                            {workGroup[4]?.briefDescription && (
                              <p className="mb-4 text-sm">{workGroup[4]?.briefDescription}</p>
                            )}
                            <Link
                              href={`/work/${workGroup[4]?.slug}`}
                              className="flex items-center gap-4"
                            >
                              <p className="text-[var(--background)]">See Work</p>
                              <ArrowRight className="text-[var(--background)]" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
