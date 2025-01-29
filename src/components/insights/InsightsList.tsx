'use client';

import React from 'react';
import { Section } from '@/components/global/matic-ds';
import { FeaturedInsight } from '@/components/insights/FeaturedInsight';
import { InsightGrid } from '@/components/insights/InsightGrid';
import type { Insight } from '@/types/contentful';

interface InsightsListProps {
  initialInsights: Insight[];
  initialTotal: number;
  selectedCategory: string | null;
}

export function InsightsList({ initialInsights, selectedCategory }: InsightsListProps) {
  const filteredInsights = selectedCategory === null
    ? initialInsights
    : initialInsights.filter(insight => insight.category === selectedCategory);

  const featuredInsight = initialInsights.find(insight => insight.featured);
  const otherInsights = filteredInsights.filter(insight => !insight.featured);

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <InsightGrid insights={otherInsights} />
        </div>
      </div>
    </Section>
  );
}
