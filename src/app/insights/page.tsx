'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, Box } from '@/components/global/matic-ds';
import { getFeaturedInsight } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { type Insight } from '@/types/contentful';
import React from 'react';
import { SignalsSection } from '@/components/global/SignalsSection';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { InView } from '@/components/ui/in-view';
import { BlurFade } from '@/components/magicui/BlurFade';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Insights listing page
 */
export default function InsightsPage() {
  const {
    data: featuredInsight,
    isLoading,
    error
  } = useQuery<Insight | null, Error>({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const featuredInsightRef = React.useRef<HTMLDivElement>(null);
  const insightsGridRef = React.useRef<HTMLDivElement>(null);

  console.log('Featured Insight:', featuredInsight);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  if (error) {
    console.error('Error fetching featured insight:', error);
  }

  if (isLoading) {
    return (
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" gap={8}>
            <Box direction="col" gap={4}>
              <h1 className="text-[2rem] font-medium md:text-[3rem]">Journal</h1>
              <p className="max-w-2xl text-[1.125rem] leading-relaxed md:text-[1.25rem]">
                A collective expedition of ideas, business, and culture in the evolving world of
                design, AI and technology.
              </p>
            </Box>
          </Box>
        </Container>
        <Container className="mt-12">
          <div ref={featuredInsightRef} className="group relative block h-[650px] w-full">
            <Box className="relative h-full w-full overflow-hidden" direction="col">
              <Skeleton className="h-full w-full" />
              <div className="absolute inset-0 h-full w-full bg-gray-200" />
              <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
                <Box className="z-10" gap={4}>
                  <Skeleton className="mb-2 h-12 w-96" /> {/* Title */}
                  <Skeleton className="h-6 w-24" /> {/* Featured text */}
                </Box>
                <Box className="" direction="col" gap={4}>
                  <Skeleton className="mb-2 h-12 w-96" /> {/* Title */}
                  <Skeleton className="h-6 w-24" /> {/* Featured text */}
                </Box>
              </Box>
            </Box>
          </div>
        </Container>
        <Container>
          <div ref={insightsGridRef} className="mt-12">
            <InsightsGrid scrollRef={insightsGridRef} variant="default" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" gap={8}>
            <Box direction="col" gap={4}>
              <h1 className="text-[2rem] font-medium md:text-[3rem]">Journal</h1>
              <p className="max-w-2xl text-[1.125rem] leading-relaxed md:text-[1.25rem]">
                A collective expedition of ideas, business, and culture in the evolving world of
                design, AI and technology.
              </p>
            </Box>
          </Box>
        </Container>
        <Container className="mt-12">
          <div ref={featuredInsightRef} className="group relative block h-[650px] w-full">
            <Box className="relative h-full w-full overflow-hidden" direction="col">
              <div className="absolute inset-0 h-full w-full bg-gray-200" />
              <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
                <Box className="z-10" gap={4}>
                  <h1 className="text-[1.5rem] text-white">Error</h1>
                  <h1 className="text-[1.5rem] text-white opacity-50">{error.message}</h1>
                </Box>
                <Box className="" direction="col" gap={4}>
                  <h2 className="max-w-lg text-[2.1rem] leading-[140%] text-white">
                    Failed to load featured insight.
                  </h2>
                  <span className="flex items-center gap-2 text-[1.7rem] font-semibold text-white">
                    Try again <ArrowRight className="inline h-8 w-8" />
                  </span>
                </Box>
              </Box>
            </Box>
          </div>
        </Container>
        <Container>
          <div ref={insightsGridRef} className="mt-12">
            <InsightsGrid scrollRef={insightsGridRef} variant="default" />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" gap={8}>
            <Box direction="col" gap={4}>
              <h1 className="text-[2rem] font-medium md:text-[3rem]">Journal</h1>
              <p className="max-w-2xl text-[1.125rem] leading-relaxed md:text-[1.25rem]">
                A collective expedition of ideas, business, and culture in the evolving world of
                design, AI and technology.
              </p>
            </Box>
          </Box>
        </Container>
        <Container className="mt-12">
          {featuredInsight && (
            <div ref={featuredInsightRef} className="group relative block h-[650px] w-full">
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
        </Container>
        <Container>
          <div ref={insightsGridRef} className="mt-12">
            <InsightsGrid
              scrollRef={insightsGridRef}
              variant="default"
              featuredInsightId={featuredInsight?.sys.id}
            />
          </div>
        </Container>
      </Section>
      <SignalsSection />
    </>
  );
}
