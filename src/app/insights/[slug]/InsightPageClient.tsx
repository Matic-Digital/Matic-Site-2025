'use client';

import Image from 'next/image';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Node } from '@contentful/rich-text-types';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Box, Container, Prose, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import type { Insight, ContentfulEntry } from '@/types/contentful';
// Import Contentful Live Preview
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useContentfulLiveUpdatesHook } from '@/components/insights/ContentfulLivePreview';

interface AssetNode extends Node {
  nodeType: typeof BLOCKS.EMBEDDED_ASSET;
  data: {
    target: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
  };
}

interface InsightPageClientProps {
  insight: Insight;
  allInsights: Insight[];
  isPreviewMode?: boolean;
}

export function InsightPageClient({ insight, allInsights, isPreviewMode = false }: InsightPageClientProps) {
  // Initialize Contentful inspector mode hooks when in preview mode
  const inspectorMode = useContentfulInspectorMode();
  
  // Prepare the insight data for live updates
  // We need to ensure it has the correct structure for Contentful Live Preview
  const insightWithMetadata = {
    ...insight,
    contentTypeId: 'insight', // Add content type ID
    // Convert InsightContent to Record<string, unknown> to satisfy ContentfulEntry type
    insightContent: insight.insightContent as unknown as Record<string, unknown>
  };
  
  // Enable live updates for the insight content when in preview mode
  const liveInsight = useContentfulLiveUpdatesHook(insightWithMetadata as unknown as ContentfulEntry<Record<string, unknown>>, {
    locale: 'en-US',
    skip: !isPreviewMode
  });
  
  // Only log in development mode to avoid cluttering production logs
  if (process.env.NODE_ENV !== 'production' && isPreviewMode) {
    console.log('Original insight data:', {
      id: insight.sys?.id,
      title: insight.title,
      hasRichText: !!insight.insightContent
    });
    
    // Cast liveInsight to a typed object for logging purposes
    const liveInsightTyped = liveInsight as unknown as {
      sys?: { id?: string };
      title?: string;
      insightContent?: unknown;
    };
    console.log('Live insight data:', {
      id: liveInsightTyped.sys?.id,
      title: liveInsightTyped.title,
      hasRichText: !!liveInsightTyped.insightContent,
      // Compare IDs instead of object references for more reliable comparison
      hasUpdates: liveInsightTyped.sys?.id === insight.sys?.id && JSON.stringify(liveInsight) !== JSON.stringify(insight)
    });
  }
  
  // Use the live updated content when in preview mode, otherwise use the original content
  // We need to ensure the live updated content has all the required Insight properties
  const currentInsight = isPreviewMode ? {
    ...insight, // Ensure all required properties are present
    ...liveInsight as unknown as Partial<Insight> // Apply any updates from live preview
  } : insight;
  
  // Helper function to get inspector props when in preview mode
  const getInspectorProps = (entryId: string | undefined, fieldId: string) => {
    if (!isPreviewMode || !entryId) return {};
    
    return inspectorMode({
      entryId,
      fieldId
    }) ?? {};
  };
  // Custom rendering options for rich text content
  const renderOptions: Options = {
    renderNode: {
      // Headings
      [BLOCKS.HEADING_1]: (node, children) => {
        return isPreviewMode ? (
          <h1 className="text-text dark:text-background" {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</h1>
        ) : (
          <h1 className="text-text dark:text-background">{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return isPreviewMode ? (
          <h2 className="text-text dark:text-background" {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</h2>
        ) : (
          <h2 className="text-text dark:text-background">{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return isPreviewMode ? (
          <h3 className="text-text dark:text-background" {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</h3>
        ) : (
          <h3 className="text-text dark:text-background">{children}</h3>
        );
      },
      
      // Paragraphs
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return isPreviewMode ? (
          <p {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</p>
        ) : (
          <p>{children}</p>
        );
      },
      
      // Lists
      [BLOCKS.UL_LIST]: (node, children) => {
        return isPreviewMode ? (
          <ul {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</ul>
        ) : (
          <ul>{children}</ul>
        );
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        return isPreviewMode ? (
          <ol {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}>{children}</ol>
        ) : (
          <ol>{children}</ol>
        );
      },
      
      // Embedded assets
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const assetNode = node as AssetNode;

        // Get the asset ID from the node
        const assetId = assetNode.data.target.sys.id;

        // Make sure insightContent exists before accessing properties
        if (!currentInsight.insightContent) {
          console.warn('Missing insightContent in currentInsight');
          return null;
        }

        // Find the matching asset in the links
        const asset = currentInsight.insightContent.links?.assets?.block?.find(
          (asset) => asset.sys.id === assetId
        );

        if (!asset?.url) {
          console.warn(`Asset with ID ${assetId} not found or missing URL`);
          return null;
        }

        // For preview mode, we need to add inspector props to the image
        const inspectorProps = isPreviewMode ? 
          getInspectorProps(assetId, 'url') : {};

        return (
          <div className="my-8 -mx-8 md:mx-0">
            <Image
              src={asset.url}
              width={1100}
              height={Math.round((asset.height ?? 600) * (1100 / (asset.width ?? 800)))}
              alt={asset.description ?? asset.sys.id ?? 'Embedded image'}
              className="rounded-none border-none w-[calc(100%+4rem)] md:w-full"
              {...inspectorProps}
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
            // Safely access theme property with fallback
            theme: (() => {
              const insightTheme = currentInsight.theme || 'light';
              return insightTheme === 'soft' || insightTheme === 'medium'
                ? 'light'
                : (insightTheme as 'light' | 'dark' | 'blue')
            })()
          },
          { percentage: 10.85, theme: 'light' }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            // Safely access theme property with fallback
            theme: (() => {
              const insightTheme = currentInsight.theme || 'light';
              return insightTheme === 'soft' || insightTheme === 'medium'
                ? 'light'
                : (insightTheme as 'light' | 'dark' | 'blue')
            })()
          },
          { percentage: 3.27, theme: 'light' }
        ]}
      />
      <Section className="relative -mt-24 flex pt-[8.75rem] md:h-[750px] pb-0">
        <Image
          src={currentInsight.insightBannerImage?.url ?? ''}
          alt={currentInsight.title}
          width={1200}
          height={750}
          className="absolute inset-0 z-10 h-full w-full rounded-none border-none object-cover"
          {...getInspectorProps(currentInsight.sys.id, 'insightBannerImage')}
        />
        <Container className="z-30 flex flex-col justify-end p-[1.25rem] md:p-[3.81rem]">
          <Box direction="col" className="space-y-[0.25rem] md:space-y-8">
            <Box className="">
              <h2 className="flex items-center gap-2 font-chalet-newyork text-base md:text-[1.5rem]">
                {currentInsight.featured && (
                  <span 
                    className="opacity-100"
                    {...getInspectorProps(currentInsight.sys.id, 'featured')}
                  >
                    Featured
                  </span>
                )}
                <span 
                  className="opacity-50"
                  {...getInspectorProps(currentInsight.sys.id, 'category')}
                > 
                  {currentInsight.category}
                </span>
              </h2>
            </Box>
            <Box direction="col" className="">
              <h1 
                className="max-w-5xl font-chalet-newyork text-[1.75rem] md:text-[4rem] md:leading-[130%] md:tracking-[-0.12rem]"
                {...getInspectorProps(currentInsight.sys.id, 'title')}
              >
                {currentInsight.title}
              </h1>
            </Box>
          </Box>
        </Container>
      </Section>

      <Section className="relative bg-background md:pt-16 dark:bg-text">
        <Container>
          {currentInsight.socialsCollection?.items && currentInsight.socialsCollection.items.length > 0 && (
            <Box direction="row" gap={4} className="justify-start md:hidden">
              {currentInsight.socialsCollection.items.map((social) => (
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
              {currentInsight.socialsCollection?.items && currentInsight.socialsCollection.items.length > 0 && (
                <Box direction="col" gap={8}>
                  {currentInsight.socialsCollection.items.map((social) => (
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
              <div className="flex justify-center md:justify-start mt-2">
                <Prose 
                  className="max-w-[1100px]"
                >
                  {documentToReactComponents(currentInsight.insightContent.json, renderOptions)}
                </Prose>
              </div>
            </ErrorBoundary>
          </div>
        </Container>
      </Section>
      {currentInsight.closingThoughts && (
        <Section className="bg-blue py-36">
          <Container>
            <div className="text-background flex flex-col md:flex-row md:gap-12 items-start justify-center">
              <h2 className="text-background mb-6 md:mb-0">Closing thoughts</h2>
              <div className="w-full max-w-[500px]">
                <Prose className="[&_h1]:text-background [&_h2]:text-background [&_h3]:text-background [&_h4]:text-background [&_h5]:text-background [&_h6]:text-background [&_a]:text-background [&_a]:hover:text-background/90 [&_a]:no-underline [&_p]:text-background [&_p]:mt-0 [&_li]:text-background [&_blockquote]:text-background">
                  {documentToReactComponents(currentInsight.closingThoughts.json, renderOptions)}
                </Prose>
              </div>
            </div>
          </Container>
        </Section>
      )}
      <Section className="m-4">
        <Container>
          <Box className="items-center justify-between">
            <h1 className="text-text">More entries</h1>
          </Box>
          <InsightsGrid variant="recent" initialInsights={allInsights.filter(i => i.slug !== insight.slug)} />
        </Container>
      </Section>
    </>
  );
}
