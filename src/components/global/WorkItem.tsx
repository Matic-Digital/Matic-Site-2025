'use client';

import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Box } from './matic-ds';
import { ArrowRight } from 'lucide-react';

interface WorkItemProps {
  work: Work;
  isActive: boolean;
}

export function WorkItem({ work, isActive }: WorkItemProps) {
  return (
    <div className={`
      relative w-full min-h-screen
      ${isActive ? 'opacity-100' : 'opacity-50'}
    `}>
      {/* Background image */}
      <div className="absolute inset-0">
        {work.featuredImage?.url && (
          <Image
            src={work.featuredImage.url}
            alt={work.clientName}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-[95rem] px-6 md:px-12 lg:px-24">
          <Box direction="col" className="min-h-screen justify-between md:justify-center w-full relative">
            <Box direction="col" className="gap-2">
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                  <h1 className="font-chalet text-background text-3xl md:text-4xl lg:text-5xl">
                    {work.clientName}
                    <span className={`inline-block ml-2 md:ml-4 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <ArrowRight className="w-[1.25em] h-[1.25em] -mb-2 md:-mb-4" />
                    </span>
                  </h1>
                </div>
              </div>
            </Box>

            <div className="absolute bottom-24 left-6 md:left-0 space-y-4">
              <p className="text-lg md:text-xl text-background/80 max-w-xl">
                {work.briefDescription}
              </p>
              {work.categoriesCollection?.items && work.categoriesCollection.items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {work.categoriesCollection.items.map((category) => (
                    <span
                      key={category.name}
                      className="px-3 py-1 bg-background/10 text-background rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/work/${work.slug}`} className="absolute bottom-16 right-6 md:right-0">
              <Button variant="secondary">View case study</Button>
            </Link>
          </Box>
        </div>
      </div>
    </div>
  );
}
