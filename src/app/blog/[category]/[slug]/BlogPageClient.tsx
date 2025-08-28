'use client';

import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Node } from '@contentful/rich-text-types';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';
import { Box, Container, Prose, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import type { Insight, ContentfulEntry } from '@/types/contentful';
// Import Contentful Live Preview
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { useContentfulLiveUpdatesHook } from '@/components/insights/ContentfulLivePreview';

//import { ArrowRight } from 'lucide-react';

function slugifyCategory(category?: string) {
  return (category ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

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

export function InsightPageClient({
  insight,
  allInsights,
  isPreviewMode = false
}: InsightPageClientProps) {
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
  const liveInsight = useContentfulLiveUpdatesHook(
    insightWithMetadata as unknown as ContentfulEntry<Record<string, unknown>>,
    {
      locale: 'en-US',
      skip: !isPreviewMode
    }
  );

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
      hasUpdates:
        liveInsightTyped.sys?.id === insight.sys?.id &&
        JSON.stringify(liveInsight) !== JSON.stringify(insight)
    });
  }

  // Use the live updated content when in preview mode, otherwise use the original content
  // We need to ensure the live updated content has all the required Insight properties
  const currentInsight = isPreviewMode
    ? {
        ...insight, // Ensure all required properties are present
        ...(liveInsight as unknown as Partial<Insight>) // Apply any updates from live preview
      }
    : insight;

  // Helper function to get inspector props when in preview mode
  const getInspectorProps = (entryId: string | undefined, fieldId: string) => {
    if (!isPreviewMode || !entryId) return {};

    return (
      inspectorMode({
        entryId,
        fieldId
      }) ?? {}
    );
  };

  console.log('currentInsight', currentInsight);
  // Custom rendering options for rich text content
  const renderOptions: Options = {
    renderNode: {
      // Headings
      [BLOCKS.HEADING_1]: (node, children) => {
        return isPreviewMode ? (
          <h1
            className="text-text dark:text-background"
            {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}
          >
            {children}
          </h1>
        ) : (
          <h1 className="text-text dark:text-background">{children}</h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return isPreviewMode ? (
          <h2
            className="text-text dark:text-background"
            {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}
          >
            {children}
          </h2>
        ) : (
          <h2 className="text-text dark:text-background">{children}</h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return isPreviewMode ? (
          <h3
            className="text-text dark:text-background"
            {...getInspectorProps(currentInsight.sys?.id, 'insightContent')}
          >
            {children}
          </h3>
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
        const inspectorProps = isPreviewMode ? getInspectorProps(assetId, 'url') : {};

        return (
          <div className="-mx-8 my-8 md:mx-0">
            <Image
              src={asset.url}
              width={1100}
              height={Math.round((asset.height ?? 600) * (1100 / (asset.width ?? 800)))}
              alt={asset.description ?? asset.sys.id ?? 'Embedded image'}
              className="w-[calc(100%+4rem)] rounded-none border-none md:w-full"
              {...inspectorProps}
            />
          </div>
        );
      }
    },
    renderMark: {},
    renderText: (text) => text
  };

  // Add custom link rendering to ensure all external links are DoFollow
  if (renderOptions.renderNode) {
    renderOptions.renderNode[INLINES.HYPERLINK] = (node, children) => {
      const uri = node.data?.uri as string;

      if (!uri) {
        return <span>{children}</span>;
      }

      // Check if it's an external link (not starting with / or # or mailto:)
      const isExternal =
        !uri.startsWith('/') &&
        !uri.startsWith('#') &&
        !uri.startsWith('mailto:') &&
        (uri.startsWith('http') || uri.startsWith('https'));

      if (isExternal) {
        // External links - DoFollow (no rel="nofollow")
        return (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue underline hover:text-blue/90"
          >
            {children}
          </a>
        );
      } else {
        // Internal links or other protocols
        return (
          <a href={uri} className="text-blue underline hover:text-blue/90">
            {children}
          </a>
        );
      }
    };
  }

  const categorySegment = slugifyCategory(currentInsight.category);
  const fullPostUrl = `https://www.maticdigital.com/blog/${categorySegment}/${currentInsight.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullPostUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullPostUrl)}`;

  const defaultCurrentInsight = {
    sys: {
      id: 'default'
    },
    title: 'Default Insight',
    slug: 'default-insight',
    author: {
      sys: {
        id: 'default'
      },
      name: 'Matic Digital',
      title: '',
      linkedIn: 'https://www.linkedin.com/company/matic-digital'
    },
    category: 'Default Category',
    postDate: '2025-06-25',
    theme: 'light',
    insightBannerImage: {
      url: 'https://via.placeholder.com/1100x600'
    },
    insightContent: {
      json: []
    },
    closingThoughts: {
      json: []
    }
  };

  const newCurrentInsight = currentInsight ?? defaultCurrentInsight;

  console.log('newCurrentInsight', newCurrentInsight);
  
  // Format post date as Month Day, Year
  const formattedDate = newCurrentInsight.postDate
    ? new Date(newCurrentInsight.postDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            // Safely access theme property with fallback
            theme: (() => {
              const insightTheme = newCurrentInsight.theme || 'light';
              return insightTheme === 'soft' || insightTheme === 'medium'
                ? 'light'
                : (insightTheme as 'light' | 'dark' | 'blue');
            })()
          },
          { percentage: 19.0, theme: 'light' }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            // Safely access theme property with fallback
            theme: (() => {
              const insightTheme = newCurrentInsight.theme || 'light';
              return insightTheme === 'soft' || insightTheme === 'medium'
                ? 'light'
                : (insightTheme as 'light' | 'dark' | 'blue');
            })()
          },
          { percentage: 3.27, theme: 'light' }
        ]}
      />

      {/* Banner Image */}
      <Section className="relative -mt-24 flex pb-0 pt-[8.75rem] md:h-[750px]">
        <div className="absolute inset-0 z-20 h-full w-full bg-gradient-to-t from-black/80 to-transparent"></div>
        <Image
          src={newCurrentInsight.insightBannerImage?.url ?? ''}
          alt={newCurrentInsight.title}
          width={1200}
          height={750}
          className="absolute inset-0 z-10 h-full w-full rounded-none border-none object-cover"
          {...getInspectorProps(newCurrentInsight.sys.id, 'insightBannerImage')}
        />
        <Container className="z-30 flex flex-col justify-end p-[1.25rem] md:p-[3.81rem]">
          <Box direction="col" className="space-y-[0.25rem] md:space-y-8">
            <Box className="">
              <div className="flex items-center gap-2 font-chalet-newyork text-base md:text-[1.5rem]">
                {newCurrentInsight.featured && (
                  <span
                    className="opacity-100"
                    {...getInspectorProps(newCurrentInsight.sys.id, 'featured')}
                  >
                    Featured
                  </span>
                )}
                <span
                  className="opacity-50"
                  {...getInspectorProps(newCurrentInsight.sys.id, 'category')}
                >
                  {newCurrentInsight.category}
                </span>
              </div>
            </Box>
            <Box direction="col" className="">
              <h1
                className="max-w-5xl font-chalet-newyork text-[1.75rem] md:text-[4rem] md:leading-[130%] md:tracking-[-0.12rem]"
                {...getInspectorProps(newCurrentInsight.sys.id, 'title')}
              >
                {newCurrentInsight.title}
              </h1>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Social Icons */}
      <Section className="relative bg-background dark:bg-text md:pt-16">
        <Container>
          {/* Author + Date (left) and Share (right) row under hero */}
          <div className="flex flex-col items-start justify-between gap-4 pb-6 md:flex-row md:items-center">
            <div className="text-sm text-maticblack md:text-base">
              <span>By </span>
              {newCurrentInsight.author ? (
                <>
                  <Link
                    href={newCurrentInsight.author.linkedIn || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue"
                  >
                    {newCurrentInsight.author.name || defaultCurrentInsight.author.name}
                  </Link>
                  {newCurrentInsight.author.title && (
                    <span className="ml-1">, {newCurrentInsight.author.title}</span>
                  )}
                </>
              ) : (
                <span>{defaultCurrentInsight.author.name}</span>
              )}
              {formattedDate && <span className="ml-2">• {formattedDate}</span>}
            </div>
            {newCurrentInsight.socialsCollection?.items &&
              newCurrentInsight.socialsCollection.items.length > 0 && (
                <div className="flex items-center gap-4 md:gap-6" aria-label="Share Article">
                  <span className="text-sm font-semibold uppercase text-maticblack md:mr-2">
                    Share Article
                  </span>
                  {newCurrentInsight.socialsCollection.items.map((social) => (
                    <a
                      key={social.sys.id}
                      href={social.name === 'LinkedIn' ? linkedInShareUrl : facebookShareUrl}
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
                </div>
              )}
          </div>
          {/* {newCurrentInsight.socialsCollection?.items &&
            newCurrentInsight.socialsCollection.items.length > 0 && (
              <Box direction="row" gap={4} className="justify-start md:hidden">
                {newCurrentInsight.socialsCollection.items.map((social) => (
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
            )} */}
          <div className="grid grid-cols-1 md:grid-cols-[921px_246px] md:gap-24">
            {/* Main Content */}
            <ErrorBoundary>
              <div className="mt-2 flex justify-center md:justify-start">
                <Prose>
                  {documentToReactComponents(newCurrentInsight.insightContent.json, renderOptions)}
                </Prose>
              </div>
            </ErrorBoundary>

            <Box direction="col" className="self-start flex flex-col md:sticky md:top-24 bg-maticblack">
              {/* Contact Us Card with background image */}
              <div className="relative overflow-hidden rounded-none">
                {/* Background image */}
                <Image
                  src="/insights/related-work.png"
                  alt="Contact background"
                  fill
                  sizes="(min-width: 768px) 246px, 100vw"
                  className="-z-10 rounded-none border-none object-cover"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0" />
                {/* Content */}
                <div className="relative p-6">
                  {/* Logo */}
                  <div className="mb-4">
                    <Image
                      src="/Matic%20Logo%20White.svg"
                      alt="Matic Digital"
                      width={140}
                      height={32}
                      className="h-auto w-[140px] rounded-none border-none"
                      priority
                    />
                  </div>
                  {/* Copy */}
                  <div className="space-y-3 text-background">
                    <p className="text-white">Have a project in mind? Let’s talk about how we can help bring it to life.</p>
                    <p className="text-white">Our team blends strategy, design, and engineering to deliver outcomes that matter.</p>
                  </div>
                  {/* Buttons */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="rounded-none border-2 border-white bg-white px-4 py-2 text-sm font-semibold text-[#000227] transition-colors hover:bg-white/90"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/services"
                      className="rounded-none border-2 border-white px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-white hover:text-[#000227]"
                    >
                      View Services
                    </Link>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Container>
      </Section>
      {newCurrentInsight.closingThoughts && (
        <Section className="bg-blue py-36">
          <Container>
            <div className="flex flex-col items-start justify-center text-background md:flex-row md:gap-12">
              <h2 className="mb-6 text-background md:mb-0">Closing thoughts</h2>
              <div className="w-full max-w-[500px]">
                <Prose className="[&_a]:text-background [&_a]:no-underline [&_a]:hover:text-background/90 [&_blockquote]:text-background [&_h1]:text-background [&_h2]:text-background [&_h3]:text-background [&_h4]:text-background [&_h5]:text-background [&_h6]:text-background [&_li]:text-background [&_p]:mt-0 [&_p]:text-background">
                  {documentToReactComponents(newCurrentInsight.closingThoughts.json, renderOptions)}
                </Prose>
              </div>
            </div>
          </Container>
        </Section>
      )}
      <Section className="m-4">
        <Container>
          <Box className="items-center justify-between">
            <h2 className="text-text">More entries</h2>
          </Box>
          <InsightsGrid
            variant="recent"
            initialInsights={allInsights.filter((i) => i.slug !== insight.slug)}
          />
        </Container>
      </Section>
    </>
  );
}
