'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, Box } from '@/components/global/matic-ds';
import { getFeaturedInsight } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { InsightsGrid } from '@/components/insights/InsightsGrid';

/**
 * Insights listing page
 */
export default function InsightsPage() {
  const { data: featuredInsight, isLoading, error } = useQuery({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  console.log('Featured Insight:', featuredInsight);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  if (error) {
    console.error('Error fetching featured insight:', error);
  }

  if (isLoading) {
    return (
        <Section className="min-h-screen">
          <Container >
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
            <Box className="relative block h-[650px] w-full group">
              <Box className="relative h-full w-full overflow-hidden" direction="col">
                <div className="absolute inset-0 h-full w-full bg-gray-200" />
                <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
                  <Box className="z-10" gap={4}>
                    <h1 className="text-white text-[1.5rem]">Featured</h1>
                    <h1 className="text-white opacity-50 text-[1.5rem]">Loading...</h1>
                  </Box>
                  <Box className="" direction="col" gap={4}>
                    <h2 className="text-[2.1rem] text-white leading-[140%] max-w-lg">Loading...</h2>
                    <span className="flex items-center gap-2 text-white text-[1.7rem] font-semibold">
                      Read article <ArrowRight className="inline w-8 h-8" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Container>
            <InsightsGrid variant="default" />
          </Container>
        </Section>
    );
  }

  if (error) {
    return (
        <Section className="min-h-screen">
          <Container >
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
            <Box className="relative block h-[650px] w-full group">
              <Box className="relative h-full w-full overflow-hidden" direction="col">
                <div className="absolute inset-0 h-full w-full bg-gray-200" />
                <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
                  <Box className="z-10" gap={4}>
                    <h1 className="text-white text-[1.5rem]">Error</h1>
                    <h1 className="text-white opacity-50 text-[1.5rem]">{error.message}</h1>
                  </Box>
                  <Box className="" direction="col" gap={4}>
                    <h2 className="text-[2.1rem] text-white leading-[140%] max-w-lg">Failed to load featured insight.</h2>
                    <span className="flex items-center gap-2 text-white text-[1.7rem] font-semibold">
                      Try again <ArrowRight className="inline w-8 h-8" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Container>
            <InsightsGrid variant="default" />
          </Container>
        </Section>
    );
  }

  return (
      <Section className="min-h-screen">
        <Container >
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
              className="relative block h-[650px] w-full group"
            >
              <Box className="relative h-full w-full overflow-hidden rounded-none" direction="col">
                {featuredInsight.insightBannerImage?.url && (
                  <Image
                    src={featuredInsight.insightBannerImage.url}
                    alt={featuredInsight.title ?? 'Featured insight'}
                    width={1200}
                    height={750}
                    priority={true}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-none"
                  />
                )}
                <Box className="absolute bottom-0 left-0 z-10 px-20 py-16" direction="col" gap={8}>
                  <Box className="z-10" gap={4}>
                    <h1 className="text-white text-[1.5rem]">Featured</h1>
                    <h1 className="text-white opacity-50 text-[1.5rem]">{featuredInsight.category}</h1>
                  </Box>
                  <Box className="" direction="col" gap={4}>
                    <h2 className="text-[2.1rem] text-white leading-[140%] max-w-lg">{featuredInsight.title}</h2>
                    <span className="flex items-center gap-2 text-white text-[1.7rem] font-semibold transition-all duration-300">
                      Read article <ArrowRight className="inline w-8 h-8 transition-transform duration-300" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </Link>
          )}
        </Container>
        <Container>
          <InsightsGrid featuredInsightId={featuredInsight?.sys?.id} variant="default" />
        </Container>
      </Section>
  );
}
