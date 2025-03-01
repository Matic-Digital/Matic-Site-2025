'use client';

import { Box } from '@/components/global/matic-ds';

export function FeaturedInsightSkeleton() {
  return (
    <div className="relative block h-[27.125rem] md:h-[650px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse">
      <Box
        className="absolute bottom-0 left-0 z-10 p-[1.25rem] md:px-20 md:py-16 gap-2 md:gap-8"
        direction="col"
      >
        <Box className="z-10 gap-2">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </Box>
        <Box className="" direction="col" gap={4}>
          <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </Box>
      </Box>
    </div>
  );
}

export function InsightGridItemSkeleton() {
  return (
    <Box className="w-full">
      <Box className="group block w-full flex md:flex-col items-center gap-[1rem]">
        <div className="relative mb-4 min-w-[4.3125rem] md:w-full h-[5.9375rem] md:h-[450px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <Box direction="col" gap={2}>
          <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          <div className="h-6 w-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
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
          <div key={i} className="h-9 w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-sm" />
        ))}
      </div>
      <Box className="flex items-center gap-4">
        <div className="h-9 w-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-sm" />
      </Box>
    </Box>
  );
}
