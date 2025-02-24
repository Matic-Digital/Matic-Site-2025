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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface InsightsGridProps {
  featuredInsightId?: string;
  variant?: 'default' | 'recent';
  insights?: Insight[];
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export function InsightsGrid({ featuredInsightId, variant = 'default', insights: initialInsights, scrollRef }: InsightsGridProps) {
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
        const y = scrollRef.current.getBoundingClientRect().bottom + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  };

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

  const categories = ["Insights", "Design", "Technology", "Signals"];

  return (
    <Box direction="col" className="w-full space-y-16 pt-16">
      {variant === 'default' && (
        <Box className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Box className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-sm px-4 py-2 text-sm transition-colors ${
                selectedCategory === null ? 'text-background bg-text' : 'border border-text text-text'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-sm px-4 py-2 text-sm transition-colors ${
                  selectedCategory === category ? 'bg-text text-background ' : 'border border-text text-text'
                }`}
              >
                {category}
              </button>
            ))}
          </Box>
          <Box className="flex items-center gap-4">
            <Box className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex rounded-sm items-center gap-2 text-sm border border-text px-4 py-2 font-light group">
                  Sort by <span className='font-semibold ml-1'>{sortOrder === 'newest' ? 'latest' : 'oldest'}</span>
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="!min-w-[8rem] !rounded-sm !border !border-text !bg-base !p-0 !text-sm !shadow-none !overflow-hidden"
                >
                  <DropdownMenuItem 
                    onClick={() => setSortOrder('newest')}
                    className={cn(
                      "",
                      sortOrder === 'newest' 
                        ? '' 
                        : ''
                    )}
                  >
                    latest
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOrder('oldest')}
                    className={cn(
                      "",
                      sortOrder === 'oldest' 
                        ? '' 
                        : ''
                    )}
                  >
                    oldest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Box>
          </Box>
        </Box>
      )}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {displayedInsights.map((insight, index) => {
          const col = index % 3; // For 3 columns in desktop
          const delay = col * 0.1; // 0.1s delay per column

          return (
            <motion.div
              key={insight.sys.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay
              }}
            >
              <Box className="w-full">
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
                        className="object-cover rounded-none border-none transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </Box>
                  <Box direction="col" gap={2}>
                    <p className="text-gray-600">{insight.category}</p>
                    <h3 className="text-xl font-medium text-text">
                      {insight.title}
                    </h3>
                  </Box>
                </Link>
              </Box>
            </motion.div>
          );
        })}
      </Box>
      {variant === 'default' && totalPages > 1 && (
        <Box className="flex justify-center items-center gap-4 mt-8">
          <Box className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border border-text text-text hover:bg-text hover:text-base disabled:opacity-50 w-10 h-10 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "darkblue" : "ghost"}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "min-w-[40px] border border-text",
                  page === currentPage 
                    ? "bg-text text-background hover:bg-text hover:text-background" 
                    : "text-text hover:bg-text hover:text-background"
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border border-text text-text hover:bg-text hover:text-base disabled:opacity-50 w-10 h-10 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
