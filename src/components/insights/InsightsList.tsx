'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

// UI Components
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

import { Box } from '@/components/global/matic-ds';
import { InsightCard } from '@/components/insights/InsightCard';

// Types
import { type Insight } from '@/types';

/** Props for the main InsightsList component */
interface InsightsListProps {
  /** Initial insights provided by server for first render */
  initialInsights: Insight[];
  /** Total number of insights available */
  initialTotal?: number;
  /** Whether to show pagination controls */
  showPagination?: boolean;
  /** Number of insights per page (only needed when showPagination is true) */
  perPage?: number;
}

/**
 * Loading skeleton component for insights
 */
function InsightSkeleton() {
  return (
    <Card className="h-full overflow-hidden transition-colors">
      <CardContent className="overflow-hidden p-0">
        <Skeleton className="aspect-[4/3] w-full object-cover" />
      </CardContent>
      <CardHeader>
        <Skeleton className="line-clamp-2 h-6 w-3/4" />
        <CardFooter className="px-0 pt-2">
          <div className="flex flex-col gap-1 text-xs">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

/**
 * Loading state component showing multiple skeletons
 */
function LoadingState() {
  return (
    <div
      className={cn('grid gap-4 sm:grid-cols-2', {
        'lg:grid-cols-3': true
      })}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <InsightSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Main component for displaying a paginated list of insights
 */
export function InsightsList({
  initialInsights,
  initialTotal,
  showPagination = true,
  perPage = 6
}: InsightsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [preloadedSlugs, setPreloadedSlugs] = useState<string[]>([]);
  const [isLoading] = useState(false);

  // Calculate total pages
  const totalPages = initialTotal ? Math.ceil(initialTotal / perPage) : 1;

  // Handle insight hover for preloading
  const handleInsightHover = (slug: string) => {
    if (!preloadedSlugs.includes(slug)) {
      setPreloadedSlugs((prev) => [...prev, slug]);
      // Here you could add preloading logic if needed
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <div
        className={cn('grid gap-4 sm:grid-cols-2', {
          'lg:grid-cols-3': perPage >= 3
        })}
      >
        {initialInsights.map((insight) => (
          <InsightCard
            key={insight.sys.id}
            insight={insight}
            onMouseEnter={handleInsightHover}
          />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <Box className="items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                  className={cn({ 'pointer-events-none opacity-50': currentPage === 1 })}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                  }}
                  className={cn({ 'pointer-events-none opacity-50': currentPage === totalPages })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Box>
      )}
    </div>
  );
}
