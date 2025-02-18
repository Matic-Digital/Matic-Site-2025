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
          <Box direction="col" className="space-y-12">
            <Box className="" direction="col" gap={4}>
              <h1 className="text-5xl font-medium">Journal</h1>
              <p className="max-w-lg">
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
                  <h1 className="text-[1.5rem] text-white">Featured</h1>
                  <h1 className="text-[1.5rem] text-white opacity-50">Loading...</h1>
                </Box>
                <Box className="" direction="col" gap={4}>
                  <h2 className="max-w-lg text-[2.1rem] leading-[140%] text-white">Loading...</h2>
                  <span className="flex items-center gap-2 text-[1.7rem] font-semibold text-white">
                    Read article <ArrowRight className="inline h-8 w-8" />
                  </span>
                </Box>
              </Box>
            </Box>
          </div>
        </Container>
        <Container>
          <InsightsGrid scrollRef={featuredInsightRef} variant="default" />
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" className="space-y-12">
            <Box className="" direction="col" gap={4}>
              <h1 className="text-5xl font-medium">Journal</h1>
              <p className="max-w-lg">
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
          <InsightsGrid scrollRef={featuredInsightRef} variant="default" />
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
          },
          {
            percentage: 77.84,
            theme: 'dark'
          }
        ]}
      />
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" className="space-y-12">
            <Box className="" direction="col" gap={4}>
              <h1 className="text-5xl font-medium">Journal</h1>
              <p className="max-w-lg">
                A collective expedition of ideas, business, and culture in the evolving world of
                design, AI and technology.
              </p>
            </Box>
          </Box>
        </Container>
        <Container className="mt-12">
          {featuredInsight?.slug && featuredInsight?.title && (
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group relative block h-[650px] w-full"
            >
              <div
                ref={featuredInsightRef}
                className="relative flex h-full w-full flex-col overflow-hidden rounded-none"
              >
                {featuredInsight.insightBannerImage?.url && (
                  <Image
                    src={featuredInsight.insightBannerImage.url}
                    alt={featuredInsight.title ?? 'Featured insight'}
                    width={1200}
                    height={750}
                    priority={true}
                    className="absolute inset-0 h-full w-full rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
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
                    <span className="flex items-center gap-2 text-[1.7rem] font-semibold text-white transition-all duration-300">
                      Read article{' '}
                      <ArrowRight className="inline h-8 w-8 transition-transform duration-300" />
                    </span>
                  </Box>
                </Box>
              </div>
            </Link>
          )}
        </Container>
        <Container>
          <InsightsGrid
            featuredInsightId={featuredInsight?.sys?.id}
            scrollRef={featuredInsightRef}
            variant="default"
          />
        </Container>
      </Section>
      <div className="dark">
        <SignalsSection logoRoute={'/signalsLogo.svg'} tagline={'Signals is a newsletter you’ll actually want to read'} subheader={'Sharp takes on business, design, and tech. No fluff, just the takeaways you need.'} />
      </div>
    </>
  );
}
