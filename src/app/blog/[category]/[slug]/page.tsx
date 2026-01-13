// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// API functions
import { getAllInsights, getInsight, getRecentInsightsByCategory } from '@/lib/api';
import { InsightPageClient } from './BlogPageClient';
import { ContentfulPreviewScript } from '@/components/insights/ContentfulPreviewScript';
import type { Insight } from '@/types/contentful';

type Props = {
  params: { category: string; slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

type PageProps = {
  params: Promise<Props['params']>;
  searchParams: Promise<Props['searchParams']>;
};

export const revalidate = 60;

function slugifyCategory(category?: string) {
  return (category ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.items.map((insight) => ({
    category: slugifyCategory(insight.category as string),
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
  const autoExcerpt = plainTextContent ? `${plainTextContent.slice(0, 155)}...` : '';
  const title = insight.seoTitle ?? insight.title;
  const description = insight.seoDescription ?? autoExcerpt;
  const ogUrl = insight.ogImage?.url ?? insight.insightBannerImage?.url ?? '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogUrl
        ? [
            {
              url: ogUrl,
              width: 1200,
              height: 630,
              alt: insight.title
            }
          ]
        : undefined
    }
  };
}

export default async function InsightPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isPreviewMode = resolvedSearchParams.preview === 'true';
  const insight = await getInsight(resolvedParams.slug, { preview: isPreviewMode });
  // Fetch recent insights only from the same category as the current post (lightweight fields)
  const allInsights = insight
    ? await getRecentInsightsByCategory(insight.category, 5, isPreviewMode)
    : { items: [], total: 0 };

  // Redirect to 404 page if insight not found
  if (!insight) {
    notFound();
  }

  // Prepare plain text for description and article body
  const plainTextContent = documentToPlainTextString(insight.insightContent.json);
  const description = plainTextContent.slice(0, 155) + '...';

  // Build BlogPosting JSON-LD (enhanced per requirements)
  const canonicalUrl = `https://www.maticdigital.com/blog/${resolvedParams.category}/${resolvedParams.slug}`;
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    name: insight.title,
    headline: insight.title,
    url: canonicalUrl,
    description,
    ...(insight.postDate ? { datePublished: insight.postDate } : {}),
    ...(insight.insightBannerImage?.url ? { image: insight.insightBannerImage.url } : {}),
    ...(plainTextContent ? { articleBody: plainTextContent } : {}),
    ...(insight.category ? { articleSection: insight.category } : {}),
    ...(insight.author?.name
      ? {
          author: {
            '@type': 'Person',
            ...(insight.author?.linkedIn ? { url: insight.author.linkedIn } : {}),
            name: insight.author.name
          }
        }
      : {}),
    publisher: { '@id': 'https://www.maticdigital.com/#organization' }
  } as const;

  // Build FAQPage JSON-LD when there are embedded FAQ Items
  const embeddedFaqEntries =
    insight.insightContent.links?.entries?.block?.filter(
      (entry) => entry.variant === 'FAQ' && entry.title && entry.richDescription?.json
    ) ?? [];

  const faqJsonLd =
    embeddedFaqEntries.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: embeddedFaqEntries.map((entry) => ({
            '@type': 'Question',
            name: entry.title!,
            acceptedAnswer: {
              '@type': 'Answer',
              text: documentToPlainTextString(entry.richDescription!.json)
            }
          }))
        }
      : null;

  // Wrap the content with ContentfulPreviewScript when in preview mode
  const content = (
    <>
      <script
        id="ld-blog-posting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {faqJsonLd && (
        <script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {isPreviewMode && (
        <div className="bg-blue-600 flex items-center justify-between p-2 text-sm text-white">
          <span>Preview Mode Enabled - Viewing unpublished content</span>
          <a
            href={`/api/exit-preview?redirect=/blog/${resolvedParams.category}/${resolvedParams.slug}`}
            className="text-blue-600 rounded bg-white px-3 py-1 transition-colors hover:bg-gray-100"
          >
            Exit Preview
          </a>
        </div>
      )}
      <InsightPageClient
        insight={insight}
        allInsights={allInsights.items as unknown as Insight[]}
        isPreviewMode={isPreviewMode}
      />
    </>
  );

  // Use ContentfulPreviewScript wrapper in preview mode to enable live updates and inspector mode
  return isPreviewMode ? (
    <ContentfulPreviewScript isPreviewMode={isPreviewMode}>{content}</ContentfulPreviewScript>
  ) : (
    content
  );
}
