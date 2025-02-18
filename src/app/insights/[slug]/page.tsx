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
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';

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
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme:
              insight.theme === 'soft' || insight.theme === 'medium'
                ? 'light'
                : ((insight.theme ?? 'light') as 'light' | 'dark' | 'blue')
          },
          { percentage: 10.85, theme: 'light' }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme:
              insight.theme === 'soft' || insight.theme === 'medium'
                ? 'light'
                : ((insight.theme ?? 'light') as 'light' | 'dark' | 'blue')
          },
          { percentage: 3.27, theme: 'light' }
        ]}
      />
      <Section className="relative -mt-24 flex h-[361px] md:h-[750px]">
        <Image
          src={insight.insightBannerImage?.url ?? ''}
          alt={insight.title}
          width={1200}
          height={750}
          className="absolute inset-0 z-10 h-full w-full rounded-none border-none object-cover"
        />
        <Container className="z-30 flex flex-col justify-end p-8">
          <Box direction="col" className="space-y-8">
            <Box className="">
              <h2 className="flex items-center gap-2 font-chalet-newyork text-[1.5rem]">
                {insight.featured && <span className="opacity-100">Featured</span>}
                <span className="opacity-50"> {insight.category}</span>
              </h2>
            </Box>
            <Box direction="col" className="space-y-4">
              <h1 className="max-w-5xl font-chalet-newyork text-[1.75rem] md:text-[4rem]">
                {insight.title}
              </h1>
            </Box>
          </Box>
        </Container>
      </Section>

      <Section className="relative bg-background pt-16 dark:bg-text">
        <Container>
          {insight.socialsCollection?.items && insight.socialsCollection.items.length > 0 && (
            <Box direction="row" gap={4} className="justify-start md:hidden">
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
                    className="rounded-none border-none brightness-0"
                  />
                </a>
              ))}
            </Box>
          )}
          <div className="grid md:grid-cols-[auto_1fr] md:gap-16">
            {/* Desktop Social Icons */}
            <Box direction="col" gap={4} className="mt-8 hidden md:block">
              {insight.socialsCollection?.items && insight.socialsCollection.items.length > 0 && (
                <Box direction="col" gap={8}>
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
                        className="rounded-none border-none brightness-0"
                      />
                    </a>
                  ))}
                </Box>
              )}
            </Box>

            {/* Main Content */}
            <ErrorBoundary>
              <Prose className="">
                {documentToReactComponents(insight.insightContent.json, renderOptions)}
              </Prose>
            </ErrorBoundary>
          </div>
        </Container>
      </Section>
      <Section className="m-4">
        <Container>
          <Box className="items-center justify-between">
            <h1 className="text-text">More entries</h1>
          </Box>
          <InsightsGrid variant="recent" insights={allInsights.filter(i => i.slug !== insight.slug)} />
        </Container>
      </Section>
    </>
  );
}
