'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/global/matic-ds';
import { ThemeInitializer } from '@/components/theme/ThemeInitializer';

interface InsightHeroProps {
  title: string;
  category: string;
  imageUrl?: string;
}

export function InsightHero({ title, category, imageUrl }: InsightHeroProps) {
  return (
    <div className="relative">
      <ThemeInitializer defaultTheme="light" />
      <div className="absolute inset-0 bg-black/60" />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={1920}
          height={1080}
          className="h-[60vh] w-full object-cover"
          priority
        />
      )}
      <Container className="relative z-10">
        <div className="flex h-[60vh] flex-col justify-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium text-white/60">{category}</p>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}
