'use client';

import { useState, useCallback } from 'react';
import type { Insight } from '@/types/contentful';

interface UseInsightsProps {
  initialInsights: Insight[];
  initialTotal: number;
  selectedCategory: string | null;
}

interface UseInsightsReturn {
  insights: Insight[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

interface InsightsResponse {
  insights: Insight[];
  total: number;
}

const PAGE_SIZE = 9;

export function useInsights({
  initialInsights,
  initialTotal,
  selectedCategory
}: UseInsightsProps): UseInsightsReturn {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasMore = insights.length < initialTotal;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/insights?page=${page + 1}&pageSize=${PAGE_SIZE}${selectedCategory ? `&category=${selectedCategory}` : ''}`
      );
      const data = (await response.json()) as InsightsResponse;

      if (Array.isArray(data.insights)) {
        setInsights((prev) => [...prev, ...data.insights]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more insights:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, selectedCategory]);

  return {
    insights,
    loadMore,
    hasMore
  };
}
