// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// API functions
import { getAllInsights, getInsight } from '@/lib/api';
import { InsightPageClient } from './InsightPageClient';

type Props = {
  params: { slug: string };
};

type PageProps = {
  params: Promise<Props['params']>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.map((insight) => ({
    slug: insight.slug
  }));
}

export async function generateMetadata(
  {
    params
  }: {
    params: Promise<Props['params']>;
  },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);

  if (!insight) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  const plainTextContent = documentToPlainTextString(insight.insightContent.json);
  const description = plainTextContent.slice(0, 155) + '...';

  return {
    title: insight.title,
    description,
    openGraph: {
      title: insight.title,
      description,
      images: [
        {
          url: insight.insightBannerImage?.url ?? '',
          width: 1200,
          height: 630,
          alt: insight.title
        }
      ]
    }
  };
}

export default async function InsightPage({ params }: PageProps) {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);
  const allInsights = await getAllInsights();

  // Redirect to 404 page if insight not found
  if (!insight) {
    notFound();
  }

  return <InsightPageClient insight={insight} allInsights={allInsights} />;
}
