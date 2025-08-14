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
import { CTASection } from '@/components/global/CTASection';
import { motion } from 'framer-motion';
import {
  FeaturedInsightSkeleton,
  InsightsCategoriesSkeleton,
  InsightsGridSkeleton
} from '@/components/insights/InsightsSkeleton';

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
      className="group relative block h-[27.125rem] w-full md:h-[650px]"
    >
      <Link href={`/insights/${featuredInsight.slug}`} className="">
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
            className="absolute bottom-0 left-0 z-10 gap-2 p-[1.25rem] md:gap-8 md:px-20 md:py-16"
            direction="col"
          >
            <Box className="z-10 gap-2">
              <p className="text-base text-white md:text-[1.5rem]">Featured</p>
              <p className="text-base text-white opacity-50 md:text-[1.5rem]">
                {featuredInsight.category}
              </p>
            </Box>
            <Box className="" direction="col" gap={4}>
              <h2 className="max-w-lg text-[1.75rem] font-medium leading-[140%] tracking-[-0.0525rem] text-white md:text-[2.1rem]">
                {featuredInsight.title}
              </h2>
              <span className="flex items-center gap-2 font-semibold text-white md:text-[1.7rem]">
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
            percentage: 48.7,
            theme: 'dark'
          },
          {
            percentage: 79.98,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 62.56,
            theme: 'dark'
          },
          {
            percentage: 75.74,
            theme: 'blue'
          }
        ]}
      />
      <DefaultHero
        heading="Journal"
        subheading="A collective expedition of ideas, business, and culture in the evolving world of design, AI and technology."
      />
      <Section className="bg-background pt-0 dark:bg-text">
        <Container className="">
          <Suspense fallback={<FeaturedInsightSkeleton />}>
            <FeaturedInsight />
          </Suspense>
          <div className="mt-12">
            <Suspense
              fallback={
                <>
                  <InsightsCategoriesSkeleton />
                  <InsightsGridSkeleton />
                </>
              }
            >
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
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        secondaryBackgroundRoute={
          'https://images.ctfassets.net/17izd3p84uup/7g1uw9drZsF4qTlDnTajAa/a8f9b2076e1764239f8dab576b11b2d9/image_583.svg'
        }
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
