'use client';

import { type Work } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Box } from './matic-ds';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface WorkItemProps {
  work: Work;
  isActive: boolean;
}

export function WorkItem({ work, isActive }: WorkItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: isActive ? 1 : 0.5, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100
      }}
      className={`relative min-h-screen w-full ${isActive ? 'opacity-100' : 'opacity-50'} `}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {work.featuredImage?.url && (
          <Image src={work.featuredImage.url} alt={work.clientName} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-[95rem] px-6 md:px-12 lg:px-24">
          <Box
            direction="col"
            className="relative min-h-screen w-full justify-between md:justify-center"
          >
            <Box direction="col" className="gap-2">
              <div className="relative">
                <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
                  <h1 className="font-chalet text-3xl text-background md:text-4xl lg:text-5xl">
                    {work.clientName}
                    <span
                      className={`ml-2 inline-block md:ml-4 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ArrowRight className="-mb-2 h-[1.25em] w-[1.25em] md:-mb-4" />
                    </span>
                  </h1>
                </div>
              </div>
            </Box>

            <div className="absolute bottom-24 left-6 space-y-4 md:left-0">
              <p className="max-w-xl text-lg text-background/80 md:text-xl">
                {work.briefDescription}
              </p>
              {work.categoriesCollection?.items && work.categoriesCollection.items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {work.categoriesCollection.items.map((category) => (
                    <span
                      key={category.name}
                      className="rounded-full bg-background/10 px-3 py-1 text-sm text-background"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/work/${work.slug}`} className="absolute bottom-16 right-6 md:right-0">
              <Button variant="inverted">View case study</Button>
            </Link>
          </Box>
        </div>
      </div>
    </motion.div>
  );
}
