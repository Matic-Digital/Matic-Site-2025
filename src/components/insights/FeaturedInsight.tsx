'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Box } from '@/components/global/matic-ds';
import type { Insight } from '@/types';

interface FeaturedInsightProps {
  insight: Insight;
}

export function FeaturedInsight({ insight }: FeaturedInsightProps) {
  return (
    <Link href={`/insights/${insight.slug}`} className="group block">
      <Box className="relative h-[476px] w-[382px] mx-auto overflow-hidden">
        <Image
          src={insight.insightBannerImage?.url}
          alt={`Cover image for ${insight.title}`}
          width={382}
          height={476}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Content overlay */}
        <Box 
          direction="col" 
          className="absolute bottom-0 left-0 right-0 justify-end space-y-4 px-16 py-12 text-white"
        >
          <Box direction="col" gap={2}>
            <Box gap={4}>
              <h4 className="">Featured</h4>
              <h4 className="font-bold uppercase opacity-80">
                {insight.category}
              </h4>
            </Box>
            <h3 className="text-3xl font-light">{insight.title}</h3>
          </Box>
          <Box className="items-center gap-2 text-sm">
            <span>Read article</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
