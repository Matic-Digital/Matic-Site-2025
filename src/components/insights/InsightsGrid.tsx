'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@/components/global/matic-ds';
import { getAllInsights } from '@/lib/api';
import { type Insight } from '@/types';
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InView } from '@/components/ui/in-view';

interface InsightsGridProps {
  featuredInsightId?: string;
  variant?: 'default' | 'recent';
  insights?: Insight[];
  scrollRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export function InsightsGrid({
  featuredInsightId,
  variant = 'default',
  insights: initialInsights,
  scrollRef,
  className
}: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add a small delay to ensure the scroll happens after the state update
    setTimeout(() => {
      if (scrollRef?.current) {
        const yOffset = -100; // Offset to account for header
        const y = scrollRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  };

  // Fetch first batch of insights
  const { data: firstBatch } = useQuery({
    queryKey: ['insights', 0],
    queryFn: () => getAllInsights(9, {}, 0),
    enabled: !initialInsights
  });

  // Fetch second batch of insights
  const { data: secondBatch } = useQuery({
    queryKey: ['insights', 1],
    queryFn: () => getAllInsights(9, {}, 9),
    enabled: !initialInsights && !!firstBatch
  });

  const insights = React.useMemo(() => {
    if (initialInsights) return initialInsights;
    if (!firstBatch) return [];
    if (!secondBatch) return firstBatch;
    return [...firstBatch, ...secondBatch];
  }, [initialInsights, firstBatch, secondBatch]);

  // Move sorting logic into a useMemo to ensure it updates when dependencies change
  const filteredInsights = React.useMemo(() => {
    const filtered = insights
      .filter((insight: Insight) => {
        // Only filter out featured insight in default variant
        if (variant === 'default' && featuredInsightId && insight.sys.id === featuredInsightId)
          return false;
        if (selectedCategory === null) return true;
        return insight.category === selectedCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.postDate).getTime();
        const dateB = new Date(b.postDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });

    return filtered;
  }, [insights, selectedCategory, featuredInsightId, variant, sortOrder]);

  // For recent variant, only show latest 3 insights
  const displayedInsights =
    variant === 'recent'
      ? filteredInsights.slice(0, 3)
      : filteredInsights.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = variant === 'recent' ? 1 : Math.ceil(filteredInsights.length / itemsPerPage);

  // Reset page if we're on a page that no longer exists
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  // Reset page when category or sort order changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder]);

  const categories = ['Insights', 'Design', 'Technology', 'Signals'];

  // Create ref for the category container
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);

  // Function to scroll to center the selected category
  const scrollToCenter = (button: HTMLButtonElement | null) => {
    if (!button || !categoryContainerRef.current) return;

    const container = categoryContainerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonWidth = button.offsetWidth;
    const buttonLeft = button.offsetLeft;

    // Calculate the scroll position that will center the button
    const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  // Effect to center the selected category when it changes
  React.useEffect(() => {
    if (selectedCategory === null) {
      const allButton = categoryContainerRef.current?.querySelector('button:first-child');
      scrollToCenter(allButton as HTMLButtonElement);
    } else {
      const selectedButton = categoryContainerRef.current?.querySelector(
        `button[data-category="${selectedCategory}"]`
      );
      scrollToCenter(selectedButton as HTMLButtonElement);
    }
  }, [selectedCategory]);

  return (
    <div className={cn('w-full', className)}>
      {variant === 'default' && (
        <Box className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div
            ref={categoryContainerRef}
            className="no-scrollbar flex w-full gap-4 overflow-x-auto md:w-auto md:flex-wrap"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm transition-colors ${
                selectedCategory === null
                  ? 'bg-text text-background'
                  : 'border border-text text-text'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                data-category={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-sm px-4 py-2 text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-text text-background'
                    : 'border border-text text-text'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <Box className="hidden items-center gap-4 md:flex">
            <Box className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="group flex items-center gap-2 rounded-sm border border-text px-4 py-2 text-sm font-light">
                  Sort by{' '}
                  <span className="ml-1 font-semibold">
                    {sortOrder === 'newest' ? 'latest' : 'oldest'}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="!bg-base !min-w-[8rem] !overflow-hidden !rounded-sm !border !border-text !p-0 !text-sm !shadow-none"
                >
                  <DropdownMenuItem
                    onClick={() => setSortOrder('newest')}
                    className={cn('', sortOrder === 'newest' ? '' : '')}
                  >
                    latest
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOrder('oldest')}
                    className={cn('', sortOrder === 'oldest' ? '' : '')}
                  >
                    oldest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Box>
          </Box>
        </Box>
      )}
      <Box className="md:mt-12 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedInsights.map((insight, index) => {
          const delay = index * 0.1; // 0.1s delay per item

          return (
            <Box className="w-full" key={insight.slug}>
              <Link 
                href={`/insights/${insight.slug}`} 
                className="group block w-full flex md:flex-col items-center gap-[1rem] text-text hover:text-text"
              >
                <Box className="relative mb-4 min-w-[4.3125rem] md:w-full h-[5.9375rem] md:h-[450px] overflow-hidden my-auto md:my-0">
                  {insight.insightBannerImage?.url && (
                    <Image
                      src={insight.insightBannerImage.url}
                      alt={insight.title}
                      fill
                      className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </Box>
                <Box direction="col" gap={2}>
                  <p className="text-[0.875rem] uppercase dark:text-maticblack">
                    {insight.category}
                  </p>
                  <p className="dark:text-maticblack">{insight.title}</p>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
      {variant === 'default' && totalPages > 1 && (
        <Box className="mt-8 flex items-center justify-center gap-4">
          <Box className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-10 w-10 border border-text p-0 text-text hover:bg-text hover:text-base disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'darkblue' : 'ghost'}
                onClick={() => handlePageChange(page)}
                className={cn(
                  'min-w-[40px] border border-text',
                  page === currentPage
                    ? 'bg-text text-background hover:bg-text hover:text-background'
                    : 'text-text hover:bg-text hover:text-background'
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-10 w-10 border border-text p-0 text-text hover:bg-text hover:text-base disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
