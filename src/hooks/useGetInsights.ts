'use client';

import { useQuery } from '@tanstack/react-query';
import type { Insight } from '@/types/contentful';
import { getInsight, getInsights } from '@/lib/api';

/**
 * Custom hook to fetch a single insight by slug
 * @param slug The slug of the insight to fetch
 * @param isDraftMode Whether to fetch draft insights
 */
interface UseGetInsightOptions {
  slug: string;
  isDraftMode?: boolean;
}

export function useGetInsight({ slug, isDraftMode = false }: UseGetInsightOptions) {
  return useQuery({
    queryKey: ['insight', slug, isDraftMode] as const,
    queryFn: async (): Promise<Insight> => {
      const insight = await getInsight(slug, { preview: isDraftMode });
      if (!insight) {
        throw new Error('Insight not found');
      }
      return insight;
    }
  });
}

/**
 * Custom hook to fetch all insights with pagination
 * @param limit The number of insights to fetch per page
 * @param skip The number of insights to skip
 * @param isDraftMode Whether to fetch draft insights
 */
interface UseGetInsightsOptions {
  limit?: number;
  skip?: number;
  isDraftMode?: boolean;
}

export function useGetInsights({
  limit = 6,
  skip = 0,
  isDraftMode = false
}: UseGetInsightsOptions = {}) {
  return useQuery({
    queryKey: ['insights', limit, skip, isDraftMode] as const,
    queryFn: async () => {
      return getInsights(limit, { skip }, isDraftMode);
    }
  });
}
