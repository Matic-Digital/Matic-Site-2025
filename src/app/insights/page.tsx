'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, Box } from '@/components/global/matic-ds';
import { getFeaturedInsight } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';

/**
 * Insights listing page
 */
export default function InsightsPage() {
  const { data: featuredInsight } = useQuery({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight()
  });

  return (
    <ScrollThemeTransition theme="light">
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
          {featuredInsight?.slug && (
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="relative block h-[650px] w-full"
            >
              <Box className="relative h-full w-full" direction="col">
                {featuredInsight.insightBannerImage?.url && (
                  <Image
                    src={featuredInsight.insightBannerImage.url}
                    alt={featuredInsight.title ?? 'Featured insight'}
                    fill
                    className="absolute z-0 rounded-none border-none object-cover"
                  />
                )}
                <Box className="absolute bottom-0 left-0 z-10 p-8" direction="col" gap={8}>
                  <Box className="z-10" gap={4}>
                    <h1 className="text-white">Featured</h1>
                    <h1 className="text-white opacity-50">{featuredInsight.category}</h1>
                  </Box>
                  <Box className="" direction="col" gap={4}>
                    <h2 className="text-4xl text-white">{featuredInsight.title}</h2>
                    <span className="flex items-center gap-2 text-white">
                      Read more <ArrowRight className="inline" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </Link>
          )}
        </Container>
        <Container>
          <InsightsGrid featuredInsightId={featuredInsight?.sys?.id} />
        </Container>
      </Section>
    </ScrollThemeTransition>
  );
}
