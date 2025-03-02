'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedInsight } from '@/lib/api';
import { type Insight } from '@/types/contentful';
import React, { Suspense } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import DefaultHero from '@/components/global/DefaultHero';
import { ArrowRight } from 'lucide-react';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { motion } from 'framer-motion';
import { FeaturedInsightSkeleton, InsightsCategoriesSkeleton, InsightsGridSkeleton } from '@/components/insights/InsightsSkeleton';

/**
 * Insights listing page
 */
function FeaturedInsight() {
  const { data: featuredInsight, isLoading } = useQuery<Insight | null, Error>({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return <FeaturedInsightSkeleton />;
  if (!featuredInsight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="group relative block h-[27.125rem] md:h-[650px] w-full"
    >
      <Link href={`/insights/${featuredInsight.slug}`} className=''>
        <Box className="relative h-full w-full overflow-hidden" direction="col">
          {featuredInsight.insightBannerImage?.url && (
            <Image
              src={featuredInsight.insightBannerImage.url}
              alt={featuredInsight.title}
              fill
              className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent" 
          />
          <Box
            className="absolute bottom-0 left-0 z-10 p-[1.25rem] md:px-20 md:py-16 gap-2 md:gap-8"
            direction="col"
          >
            <Box className="z-10 gap-2">
              <h1 className="text-base md:text-[1.5rem] text-white">Featured</h1>
              <h1 className="text-base md:text-[1.5rem] text-white opacity-50">
                {featuredInsight.category}
              </h1>
            </Box>
            <Box className="" direction="col" gap={4}>
              <h2 className="max-w-lg text-[1.75rem] md:text-[2.1rem] tracking-[-0.0525rem] leading-[140%] text-white font-medium">
                {featuredInsight.title}
              </h2>
              <span className="flex items-center gap-2 md:text-[1.7rem] font-semibold text-white">
                Read article <ArrowRight className="inline h-4 w-4 md:h-8 md:w-8" />
              </span>
            </Box>
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
}

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
          },
          {
            percentage: 38.14,
            theme: 'dark'
          },
          {
            percentage: 65.18,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 30.48,
            theme: 'dark'
          },
          {
            percentage: 48.82,
            theme: 'blue'
          }
        ]}
      />
      <DefaultHero
        heading="Journal"
        subheading="A collective expedition of ideas, business, and culture in the evolving world of design, AI and technology."
      />
      <Section className="pt-0 bg-background dark:bg-text">
        <Container className="">
          <Suspense fallback={<FeaturedInsightSkeleton />}>
            <FeaturedInsight />
          </Suspense>
          <div className="mt-12">
            <Suspense fallback={
              <>
                <InsightsCategoriesSkeleton />
                <InsightsGridSkeleton />
              </>
            }>
              <Suspense fallback={<InsightsGridSkeleton />}>
                <InsightsGrid 
                  variant="default" 
                  scrollRef={insightsGridRef}
                  featuredInsightId={featuredInsight?.sys.id}
                />
              </Suspense>
            </Suspense>
          </div>
        </Container>
      </Section>
      <Section className="bg-background dark">
        <SignalsSection />
      </Section>
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        secondaryBackgroundRoute={'/cta-secondary.svg'}
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
