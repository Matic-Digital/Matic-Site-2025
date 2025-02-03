import type { Metadata } from 'next';

import { Section, Container, Box } from '@/components/global/matic-ds';
import { InsightsClient } from './InsightsClient';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { getAllInsights, getFeaturedInsight } from '@/lib/api';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Insights | Matic',
  description: 'Latest insights and updates from Matic'
};

/**
 * Insights listing page
 */
export default async function InsightsPage() {
  const { items: insights, total } = await getAllInsights();
  const featuredInsight = await getFeaturedInsight();

  return (
    <Section className="min-h-screen">
      <Container>
        <Box direction="col" className="space-y-12">
          <Box className="" direction="col" gap={4}>
            <h2 className="">Journal</h2>
            <p className="max-w-3xl text-[1.75rem]">
              A collective expedition of ideas, business, and culture in the evolving world of
              design, AI and technology.
            </p>
          </Box>

          {featuredInsight && <FeaturedInsight insight={featuredInsight} />}

          <InsightsClient initialInsights={insights} initialTotal={total} />
        </Box>
      </Container>
    </Section>
  );
}
