'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedInsight } from '@/lib/api';
import { type Insight } from '@/types/contentful';
import React from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import DefaultHero from '@/components/global/DefaultHero';
import { ArrowRight } from 'lucide-react';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

/**
 * Insights listing page
 */
export default function InsightsPage() {
  const { data: featuredInsight } = useQuery<Insight | null, Error>({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5
  });

  const insightsGridRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <DefaultHero
        heading="Journal"
        subheading="A collective expedition of ideas, business, and culture in the evolving world of design, AI and technology."
      />
      <Section>
        <Container className="mt-12">
          {featuredInsight && (
            <div ref={insightsGridRef} className="group relative block h-[650px] w-full">
              <Link href={`/insights/${featuredInsight.slug}`}>
                <Box className="relative h-full w-full overflow-hidden" direction="col">
                  {featuredInsight.insightBannerImage?.url && (
                    <Image
                      src={featuredInsight.insightBannerImage.url}
                      alt={featuredInsight.title}
                      fill
                      className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent" />
                  <Box
                    className="absolute bottom-0 left-0 z-10 px-20 py-16"
                    direction="col"
                    gap={8}
                  >
                    <Box className="z-10" gap={4}>
                      <h1 className="text-[1.5rem] text-white">Featured</h1>
                      <h1 className="text-[1.5rem] text-white opacity-50">
                        {featuredInsight.category}
                      </h1>
                    </Box>
                    <Box className="" direction="col" gap={4}>
                      <h2 className="max-w-lg text-[2.1rem] leading-[140%] text-white">
                        {featuredInsight.title}
                      </h2>
                      <span className="flex items-center gap-2 text-[1.7rem] font-semibold text-white">
                        Read article <ArrowRight className="inline h-8 w-8" />
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </div>
          )}
          <div className="mt-24">
            <InsightsGrid 
              featuredInsightId={featuredInsight?.sys.id} 
              scrollRef={insightsGridRef} 
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
