'use client';

import { useContentfulLiveUpdates } from '@contentful/live-preview/react';

type ContentfulEntry = {
  sys?: {
    id?: string;
  };
  contentTypeId?: string;
  fields?: Record<string, unknown>;
  title?: string;
  slug?: string;
  category?: string;
  postDate?: string;
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
export function useContentfulLiveUpdatesHook<T extends ContentfulEntry>(entry: T, options: LiveUpdatesOptions) {
  // Generate a deterministic subscription ID based on the entry ID
  // This ensures the same ID is used for both subscription and updates
  const entryId = entry?.sys?.id;
  const subscriptionId = entryId ? `insight-${entryId}-${options.locale}` : undefined;
  
  // For GraphQL data, we need to properly format the entry for live updates
  // The Contentful Live Preview SDK expects certain fields to be present
  const entryWithMetadata = {
    ...entry,
    __typename: 'Entry', // Use 'Entry' as the typename for GraphQL
    contentTypeId: entry.contentTypeId ?? 'insight', // Use provided content type ID or default to 'insight'
    // Include the subscription ID in the entry data
    subscriptionId,
    // Ensure fields property exists for REST API compatibility
    fields: entry.fields ?? {
      // Map GraphQL fields to REST format if needed
      title: { [options.locale]: entry.title },
      slug: { [options.locale]: entry.slug },
      category: { [options.locale]: entry.category },
      postDate: { [options.locale]: entry.postDate },
    }
  };
  
  // Log the prepared entry for debugging
  console.log('Preparing entry for live updates:', {
    id: entryId,
    subscriptionId,
    contentTypeId: entryWithMetadata.contentTypeId,
    hasFields: !!entryWithMetadata.fields
  });
  
  // Use the Contentful hook with our prepared data
  return useContentfulLiveUpdates(entryWithMetadata, options);
}

/**
 * Wrapper component for content that needs to be updated in real-time with Contentful
 */
interface ContentfulLivePreviewProps {
  children: React.ReactNode;
  isPreviewMode: boolean;
}

export function ContentfulLivePreviewProvider({ children, isPreviewMode }: ContentfulLivePreviewProps) {
  return (
    <div className={isPreviewMode ? 'contentful-live-preview' : ''}>
      {children}
    </div>
  );
}
