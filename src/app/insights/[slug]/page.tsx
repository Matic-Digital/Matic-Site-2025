// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// API functions
import { getAllInsights, getInsight } from '@/lib/api';
import { InsightPageClient } from './InsightPageClient';
import { ContentfulPreviewScript } from '@/components/insights/ContentfulPreviewScript';

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

type PageProps = {
  params: Promise<Props['params']>;
  searchParams: Promise<Props['searchParams']>;
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
    params,
    searchParams
  }: {
    params: Promise<Props['params']>;
    searchParams: Promise<Props['searchParams']>;
  },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';
  const insight = await getInsight(resolvedParams.slug, { preview: isPreviewMode });

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

export default async function InsightPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';
  const insight = await getInsight(resolvedParams.slug, { preview: isPreviewMode });
  const allInsights = await getAllInsights(7, {}, isPreviewMode);


  // Redirect to 404 page if insight not found
  if (!insight) {
    notFound();
  }

  // Wrap the content with ContentfulPreviewScript when in preview mode
  const content = (
    <>
      {isPreviewMode && (
        <div className="bg-blue-600 text-white p-2 flex justify-between items-center text-sm">
          <span>Preview Mode Enabled - Viewing unpublished content</span>
          <a 
            href={`/api/exit-preview?redirect=/insights/${resolvedParams.slug}`}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Exit Preview
          </a>
        </div>
      )}
      <InsightPageClient 
        insight={insight} 
        allInsights={allInsights} 
        isPreviewMode={isPreviewMode} 
      />
    </>
  );

  // Use ContentfulPreviewScript wrapper in preview mode to enable live updates and inspector mode
  return isPreviewMode ? (
    <ContentfulPreviewScript isPreviewMode={isPreviewMode}>
      {content}
    </ContentfulPreviewScript>
  ) : content;
}
