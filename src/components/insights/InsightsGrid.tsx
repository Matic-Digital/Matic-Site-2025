'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@/components/global/matic-ds';
import { getAllInsights } from '@/lib/api';
import { type Insight } from '@/types';
import { ArrowRight, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface InsightsGridProps {
  featuredInsightId?: string;
  variant?: 'default' | 'recent';
  insights?: Insight[];
}

export function InsightsGrid({ featuredInsightId, variant = 'default', insights: initialInsights }: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  // Fetch first batch of insights
  const { data: firstBatch } = useQuery({
    queryKey: ['insights', 0],
    queryFn: () => getAllInsights(9, {}, 0),
    enabled: !initialInsights,
  });

  // Fetch second batch of insights
  const { data: secondBatch } = useQuery({
    queryKey: ['insights', 1],
    queryFn: () => getAllInsights(9, {}, 9),
    enabled: !initialInsights && !!firstBatch,
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
        if (variant === 'default' && featuredInsightId && insight.sys.id === featuredInsightId) return false;
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
  const displayedInsights = variant === 'recent' 
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
          <Box className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm border border-text px-4 py-2">
                Sort by: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                <ArrowUpDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="!min-w-[8rem] !rounded-none !border !border-text !bg-base !p-0 !text-sm !shadow-none !overflow-hidden"
              >
                <DropdownMenuItem 
                  onClick={() => setSortOrder('newest')}
                  className={cn(
                    "!rounded-none !cursor-pointer !m-0 !text-text !bg-transparent !px-3 !py-1.5 transition-colors duration-200",
                    sortOrder === 'newest' 
                      ? '!bg-transparent !text-text' 
                      : 'hover:!bg-surface0 focus:!bg-surface0 active:!bg-surface1'
                  )}
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder('oldest')}
                  className={cn(
                    "!rounded-none !cursor-pointer !m-0 !text-text !bg-transparent !px-3 !py-1.5 transition-colors duration-200",
                    sortOrder === 'oldest' 
                      ? '!bg-transparent !text-text' 
                      : 'hover:!bg-surface0 focus:!bg-surface0 active:!bg-surface1'
                  )}
                >
                  Oldest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Box>
        </Box>
      )}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {displayedInsights.map((insight) => (
          <Box key={insight.sys.id} className="w-full">
            <Link
              href={`/insights/${insight.slug}`}
              className="group block w-full"
            >
              <Box className="relative h-[450px] mb-4 overflow-hidden">
                {insight.insightBannerImage?.url && (
                  <Image
                    src={insight.insightBannerImage.url}
                    alt={insight.title}
                    fill
                    className="object-cover rounded-none border-none !transition-transform group-hover:scale-105"
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
      {variant === 'default' && totalPages > 1 && (
        <Box className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="border border-text text-text hover:bg-text hover:text-base disabled:opacity-50"
          >
            Previous
          </Button>
          <Box className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "min-w-[40px] border border-text",
                  page === currentPage 
                    ? "bg-text text-base" 
                    : "text-text hover:bg-text hover:text-base"
                )}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="border border-text text-text hover:bg-text hover:text-base disabled:opacity-50"
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
