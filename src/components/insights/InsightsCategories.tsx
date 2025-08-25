"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { Box } from "@/components/global/matic-ds";
import { getInsightCategories } from "@/lib/api";

function slugifyCategory(category?: string) {
  return (category ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function CategoryFilter({
  selectedCategory,
  categoryContainerRef,
  categories,
}: {
  selectedCategory: string | null;
  categoryContainerRef: React.RefObject<HTMLDivElement>;
  categories: string[];
}) {
  return (
    <div
      ref={categoryContainerRef}
      className="no-scrollbar flex w-full gap-[0.625rem] overflow-x-auto md:w-auto md:flex-wrap"
    >
      <Link
        href="/blog"
        className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm leading-normal transition-colors md:text-[0.875rem] ${
          !selectedCategory ? "bg-text text-background" : "border border-[#A6A7AB] text-text"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/blog/${slugifyCategory(category)}`}
          className={`whitespace-nowrap rounded-sm px-[1rem] py-[0.75rem] text-sm leading-normal transition-colors md:text-[0.875rem] ${
            selectedCategory === category
              ? "bg-text text-background"
              : "border border-[#A6A7AB] text-text"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

export function InsightsCategories() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch categories dynamically
  const { data: categories = [] } = useQuery<string[], Error>({
    queryKey: ["insightCategories"],
    queryFn: () => getInsightCategories(),
    staleTime: 1000 * 60 * 10,
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
  const segments = React.useMemo(() => (pathname || "").split("/").filter(Boolean), [pathname]);
  const categorySlugInPath = React.useMemo(
    () => (segments[0] === "blog" ? segments[1] ?? null : null),
    [segments]
  );

  const resolvedCategoryName = React.useMemo(() => {
    if (categorySlugInPath) {
      return slugToName[categorySlugInPath] ?? null;
    }
    return searchParams?.get("category") ?? null;
  }, [categorySlugInPath, slugToName, searchParams]);

  React.useEffect(() => {
    setSelectedCategory(resolvedCategoryName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, resolvedCategoryName]);

  // Scroll active tab into view
  const scrollToCenter = () => {
    if (!categoryContainerRef.current) return;
    const active = categoryContainerRef.current.querySelector<HTMLElement>("a.bg-text");
    if (active) {
      const container = categoryContainerRef.current;
      const scrollLeft = active.offsetLeft - (container.offsetWidth - active.offsetWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    scrollToCenter();
  }, [selectedCategory]);

  return (
    <Box className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryFilter
          selectedCategory={selectedCategory}
          categoryContainerRef={categoryContainerRef}
          categories={categories}
        />
      </Suspense>
    </Box>
  );
}

export default InsightsCategories;
