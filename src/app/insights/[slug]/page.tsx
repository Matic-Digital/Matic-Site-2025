// Next.js components and utilities
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Prose } from '@/components/global/matic-ds';

// API functions
import { getAllInsights, getInsight } from '@/lib/api';

import { Container, Article, Box } from '@/components/global/matic-ds';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

// Types
import { type Insight } from '@/types';

import { PLACEHOLDER_IMAGE } from '@/constants/images';

import { BLOCKS } from '@contentful/rich-text-types';
import type { Block, Inline } from '@contentful/rich-text-types';

/**
 * Props interface for the insight page
 * @property params.slug - URL slug for the insight
 */
interface Props {
  params: { slug: string };
}

/**
 * Static page generation configuration
 * Generates static pages for all insights at build time
 * This improves performance and SEO
 *
 * @returns Array of possible slug values for static generation
 */
export async function generateStaticParams() {
  const { items: insights } = await getAllInsights();
  return insights.map((insight: Insight) => ({
    slug: insight.slug
  }));
}

/**
 * Dynamic metadata generation for SEO
 * Generates title and description based on insight content
 *
 * @param params - Contains the insight slug
 * @returns Metadata object for the page
 */
export async function generateMetadata({
  params
}: {
  params: Promise<Props['params']>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);

  if (!insight) {
    return {
      title: 'Insight Not Found'
    };
  }

  return {
    title: insight.title,
    description: `Read about ${insight.title}`,
    openGraph: {
      title: insight.title,
      description:
        documentToPlainTextString(insight.insightContent.json) || `Read about ${insight.title}`,
      images: insight.insightBannerImage?.url
    }
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
export default async function InsightPage({ params }: { params: Promise<Props['params']> }) {
  const resolvedParams = await params;
  const insight = await getInsight(resolvedParams.slug);

  // Redirect to 404 page if insight not found
  if (!insight) {
    notFound();
  }

  // Custom rendering options for rich text content
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const target = node.data?.target as { fields?: { 
          title?: string;
          description?: string;
          file?: { 
            url: string;
            details?: {
              image?: {
                width: number;
                height: number;
              }
            }
          }
        }};
        
        if (!target?.fields?.file?.url) {
          return null;
        }

        return (
          <Image
            src={target.fields.file.url}
            alt={target.fields.title ?? 'Embedded asset'}
            width={target.fields.file.details?.image?.width ?? 800}
            height={target.fields.file.details?.image?.height ?? 400}
            className="my-8 rounded-lg"
          />
        );
      },
    },
  };

  return (
    <Container>
      <ErrorBoundary>
        <Box cols={1} gap={4}>
          <Article className="space-y-8">
            {/* Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList className="ml-0">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-blue-600 hover:underline">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/insights" className="text-blue-600 hover:underline">
                    Insights
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{insight.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h2>{insight.title}</h2>

            {/* Insight metadata */}
            <div className="space-y-1 text-sm text-gray-500">
              <div>Category: {insight.category}</div>
              <div>Date: {new Date(insight.postDate).toLocaleDateString()}</div>
              <div>ID: {insight.sys.id}</div>
            </div>

            {/* Banner Image */}
            <Image
              src={insight.insightBannerImage?.url ?? PLACEHOLDER_IMAGE}
              alt={`Cover image for ${insight.title}`}
              height={400}
              width={800}
              className="aspect-[2/1] w-full rounded-md object-cover"
              priority
            />

            {/* Rich Text Content */}
            <Prose>{documentToReactComponents(insight.insightContent.json, renderOptions)}</Prose>
          </Article>
        </Box>
      </ErrorBoundary>
    </Container>
  );
}
