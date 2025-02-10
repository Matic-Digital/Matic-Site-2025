// Next.js components and utilities
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Box, Container, Prose, Section } from '@/components/global/matic-ds';
import { BLOCKS, type Node, type NodeData } from '@contentful/rich-text-types';

// API functions
import { getAllInsights, getInsight } from '@/lib/api';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';

interface AssetData extends NodeData {
  target: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
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
export async function generateMetadata(
  { params }: { params: Promise<Props['params']> },
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
          alt: insight.title
        }
      ]
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
        
        // Get the asset ID from the node
        const assetId = assetNode.data.target.sys.id;
        
        // Find the matching asset in the links
        const asset = insight.insightContent.links?.assets?.block?.find(
          (asset) => asset.sys.id === assetId
        );

        if (!asset?.url) {
          return null;
        }

        return (
          <div className="my-8">
            <Image
              src={asset.url}
              width={asset.width ?? 800}
              height={asset.height ?? 600}
              alt={asset.description ?? asset.sys.id ?? 'Embedded image'}
              className="rounded-none border-none"
            />
          </div>
        );
      }
    }
  };

  return (
    <>
      <ScrollThemeTransition theme={`${insight.theme}`}>
        <Section className="h-[750px] relative flex -mt-24">
          <Image
            src={insight.insightBannerImage?.url ?? ''}
            alt={insight.title}
            width={1200}
            height={750}
            className="absolute inset-0 z-10 w-full h-full rounded-none border-none object-cover"
          />
          <Container className="z-30 flex flex-col justify-end p-8">
            <Box className=" ">
              <h2 className="opacity-50">{insight.category}</h2>
            </Box>
            <h1 className="text-7xl font-chalet-newyork-sans">{insight.title}</h1>
          </Container>
        </Section>
      </ScrollThemeTransition>
      <ScrollThemeTransition theme="light" topAligned>
        <Section className="relative pt-16">
          <Box direction="col" gap={4} className="absolute left-24 top-14">
            {insight.socialsCollection?.items && insight.socialsCollection.items.length > 0 && (
              <Box direction="col" gap={8} className="mt-4">
                {insight.socialsCollection.items.map((social) => (
                  <a
                    key={social.sys.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70"
                  >
                    <Image
                      src={social.logo.url}
                      alt={social.name}
                      width={30}
                      height={30}
                      className="rounded-none border-none brightness-0 dark:invert"
                    />
                  </a>
                ))}
              </Box>
            )}
          </Box>
          <ErrorBoundary>
            <Prose className="mx-auto">
              {documentToReactComponents(insight.insightContent.json, renderOptions)}
            </Prose>
          </ErrorBoundary>
        </Section>
      </ScrollThemeTransition>
    </>
  );
}
