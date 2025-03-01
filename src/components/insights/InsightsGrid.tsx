'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getInsights } from '@/lib/api';
import { type Insight } from '@/types/contentful';
import { Box } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/magicui/BlurFade';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface InsightsGridProps {
  variant: 'default' | 'minimal' | 'recent';
  scrollRef?: React.RefObject<HTMLDivElement>;
  featuredInsightId?: string;
  className?: string;
  initialInsights?: Insight[];
}

function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categoryContainerRef
}: {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categoryContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  React.useEffect(() => {
    if (initialCategory !== selectedCategory) {
      onCategoryChange(initialCategory);
    }
  }, [initialCategory, selectedCategory, onCategoryChange]);

  return (
    <div ref={categoryContainerRef} className="no-scrollbar flex w-full gap-[0.625rem] overflow-x-auto md:w-auto md:flex-wrap">
      <button
        data-category="all"
        onClick={() => onCategoryChange(null)}
        className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm md:text-[0.875rem] leading-normal transition-colors ${
          !selectedCategory
            ? 'bg-text text-background'
            : 'border border-[#A6A7AB] text-text'
        }`}
      >
        All
      </button>
      {['Insights', 'Design', 'Technology', 'Signals'].map((category) => (
        <button
          key={category}
          data-category={category}
          onClick={() => onCategoryChange(category)}
          className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm md:text-[0.875rem] leading-normal transition-colors ${
            selectedCategory === category
              ? 'bg-text text-background'
              : 'border border-[#A6A7AB] text-text'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export function InsightsGrid({ 
  variant, 
  scrollRef, 
  featuredInsightId,
  className,
  initialInsights
}: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>('newest');
  const [page, setPage] = React.useState(1);
  const [loadedInsights, setLoadedInsights] = React.useState<Insight[]>(initialInsights ?? []);
  const itemsPerPage = variant === 'recent' ? 3 : 6;
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);

  // Function to scroll to center the selected category
  const scrollToCenter = (button: HTMLButtonElement | null) => {
    if (!button || !categoryContainerRef.current) return;

    const container = categoryContainerRef.current;
    const scrollLeft = button.offsetLeft - (container.offsetWidth - button.offsetWidth) / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    // Get the clicked button element
    const button = categoryContainerRef.current?.querySelector<HTMLButtonElement>(
      `button[data-category="${category ?? 'all'}"]`
    );
    if (button) {
      scrollToCenter(button);
    }
  };

  const { data: newInsights, isFetching } = useQuery<Insight[]>({
    queryKey: ['insights', page, variant],
    queryFn: () => getInsights(itemsPerPage, { skip: page > 1 ? (page - 1) * itemsPerPage : 0 }),
    staleTime: 1000 * 60 * 5,
    enabled: variant !== 'recent'
  });

  React.useEffect(() => {
    if (newInsights && page > 1) {
      const newUniqueInsights = newInsights.filter(
        newInsight => !loadedInsights.some(
          loadedInsight => loadedInsight.sys.id === newInsight.sys.id
        )
      );
      setLoadedInsights(prev => [...prev, ...newUniqueInsights]);
    } else if (newInsights && page === 1) {
      setLoadedInsights(newInsights);
    }
  }, [newInsights, page, loadedInsights]);

  const filteredInsights = React.useMemo(() => {
    const insights = variant === 'recent' ? initialInsights ?? [] : loadedInsights;
    
    return insights
      .filter((insight: Insight) => {
        if (featuredInsightId && insight.sys.id === featuredInsightId) return false;
        if (!selectedCategory) return true;
        return insight.category === selectedCategory;
      })
      .sort((a: Insight, b: Insight) => {
        const dateA = new Date(a.postDate).getTime();
        const dateB = new Date(b.postDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [loadedInsights, initialInsights, selectedCategory, sortOrder, featuredInsightId, variant]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div ref={scrollRef} className={cn('w-full', className)}>
      {variant === 'default' && (
        <Box className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryClick}
              categoryContainerRef={categoryContainerRef}
            />
          </Suspense>
          <Box className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-sm"
              onClick={() =>
                setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
              }
            >
              <ArrowUpDown className="h-4 w-4" />
              Sort by {sortOrder === 'newest' ? 'Oldest' : 'Newest'}
            </Button>
          </Box>
        </Box>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box className={cn(
          "grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3",
          variant === 'recent' && "lg:grid-cols-3"
        )}>
          {filteredInsights.map((insight: Insight) => (
            <BlurFade
              key={insight.sys.id}
              inView
              inViewMargin="-100px"
            >
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
            </BlurFade>
          ))}
        </Box>

        {variant === 'default' && newInsights?.length === itemsPerPage && (
          <Box className="mt-12 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={isFetching}
              variant="ghost"
              size="lg"
              className=""
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </Button>
          </Box>
        )}
      </motion.div>
    </div>
  );
}
