'use client';

import { useState } from 'react';
import { Box } from '@/components/global/matic-ds';
import { InsightsList } from '@/components/insights/InsightsList';
import { InsightFilter } from '@/components/insights/InsightFilter';
import type { Insight } from '@/types';

interface InsightsClientProps {
  initialInsights: Insight[];
  initialTotal: number;
}

export function InsightsClient({ initialInsights, initialTotal }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Box direction="col" gap={8}>
      <InsightFilter selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
      <InsightsList 
        initialInsights={initialInsights} 
        initialTotal={initialTotal} 
        selectedCategory={selectedCategory}
      />
    </Box>
  );
}
