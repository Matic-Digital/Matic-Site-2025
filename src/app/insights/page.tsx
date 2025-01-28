import type { Metadata } from 'next';

import { Section, Container } from '@/components/global/matic-ds';
import { InsightsList } from '@/components/insights/InsightsList';
import { getAllInsights } from '@/lib/api';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Insights | Matic',
  description: 'Explore our latest insights and thought leadership'
};

/**
 * Insights listing page
 */
export default async function InsightsPage() {
  const { items: insights, total } = await getAllInsights();

  return (
    <Section>
      <Container>
        <h2 className="">Latest Insights</h2>
        <InsightsList initialInsights={insights} initialTotal={total} />
      </Container>
    </Section>
  );
}