'use client';

import { Box } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface InsightFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const categories = ['All', 'Insights', 'Design', 'Technology', 'Signals'] as const;

export function InsightFilter({ selectedCategory, onCategorySelect }: InsightFilterProps) {
  return (
    <Box className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category === 'All' ? null : category)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            (selectedCategory === null && category === 'All') || selectedCategory === category
              ? 'bg-[var(--foreground)] text-[var(--background)]'
              : 'bg-transparent text-[var(--foreground)]'
          }`}
        >
          {category}
        </button>
      ))}
      <Link href="/" className="ml-auto flex items-center">
        <p className="">Subscribe for updates</p>
        <ArrowRight />
      </Link>
    </Box>
  );
}
