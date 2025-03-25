'use client';

import Image from 'next/image';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Node } from '@contentful/rich-text-types';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Box, Container, Prose, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import type { Insight } from '@/types/contentful';
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
  };
  
  // Enable live updates for the insight content when in preview mode
  const liveInsight = useContentfulLiveUpdatesHook(insightWithMetadata, {
    locale: 'en-US',
    skip: !isPreviewMode
  });
  
  // Log the insight data structure to help debug live updates
  console.log('Original insight data:', insight);
  console.log('Enhanced insight data for live updates:', insightWithMetadata);
  console.log('Live insight data:', liveInsight);
  
  // Use the live updated content when in preview mode, otherwise use the original content
  const currentInsight = isPreviewMode ? liveInsight : insight;
  
  // Helper function to get inspector props when in preview mode
  const getInspectorProps = (entryId: string, fieldId: string) => {
    if (!isPreviewMode) return {};
    
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
          <h1 {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</h1>
        ) : (
          <h1>{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return isPreviewMode ? (
          <h2 {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</h2>
        ) : (
          <h2>{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return isPreviewMode ? (
          <h3 {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</h3>
        ) : (
          <h3>{children}</h3>
        );
      },
      
      // Paragraphs
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return isPreviewMode ? (
          <p {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</p>
        ) : (
          <p>{children}</p>
        );
      },
      
      // Lists
      [BLOCKS.UL_LIST]: (node, children) => {
        return isPreviewMode ? (
          <ul {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</ul>
        ) : (
          <ul>{children}</ul>
        );
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        return isPreviewMode ? (
          <ol {...getInspectorProps(currentInsight.sys.id, 'insightContent')}>{children}</ol>
        ) : (
          <ol>{children}</ol>
        );
      },
      
      // Embedded assets
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const assetNode = node as AssetNode;

        // Get the asset ID from the node
        const assetId = assetNode.data.target.sys.id;

        // Find the matching asset in the links
        const asset = currentInsight.insightContent.links?.assets?.block?.find(
          (asset) => asset.sys.id === assetId
        );

        if (!asset?.url) {
          return null;
        }

        return (
          <div className="my-8 -mx-8 md:mx-0">
            <Image
              src={asset.url}
              width={1100}
              height={Math.round((asset.height ?? 600) * (1100 / (asset.width ?? 800)))}
              alt={asset.description ?? asset.sys.id ?? 'Embedded image'}
              className="rounded-none border-none w-[calc(100%+4rem)] md:w-full"
              {...(isPreviewMode && getInspectorProps(currentInsight.sys.id, 'insightContent'))}
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
              currentInsight.theme === 'soft' || currentInsight.theme === 'medium'
                ? 'light'
                : ((currentInsight.theme ?? 'light') as 'light' | 'dark' | 'blue')
          },
          { percentage: 10.85, theme: 'light' }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme:
              currentInsight.theme === 'soft' || currentInsight.theme === 'medium'
                ? 'light'
                : ((currentInsight.theme ?? 'light') as 'light' | 'dark' | 'blue')
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
