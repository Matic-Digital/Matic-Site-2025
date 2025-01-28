'use client';

import { useState } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'Experience strategy',
  'Web & digital',
  'Brand & creative',
  'Intelligent scale',
  'Teams & culture'
] as const;

type Category = typeof CATEGORIES[number];

interface WorkGridProps {
  works: Work[];
}

const workColors = [
  'bg-[#FFCCA9]',
  'bg-blue-200',
  'bg-[#000227]',
  'bg-blue-400',
  'bg-[#000227]'
] as const;

export function WorkGrid({ works }: WorkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const allWorks = [...works].reverse();
  const filteredWorks = selectedCategory
    ? works.filter((work) => work.categories?.includes(selectedCategory))
    : works;

  const reversedWorks = [...filteredWorks].reverse();

  if (!works?.length) {
    return null;
  }

  const getWorkColor = (index: number) => {
    return workColors[index % workColors.length] ?? 'bg-[#FFCCA9]'; // Default to first color
  };

  const firstWorkStyles = {
    height: 'aspect-video',
    imageStyle: {
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${allWorks[0]?.featuredImage?.url})`
    }
  };

  return (
    <>
      <Container>

      <Box className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-none px-4 py-2 text-sm transition-colors ${
            selectedCategory === null ? 'bg-[#000227] text-background' : 'border border-[#000227]'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-none px-4 py-2 text-sm transition-colors ${
              selectedCategory === category ? 'bg-[#000227] text-background' : 'border border-[#000227]'
            }`}
          >
            {category}
          </button>
        ))}
      </Box>
      </Container>

      {reversedWorks?.reduce((acc: JSX.Element[], _, index) => {
        if (index % 6 === 0) {
          const workGroup = reversedWorks.slice(index, index + 6);
          if (workGroup.length > 0) {
            acc.push(
              <div key={index}>
                <Box
                  key={workGroup[0]?.sys.id}
                  className={`${index === 0 ? 'aspect-video' : 'h-[500px]'} relative mb-3 overflow-hidden md:col-span-2`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={
                      index === 0
                        ? firstWorkStyles.imageStyle
                        : {
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${workGroup[0]?.featuredImage?.url})`
                          }
                    }
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div className="relative flex items-end w-full">
                      <div className="text-blue-200">
                        {workGroup[0]?.logo?.url && (
                          <Image
                            src={workGroup[0].logo.url}
                            alt={workGroup[0].clientName ?? ''}
                            width={300}
                            height={100}
                            className="h-auto w-[360px] border-none invert"
                            priority
                          />
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center">
                        <Link
                          href={`/work/${workGroup[0]?.slug}`}
                          className="flex items-center gap-4"
                        >
                          <p className="text-background">See Work</p>
                          <ArrowRight className="text-background" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Box>

                {workGroup.length > 1 && (
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
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
                            <p className="text-background">See Work</p>
                            <ArrowRight className="text-background" />
                          </Link>
                        </div>
                      </div>
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
                              <p className="text-background">See Work</p>
                              <ArrowRight className="text-background" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
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
                              <p className="text-background">See Work</p>
                              <ArrowRight className="text-background" />
                            </Link>
                          </div>
                        </div>
                      )}
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
                              <p className="text-background">See Work</p>
                              <ArrowRight className="text-background" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        }
        return acc;
      }, [])}
    </>
  );
}
