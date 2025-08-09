'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/global/matic-ds';
import { ThemeInitializer } from '@/components/theme/ThemeInitializer';

interface Category {
  sys: {
    id: string;
  };
  name: string;
  slug: string;
}

interface WorkHeroProps {
  title: string;
  description?: string;
  bannerImage?: {
    url: string;
  };
  sector?: string;
  categoriesCollection?: {
    items: Category[];
  };
}

export function WorkHero({
  title,
  description,
  bannerImage,
  sector,
  categoriesCollection
}: WorkHeroProps) {
  const categories = categoriesCollection?.items ?? [];

  return (
    <div className="relative">
      <ThemeInitializer defaultTheme="dark" />
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Image with lower z-index */}
        <div className="absolute inset-0 z-0">
          {bannerImage && (
            <Image
              src={bannerImage.url}
              alt={title}
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        </div>

        {/* Content with higher z-index */}
        <Container className="relative z-10">
          <div className="flex h-[60vh] flex-col justify-center">
            <div className="max-w-3xl">
              {sector && <p className="mb-4 text-sm font-medium text-white/60">{sector}</p>}
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
              {description && <p className="mt-6 text-lg text-white/80">{description}</p>}
              {categories.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {categories.map((category) => (
                    <span
                      key={category.sys.id}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
