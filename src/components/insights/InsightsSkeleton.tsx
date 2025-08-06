'use client';

import { Box } from '@/components/global/matic-ds';

export function FeaturedInsightSkeleton() {
  return (
    <div className="relative block h-[27.125rem] w-full animate-pulse bg-gray-100 dark:bg-gray-800 md:h-[650px]">
      <Box
        className="absolute bottom-0 left-0 z-10 gap-2 p-[1.25rem] md:gap-8 md:px-20 md:py-16"
        direction="col"
      >
        <Box className="z-10 gap-2">
          <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </Box>
        <Box className="" direction="col" gap={4}>
          <div className="h-12 w-96 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        </Box>
      </Box>
    </div>
  );
}

export function InsightGridItemSkeleton() {
  return (
    <Box className="w-full">
      <Box className="group block flex w-full items-center gap-[1rem] md:flex-col">
        <div className="relative mb-4 h-[5.9375rem] min-w-[4.3125rem] animate-pulse bg-gray-100 dark:bg-gray-800 md:h-[450px] md:w-full" />
        <Box direction="col" gap={2}>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-6 w-64 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </Box>
      </Box>
    </Box>
  );
}

export function InsightsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Box className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <InsightGridItemSkeleton key={i} />
      ))}
    </Box>
  );
}

export function InsightsCategoriesSkeleton() {
  return (
    <Box className="mb-12 flex flex-wrap items-center justify-between gap-4">
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto whitespace-nowrap md:w-auto md:flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-sm bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
      <Box className="flex items-center gap-4">
        <div className="h-9 w-32 animate-pulse rounded-sm bg-gray-100 dark:bg-gray-800" />
      </Box>
    </Box>
  );
}
