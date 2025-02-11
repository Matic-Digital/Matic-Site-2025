'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@/components/global/matic-ds';
import { getAllInsights } from '@/lib/api';
import { type Insight } from '@/types';
import { ArrowRight } from 'lucide-react';

interface InsightsGridProps {
  featuredInsightId?: string;
  variant?: 'default' | 'recent';
  insights?: Insight[];
}

export function InsightsGrid({ featuredInsightId, variant = 'default', insights: initialInsights }: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ['insights'],
    queryFn: () => getAllInsights(),
    enabled: !initialInsights,
  });

  const insights = initialInsights ?? data?.items ?? [];
  const filteredInsights = insights.filter((insight: Insight) => {
    // Only filter out featured insight in default variant
    if (variant === 'default' && featuredInsightId && insight.sys.id === featuredInsightId) return false;
    if (selectedCategory === null) return true;
    return insight.category === selectedCategory;
  });

  // For recent variant, only show latest 3 insights
  const displayedInsights = variant === 'recent' 
    ? filteredInsights.slice(0, 3)
    : filteredInsights;

  return (
    <Box direction="col" className="w-full space-y-16 pt-16">
      {variant === 'default' && (
        <Box className="flex items-center justify-between">
          <Box className="flex gap-4 items-center">
            {["All", "Insights", "Design", "Technology", "Signals"].map((category) => (
              <button
                key={category}
                onClick={() => {
                  const newCategory = category === "All" ? null : category;
                  setSelectedCategory(newCategory);
                }}
                className={`rounded-none px-4 py-2 text-sm transition-colors ${
                  (category === "All" && !selectedCategory) || category === selectedCategory
                    ? 'bg-text text-base'
                    : 'border border-text text-text'
                }`}
              >
                {category}
              </button>
            ))}
          </Box>
          <Link href="/subscribe" className="flex items-center gap-2 text-sm">
            Subscribe for updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Box>
      )}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {displayedInsights.map((insight) => (
          <Box key={insight.sys.id} className="w-[375px]">
            <Link
              href={`/insights/${insight.slug}`}
              className="group"
            >
              <Box className="relative h-[450px] mb-4">
                {insight.insightBannerImage?.url && (
                  <Image
                    src={insight.insightBannerImage.url}
                    alt={insight.title}
                    fill
                    className="object-cover rounded-none border-none"
                  />
                )}
              </Box>
              <Box direction="col" gap={2}>
                <p className="text-gray-600">{insight.category}</p>
                <h3 className={`text-xl font-medium ${variant === 'recent' ? 'dark:text-base' : ''}`}>
                  {insight.title}
                </h3>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
