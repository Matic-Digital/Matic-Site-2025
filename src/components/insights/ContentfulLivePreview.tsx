'use client';

import React from 'react';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';

type ContentfulEntry = {
  sys?: {
    id?: string;
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  contentTypeId?: string;
  fields?: Record<string, unknown>;
  title?: string;
  slug?: string;
  category?: string;
  postDate?: string;
  insightContent?: Record<string, unknown>;
  insightBannerImage?: Record<string, unknown>;
};

type LiveUpdatesOptions = {
  locale: string;
  skip: boolean;
};

/**
 * Custom hook to use Contentful live updates in components
 * @param entry The Contentful entry to watch for updates
 * @param options Options for the hook including locale and whether to skip updates
 * @returns The updated entry with live changes from Contentful
 */
export function useContentfulLiveUpdatesHook<T extends ContentfulEntry>(
  entry: T,
  options: LiveUpdatesOptions
) {
  // Prepare the entry for live updates if conditions are met
  const shouldUpdate = Boolean(entry && !options.skip && entry?.sys?.id);

  // Prepare a metadata object that will be used if shouldUpdate is true
  const preparedEntry = React.useMemo(() => {
    if (!shouldUpdate) return null;

    const entryId = entry.sys?.id;
    const subscriptionId = `insight-${entryId}-${options.locale}`;
    const contentTypeId = entry.contentTypeId ?? 'insight';

    // For GraphQL data, we need to properly format the entry for live updates
    const result = {
      ...entry,
      __typename: 'Entry',
      contentTypeId,
      subscriptionId,
      fields: entry.fields ?? {
        title: { [options.locale]: entry.title },
        slug: { [options.locale]: entry.slug },
        category: { [options.locale]: entry.category },
        postDate: { [options.locale]: entry.postDate },
        ...(entry.insightContent
          ? {
              insightContent: { [options.locale]: entry.insightContent }
            }
          : {}),
        ...(entry.insightBannerImage
          ? {
              insightBannerImage: { [options.locale]: entry.insightBannerImage }
            }
          : {})
      }
    };

    // Only log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preparing entry for live updates:', {
        id: entryId,
        subscriptionId,
        contentTypeId,
        hasFields: !!result.fields
      });
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, options.skip, options.locale, shouldUpdate]);

  // Always call the hook with a consistent parameter, even if it's a dummy value
  // This ensures we follow React's rules of hooks
  const liveUpdatedEntry = useContentfulLiveUpdates(
    shouldUpdate && preparedEntry ? preparedEntry : { sys: { id: 'dummy' } },
    { ...options, skip: !shouldUpdate || !preparedEntry }
  );

  // Return the appropriate value based on conditions
  return shouldUpdate && preparedEntry && liveUpdatedEntry.sys?.id !== 'dummy'
    ? (liveUpdatedEntry as unknown as T)
    : entry;
}

/**
 * Wrapper component for content that needs to be updated in real-time with Contentful
 */
interface ContentfulLivePreviewProps {
  children: React.ReactNode;
  isPreviewMode: boolean;
}

export function ContentfulLivePreviewProvider({
  children,
  isPreviewMode
}: ContentfulLivePreviewProps) {
  return <div className={isPreviewMode ? 'contentful-live-preview' : ''}>{children}</div>;
}
