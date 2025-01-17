"use client";

import { useQuery } from "@tanstack/react-query";
import { type Insight } from "@/types";
import { getInsight, getAllInsights } from "@/lib/api";

/**
 * Query configuration for fetching a single insight
 * Extracted as a separate function to enable prefetching and reuse
 *
 * @param slug - URL-friendly identifier for the insight
 * @param isDraftMode - Whether to fetch draft insight
 * @returns React Query options object with query key and fetch function
 * @throws Error if insight is not found
 */
export const insightQueryOptions = (slug: string, isDraftMode?: boolean) => ({
  queryKey: ["insight", slug, isDraftMode] as const,
  queryFn: async (): Promise<Insight> => {
    const insight = await getInsight(slug, isDraftMode);
    if (!insight) {
      throw new Error("Insight not found");
    }
    return insight;
  },
});

/**
 * Custom hook for fetching and managing a single insight
 *
 * @param slug - URL-friendly identifier for the insight
 * @param isDraftMode - Whether to fetch draft insight
 * @returns Query result object containing insight data and loading state
 */
export const useGetInsight = (slug: string, isDraftMode?: boolean) => {
  return useQuery(insightQueryOptions(slug, isDraftMode));
};

/**
 * Query configuration for fetching a paginated list of insights
 *
 * @param limit - Number of insights per page
 * @param isDraftMode - Whether to fetch draft insights
 * @param skip - Number of insights to skip (for pagination)
 * @returns React Query options object with query key and fetch function
 */
export const insightsListQueryOptions = (
  limit?: number,
  isDraftMode?: boolean,
  skip?: number
) => ({
  queryKey: ["insights", { limit, isDraftMode, skip }] as const,
  queryFn: () => getAllInsights(limit, isDraftMode, skip),
});

/**
 * Custom hook for fetching and managing a list of insights
 *
 * @param limit - Number of insights per page
 * @param isDraftMode - Whether to fetch draft insights
 * @param skip - Number of insights to skip (for pagination)
 * @returns Query result object containing insights data and loading state
 */
export const useGetInsights = (
  limit?: number,
  isDraftMode?: boolean,
  skip?: number
) => {
  return useQuery(insightsListQueryOptions(limit, isDraftMode, skip));
};
