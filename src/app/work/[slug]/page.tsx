import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getWork } from '@/lib/api';
import { WorkDetail } from '@/components/global/WorkDetail';

type Props = {
  params: { slug: string };
};

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

type PageProps = {
  params: Promise<Props['params']>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const work = await getWork(resolvedParams.slug);

  if (!work) {
    return null;
  }

  console.log('Work data:', work);

  return (
      <WorkDetail
        name={work.clientName}
        description={work.briefDescription ?? ''}
        client={work.clientName}
        clientLogo={work.logo?.url ?? null}
        clientDescription={work.briefDescription ?? ''}
        images={work.featuredImage ? [{ url: work.featuredImage.url }] : []}
        previousWork={null}
        nextWork={null}
        sector={work.sector}
        categories={work.categories}
      />
  );
}
