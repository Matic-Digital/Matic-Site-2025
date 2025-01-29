// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Prose, Section } from '@/components/global/matic-ds';
import { InsightHero } from '@/components/insights/InsightHero';
import { BLOCKS, type Node, type NodeData } from '@contentful/rich-text-types';

// API functions
import { getAllInsights, getInsight } from '@/lib/api';

interface AssetData extends NodeData {
  target: {
    url: string;
    width?: number;
    height?: number;
    title?: string;
  };
}

interface AssetNode extends Node {
  nodeType: typeof BLOCKS.EMBEDDED_ASSET;
  data: AssetData;
}

type Props = {
  params: { slug: string };
};

export const revalidate = 60;

/**
 * Static page generation configuration
 * Generates static pages for all insights at build time
 * This improves performance and SEO
 *
 * @returns Array of possible slug values for static generation
 */
export async function generateStaticParams() {
  const { items: insights } = await getAllInsights();
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

/**
 * Dynamic metadata generation for SEO
 * Generates title and description based on insight content
 *
 * @param params - Contains the insight slug
 * @returns Metadata object for the page
 */
export async function generateMetadata(
  { params }: { params: Promise<Props['params']> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);

  if (!insight) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const description = documentToPlainTextString(insight.insightContent.json);

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
          alt: insight.title,
        },
      ],
    },
  };
}

/**
 * Insight page component
 * Displays a single insight with its content and metadata
 * Features:
 * - Responsive image handling
 * - Navigation back to home
 * - Insight metadata display
 * - Rich text content rendering
 *
 * @param params - Contains the insight slug from the URL
 */
type PageProps = {
  params: Promise<Props['params']>;
};

export default async function InsightPage({ params }: PageProps) {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);

  // Redirect to 404 page if insight not found
  if (!insight) {
    notFound();
  }

  // Custom rendering options for rich text content
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const assetNode = node as AssetNode;
        const asset = assetNode.data.target;
        if (!asset?.url) return null;
        
        return (
          <div className="my-8">
            <Image
              src={asset.url}
              width={asset.width ?? 800}
              height={asset.height ?? 600}
              alt={asset.title ?? 'Embedded image'}
              className="rounded-lg"
            />
          </div>
        );
      },
    },
  };

  return (
    <>
      <InsightHero
        title={insight.title}
        category={insight.category}
        imageUrl={insight.insightBannerImage?.url}
      />
      
      <Section className="py-24">
        <ErrorBoundary>
          <Prose className="mx-auto">
            {documentToReactComponents(insight.insightContent.json, renderOptions)}
          </Prose>
        </ErrorBoundary>
      </Section>
    </>
  );
}
