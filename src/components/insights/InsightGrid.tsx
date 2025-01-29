'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Insight } from '@/types/contentful';

interface InsightGridProps {
  insights: Insight[];
}

export function InsightGrid({ insights }: InsightGridProps) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight) => (
        <Link
          key={insight.sys.id}
          href={`/insights/${insight.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-none gap-8"
        >
          {insight.insightBannerImage && (
            <div className="aspect-portrait overflow-hidden">
              <Image
                src={insight.insightBannerImage.url}
                alt={insight.title}
                width={800}
                height={600}
                className="h-full rounded-none border-none w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between bg-background">
            <div className="flex-1">
              <p className="text-sm font-medium text-primary uppercase">
                {insight.category}
              </p>
              <div className="mt-2">
                <p className="text-gray-900">
                  {insight.title}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
