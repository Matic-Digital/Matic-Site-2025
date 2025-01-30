'use client';

import React from 'react';
import { Box } from '@/components/global/matic-ds';
import { useInsights } from '@/hooks/useInsights';
import { InsightCard } from './InsightCard';
import { Button } from '@/components/ui/button';
import type { Insight } from '@/types/contentful';

interface InsightsListProps {
  initialInsights: Insight[];
  initialTotal: number;
  selectedCategory: string | null;
  invertTheme?: boolean;
}

export function InsightsList({ 
  initialInsights,
  initialTotal,
  selectedCategory,
  invertTheme = false 
}: InsightsListProps) {
  const { insights, loadMore, hasMore } = useInsights({
    initialInsights,
    initialTotal,
    selectedCategory
  });

  return (
    <Box direction="col" className="space-y-8">
      <Box cols={{ sm: 1, md: 2, lg: 3 }} gap={8}>
        {insights.map((insight) => (
          <InsightCard 
            key={insight.sys.id} 
            insight={insight} 
            invertTheme={invertTheme}
          />
        ))}
      </Box>
      {hasMore && (
        <Box className="justify-center">
          <Button 
            onClick={loadMore} 
            variant="outline" 
            size="lg"
            className={invertTheme ? "text-background border-background hover:bg-background/10" : undefined}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
