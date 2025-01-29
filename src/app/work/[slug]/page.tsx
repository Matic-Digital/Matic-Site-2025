import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { WorkHero } from '@/components/work/WorkHero';
import { ThemeInitializer } from '@/components/theme/ThemeInitializer';
import { notFound } from 'next/navigation';
import { getWork } from '@/lib/api';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: { params: Promise<Props['params']> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);
  if (!work) return {};

  return {
    title: work.clientName,
    description: work.briefDescription,
  };
}

interface PageProps {
  params: Promise<Props['params']>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);

  if (!work) {
    notFound();
  }

  console.log('Work data:', work);

  return (
    <>
      <ThemeInitializer defaultTheme="dark" />
      <WorkHero
        title={work.clientName}
        description={work.briefDescription}
        bannerImage={work.featuredImage}
        sector={work.sector}
        categoriesCollection={work.categoriesCollection}
      />
    </>
  );
}
