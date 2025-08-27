'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getInsights, getInsightCategories } from '@/lib/api';
import { type Insight } from '@/types/contentful';
import { Box } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/magicui/BlurFade';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

interface InsightsGridProps {
  variant: 'default' | 'minimal' | 'recent';
  scrollRef?: React.RefObject<HTMLDivElement>;
  featuredInsightId?: string;
  className?: string;
  initialInsights?: Insight[];
}

function slugifyCategory(category?: string) {
  return (category ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function InsightsGrid({
  variant,
  scrollRef,
  featuredInsightId: _featuredInsightId,
  className,
  initialInsights
}: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [loadedInsights, setLoadedInsights] = React.useState<Insight[]>(initialInsights ?? []);
  const itemsPerPage = variant === 'recent' ? 7 : 6;
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch categories dynamically
  const { data: categories = [] } = useQuery<string[], Error>({
    queryKey: ['insightCategories'],
    queryFn: () => getInsightCategories(),
    staleTime: 1000 * 60 * 10
  });

  // Build slug -> name map from fetched categories
  const slugToName = React.useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((name) => {
      map[slugifyCategory(name)] = name;
    });
    return map;
  }, [categories]);

  // Derive category info from the current route/query
  const segments = React.useMemo(() => (pathname || '').split('/').filter(Boolean), [pathname]);
  const categorySlugInPath = React.useMemo(
    () => (segments[0] === 'blog' ? (segments[1] ?? null) : null),
    [segments]
  );
  const hasCategoryInPath = !!categorySlugInPath;
  const resolvedCategoryName = React.useMemo(() => {
    if (categorySlugInPath) {
      return slugToName[categorySlugInPath] ?? null;
    }
    return searchParams?.get('category') ?? null;
  }, [categorySlugInPath, slugToName, searchParams]);
  // Wait to fetch until either there's no category in the path, or the slug has resolved to a name
  const categoryReady =
    !hasCategoryInPath || !!(categorySlugInPath && slugToName[categorySlugInPath]);

  React.useEffect(() => {
    // When the route changes or categories resolve, set the selected category
    setSelectedCategory(resolvedCategoryName);
    // Reset page and loaded items when category changes
    setPage(1);
    setLoadedInsights([]);
    setHasMoreToLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, resolvedCategoryName]);

  // Function to scroll to center the selected category (optional enhancement)
  const scrollToCenter = () => {
    // On route change, try to center the active chip if present
    if (!categoryContainerRef.current) return;
    const active = categoryContainerRef.current.querySelector<HTMLElement>('a.bg-text');
    if (active) {
      const container = categoryContainerRef.current;
      const scrollLeft = active.offsetLeft - (container.offsetWidth - active.offsetWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    scrollToCenter();
  }, [selectedCategory]);

  const { data: insightsResponse, isFetching } = useQuery<{
    items: Insight[];
    total: number;
  }>({
    queryKey: ['insights', page, variant, itemsPerPage, selectedCategory, _featuredInsightId],
    queryFn: () => {
      // Only overfetch on category pages, where the top item is a non-featured post
      // that will be excluded by _featuredInsightId. On the landing page, the top item
      // is a global featured (featured: true) which is already excluded by the query,
      // so no overfetch is needed there.
      const needsOverfetch = page === 1 && _featuredInsightId && hasCategoryInPath;
      const effectiveItemsPerFetch = needsOverfetch ? itemsPerPage + 1 : itemsPerPage;

      return getInsights(effectiveItemsPerFetch, {
        // Skip is still based on displayed page size to prevent duplication between pages
        skip: page > 1 ? (page - 1) * itemsPerPage : 0,
        where: {
          featured: false,
          ...(selectedCategory ? { category: selectedCategory } : {})
        }
      });
    },
    staleTime: 1000 * 60 * 5,
    enabled: variant !== 'recent' && categoryReady
  });

  // Track if there are more insights to load
  const [hasMoreToLoad, setHasMoreToLoad] = React.useState(false);

  React.useEffect(() => {
    if (insightsResponse) {
      const { items: newInsights, total } = insightsResponse;

      if (page === 1) {
        setLoadedInsights(newInsights);
      } else {
        setLoadedInsights((prev) => {
          const newUniqueInsights = newInsights.filter(
            (newInsight) =>
              !prev.some((loadedInsight) => loadedInsight.sys.id === newInsight.sys.id)
          );
          return [...prev, ...newUniqueInsights];
        });
      }

      // Determine if there are more pages based on total and itemsPerPage
      setHasMoreToLoad(page * itemsPerPage < total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insightsResponse, page]);

  const filteredInsights = React.useMemo(() => {
    // Get base insights array
    let insights = variant === 'recent' ? (initialInsights ?? []) : loadedInsights;

    // Apply category filter
    if (selectedCategory) {
      insights = insights.filter((insight) => insight.category === selectedCategory);
    }

    // Exclude the featured insight id if provided
    if (_featuredInsightId) {
      insights = insights.filter((insight) => insight.sys.id !== _featuredInsightId);
    }

    // Sorting is handled on the server (postDate_DESC)

    // Apply itemsPerPage limit for 'recent' variant
    if (variant === 'recent') {
      insights = insights.slice(0, itemsPerPage);
    }

    return insights;
  }, [
    variant,
    initialInsights,
    loadedInsights,
    selectedCategory,
    itemsPerPage,
    _featuredInsightId
  ]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div ref={scrollRef} className={cn('w-full', className)}>
      {/* Category tabs moved to separate component rendered by the page */}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box
          className={cn(
            'grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3',
            variant === 'recent' && 'lg:grid-cols-3'
          )}
        >
          {filteredInsights.map((insight: Insight) => (
            <BlurFade key={insight.sys.id} inView inViewMargin="-100px">
              <Box className="w-full" key={insight.slug}>
                <Link
                  href={`/blog/${slugifyCategory(insight.category)}/${insight.slug}`}
                  className="group block flex w-full flex-col items-center gap-[1rem] text-text hover:text-text"
                >
                  <Box className="relative my-auto mb-4 h-[24rem] w-full overflow-hidden md:my-0 md:h-[450px]">
                    {insight.insightBannerImage?.url && (
                      <Image
                        src={insight.insightBannerImage.url}
                        alt={insight.title}
                        fill
                        className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </Box>
                  <Box direction="col" gap={2} className="w-full md:text-left">
                    <p className="text-[0.6875rem] uppercase dark:text-maticblack">
                      {insight.category}
                    </p>
                    <p className="text-[0.875rem] dark:text-maticblack">{insight.title}</p>
                  </Box>
                </Link>
              </Box>
            </BlurFade>
          ))}
        </Box>

        {variant === 'default' && !isFetching && filteredInsights.length === 0 && (
          <Box className="mt-8 text-center text-sm text-text/70">
            No insights found for this category.
          </Box>
        )}

        {variant === 'default' && hasMoreToLoad && (
          <>
            <Box className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="rounded-sm border border-[#A6A7AB] px-[1rem] py-[0.75rem] text-sm leading-normal text-text transition-colors md:text-[0.875rem]"
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            </Box>
            {/* Divider below Load More */}
            <div className="mt-[2rem] h-[0.0625rem] w-full bg-[#D9D9D9]" />
          </>
        )}

        {/* Removed per-category latest section; now lives on blog landing page */}
      </motion.div>
    </div>
  );
}
