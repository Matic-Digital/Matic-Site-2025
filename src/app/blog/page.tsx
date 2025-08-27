'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { getFeaturedInsight, getInsightCategories, getInsights } from '@/lib/api';
import { type Insight } from '@/types/contentful';
import React, { Suspense } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import DefaultHero from '@/components/global/DefaultHero';
import { ArrowRight } from 'lucide-react';
import { CTASection } from '@/components/global/CTASection';
import { motion } from 'framer-motion';
import {
  FeaturedInsightSkeleton,
  InsightsCategoriesSkeleton,
  InsightsGridSkeleton
} from '@/components/insights/InsightsSkeleton';
import { InsightsCategories } from '@/components/insights/InsightsCategories';

// Avoid SSR for InsightsGrid to prevent hydration mismatches when categories change
const InsightsGrid = dynamic(
  () => import('@/components/insights/InsightsGrid').then((m) => m.InsightsGrid),
  { ssr: false, loading: () => <InsightsGridSkeleton /> }
);

function slugifyCategory(category?: string) {
  return (category ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Switch-based descriptions per category; edit copy as needed
function getCategoryDescription(category: string): string {
  const slug = slugifyCategory(category);
  switch (slug) {
    case 'insights':
      return 'Observations, opinions, and thinking from the Matic Team';
    case 'branding':
      return 'Discover fresh thinking on B2B branding, identity and strategic edge';
    case 'design':
      return 'Smart moves in design systems, interfaces, and typography';
    case 'technology':
      return 'Unpacking the future of web development, headless CMS, and AI';
    case 'teams':
      return 'Inside talent strategies for growth—fractional, dedicated, and fluid';
    case 'signals':
      return 'Spotlight on business, design & technology happenings and what they mean';
    default:
      return `Explore the latest from ${category}.`;
  }
}

function SignalsThreeGrid({ categoryName }: { categoryName: string }) {
  const { data } = useQuery({
    queryKey: ['signalsTop3'],
    queryFn: async () => {
      const res = await getInsights(3, { where: { category: categoryName, featured: false } });
      return res.items ?? [];
    },
    staleTime: 1000 * 60 * 5
  });

  const items = data ?? [];
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((insight) => {
        const catSlug = slugifyCategory(categoryName);
        return (
          <Box className="w-full" key={insight.slug}>
            <Link
              href={`/blog/${catSlug}/${insight.slug}`}
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
                <p className="text-[0.875rem] font-semibold uppercase text-maticblack">
                  {categoryName}
                </p>
                <p className="text-[1.25rem] text-black">{insight.title}</p>
                {insight.postDate && (
                  <p className="text-[1rem] text-[#A4A5B3]">
                    {new Date(insight.postDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </Box>
            </Link>
          </Box>
        );
      })}
    </div>
  );
}

function LatestByCategorySection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Only show on base /blog (no category path segment and no ?category= query)
  const segments = (pathname || '').split('/').filter(Boolean);
  const hasCategoryInPath = segments[0] === 'blog' && segments.length > 1;
  const hasCategoryInQuery = !!searchParams?.get('category');
  const showOnLanding = !(hasCategoryInPath || hasCategoryInQuery);

  const { data: categories = [] } = useQuery<string[], Error>({
    queryKey: ['insightCategories'],
    queryFn: () => getInsightCategories(),
    staleTime: 1000 * 60 * 10,
    enabled: showOnLanding
  });

  const { data: latestByCategory = [] } = useQuery<
    { category: string; insight: Insight | null }[],
    Error
  >({
    queryKey: ['latestByCategory', categories],
    queryFn: async () => {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const res = await getInsights(1, { where: { category: cat, featured: false } });
          return { category: cat, insight: res.items?.[0] ?? null };
        })
      );
      return results;
    },
    enabled: showOnLanding && categories.length > 0,
    staleTime: 1000 * 60 * 5
  });

  if (!showOnLanding || !latestByCategory.length) return null;

  return (
    <div className="mt-20">
      <div className="flex flex-col gap-12">
        {latestByCategory.map(({ category, insight }) => {
          if (!insight) return null;
          const catSlug = slugifyCategory(category);
          const description = getCategoryDescription(category);
          return (
            <React.Fragment key={category}>
              <div className="mb-4 flex flex-col items-start justify-between gap-3 md:mb-[3rem] md:flex-row md:items-center">
                <div className="max-w-3xl">
                  <h4 className="text-3xl font-bold text-maticblack md:text-4xl md:font-normal">
                    {category}
                  </h4>
                  {description && <p className="text-maticblack md:text-2xl">{description}</p>}
                </div>
                <Link
                  href={`/blog/${catSlug}`}
                  className="font-semibold hover:text-blue md:text-2xl"
                >
                  View {category}
                </Link>
              </div>
              {catSlug === 'signals' ? (
                <SignalsThreeGrid categoryName={category} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="group relative block h-[27.125rem] w-full md:h-[650px]"
                >
                  <Link href={`/blog/${catSlug}/${insight.slug}`} className="">
                    <Box className="relative h-full w-full overflow-hidden" direction="col">
                      {insight.insightBannerImage?.url && (
                        <Image
                          src={insight.insightBannerImage.url}
                          alt={insight.title}
                          fill
                          className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent"
                      />
                      <Box
                        className="absolute bottom-0 left-0 z-10 gap-2 p-[1.25rem] md:gap-8 md:px-20 md:py-16"
                        direction="col"
                      >
                        <Box className="z-10 gap-2">
                          <p className="text-base uppercase text-white opacity-80 md:text-[1.25rem]">
                            {category}
                          </p>
                        </Box>
                        <Box className="" direction="col" gap={4}>
                          <h4 className="max-w-xl text-[1.75rem] font-medium leading-[140%] tracking-[-0.0525rem] text-white md:text-[2.1rem]">
                            {insight.title}
                          </h4>
                          <span className="mt-2 flex items-center gap-2 font-semibold text-white md:text-[1.4rem]">
                            Read article <ArrowRight className="inline h-4 w-4 md:h-7 md:w-7" />
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Insights listing page
 */
function FeaturedInsight() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch categories to resolve slug -> category name
  const { data: categories = [] } = useQuery<string[], Error>({
    queryKey: ['insightCategories'],
    queryFn: () => getInsightCategories(),
    staleTime: 1000 * 60 * 10
  });

  const slugToName = React.useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((name) => {
      map[slugifyCategory(name)] = name;
    });
    return map;
  }, [categories]);

  // Resolve category from path or query
  const segments = React.useMemo(() => (pathname || '').split('/').filter(Boolean), [pathname]);
  const categorySlugInPath = React.useMemo(
    () => (segments[0] === 'blog' ? (segments[1] ?? null) : null),
    [segments]
  );
  const resolvedCategoryName = React.useMemo(() => {
    if (categorySlugInPath) {
      return slugToName[categorySlugInPath] ?? null;
    }
    return searchParams?.get('category') ?? null;
  }, [categorySlugInPath, slugToName, searchParams]);
  const categoryReady =
    !categorySlugInPath || !!(categorySlugInPath && slugToName[categorySlugInPath]);

  // Fetch the appropriate top insight: category-most-recent when category is present, otherwise global featured
  const { data: featuredInsight, isLoading: isLoadingGlobal } = useQuery<Insight | null, Error>({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: !categorySlugInPath // only when not on a category path
  });

  const { data: categoryTopItems, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['categoryTopInsight', resolvedCategoryName],
    queryFn: () =>
      getInsights(1, {
        where: { category: resolvedCategoryName!, featured: false }
      }),
    enabled: !!resolvedCategoryName && categoryReady,
    staleTime: 1000 * 60 * 5
  });

  const topInsight: Insight | null = categorySlugInPath
    ? (categoryTopItems?.items?.[0] ?? null)
    : (featuredInsight ?? null);

  const isLoading = categorySlugInPath ? isLoadingCategory : isLoadingGlobal;

  if (isLoading) return <FeaturedInsightSkeleton />;
  if (!topInsight) return null;

  const categorySlug = slugifyCategory(topInsight.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="group relative block h-[27.125rem] w-full md:h-[650px]"
    >
      <Link href={`/blog/${categorySlug}/${topInsight.slug}`} className="">
        <Box className="relative h-full w-full overflow-hidden" direction="col">
          {topInsight.insightBannerImage?.url && (
            <Image
              src={topInsight.insightBannerImage.url}
              alt={topInsight.title}
              fill
              className="rounded-none border-none object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent"
          />
          <Box
            className="absolute bottom-0 left-0 z-10 gap-2 p-[1.25rem] md:gap-8 md:px-20 md:py-16"
            direction="col"
          >
            <Box className="z-10 gap-2">
              <p className="text-base text-white md:text-[1.5rem]">Featured</p>
              <p className="text-base text-white opacity-50 md:text-[1.5rem]">
                {topInsight.category}
              </p>
            </Box>
            <Box className="" direction="col" gap={4}>
              <h2 className="max-w-lg text-[1.75rem] font-medium leading-[140%] tracking-[-0.0525rem] text-white md:text-[2.1rem]">
                {topInsight.title}
              </h2>
              <span className="flex items-center gap-2 font-semibold text-white md:text-[1.7rem]">
                Read article <ArrowRight className="inline h-4 w-4 md:h-8 md:w-8" />
              </span>
            </Box>
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
}

export default function InsightsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Resolve category context for this page
  const { data: categories = [] } = useQuery<string[], Error>({
    queryKey: ['insightCategories'],
    queryFn: () => getInsightCategories(),
    staleTime: 1000 * 60 * 10
  });
  const slugToName = React.useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((name) => {
      map[slugifyCategory(name)] = name;
    });
    return map;
  }, [categories]);
  const segments = React.useMemo(() => (pathname || '').split('/').filter(Boolean), [pathname]);
  const categorySlugInPath = React.useMemo(
    () => (segments[0] === 'blog' ? (segments[1] ?? null) : null),
    [segments]
  );
  const resolvedCategoryName = React.useMemo(() => {
    if (categorySlugInPath) {
      return slugToName[categorySlugInPath] ?? null;
    }
    return searchParams?.get('category') ?? null;
  }, [categorySlugInPath, slugToName, searchParams]);
  const categoryReady =
    !categorySlugInPath || !!(categorySlugInPath && slugToName[categorySlugInPath]);

  // Fetch appropriate top insight to provide its ID to the grid for exclusion
  const { data: globalFeatured } = useQuery<Insight | null, Error>({
    queryKey: ['featuredInsight'],
    queryFn: () => getFeaturedInsight(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    enabled: !categorySlugInPath
  });
  const { data: categoryTop } = useQuery({
    queryKey: ['categoryTopInsight', resolvedCategoryName],
    queryFn: () =>
      getInsights(1, {
        where: { category: resolvedCategoryName!, featured: false }
      }),
    enabled: !!resolvedCategoryName && categoryReady,
    staleTime: 1000 * 60 * 5
  });
  const effectiveTop = categorySlugInPath
    ? (categoryTop?.items?.[0] ?? null)
    : (globalFeatured ?? null);

  const insightsGridRef = React.useRef<HTMLDivElement>(null);

  // Determine if we're on a category page
  const isCategory = !!categorySlugInPath;

  // Breakpoints for ScrollProgress
  const landingBreakpoints = [
    { percentage: 0, theme: 'light' as const },
    { percentage: 87, theme: 'blue' as const }
  ];
  const landingMobileBreakpoints = [
    { percentage: 0, theme: 'light' as const },
    { percentage: 80, theme: 'blue' as const }
  ];

  // Category breakpoints
  const categoryBreakpoints = [
    { percentage: 0, theme: 'light' as const },
    { percentage: 65, theme: 'blue' as const }
  ];
  const categoryMobileBreakpoints = [
    { percentage: 0, theme: 'light' as const },
    { percentage: 80, theme: 'blue' as const }
  ];

  const desktopBreakpoints = isCategory ? categoryBreakpoints : landingBreakpoints;
  const mobileBreakpoints = isCategory ? categoryMobileBreakpoints : landingMobileBreakpoints;

  return (
    <>
      <ScrollProgress breakpoints={desktopBreakpoints} mobileBreakpoints={mobileBreakpoints} />
      <DefaultHero
        heading="Journal"
        subheading="A collective expedition of ideas, business, and culture in the evolving world of design, AI and technology."
      />
      <Section className="bg-background pt-0 dark:bg-text">
        <Container className="">
          {/* Tabs above the featured item */}
          <Suspense fallback={<InsightsCategoriesSkeleton />}>
            <InsightsCategories />
          </Suspense>
          <Suspense fallback={<FeaturedInsightSkeleton />}>
            <FeaturedInsight />
          </Suspense>
          <div className="mt-12">
            <Suspense fallback={<InsightsGridSkeleton />}>
              <Suspense fallback={<InsightsGridSkeleton />}>
                <InsightsGrid
                  variant="default"
                  scrollRef={insightsGridRef}
                  featuredInsightId={effectiveTop?.sys.id}
                />
              </Suspense>
            </Suspense>
          </div>
          {/* New section: latest item from each category */}
          <LatestByCategorySection />
        </Container>
      </Section>
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
