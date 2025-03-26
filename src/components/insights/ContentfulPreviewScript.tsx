'use client';

import { ContentfulLivePreview } from '@contentful/live-preview';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import Script from 'next/script';
import { useEffect } from 'react';

// Define types for Contentful entry structure
type ContentfulEntry = {
  sys?: {
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: {
    slug?: {
      'en-US'?: string;
    };
  };
};

// Extend Window interface to include Contentful Live Preview properties
declare global {
  interface Window {
    contentfulLivePreview?: {
      config?: Record<string, unknown>;
      resolveEntryUrl?: (entry: ContentfulEntry) => string | undefined;
    };
  }
}

interface ContentfulPreviewScriptProps {
  isPreviewMode: boolean;
}

export function ContentfulPreviewScript({ isPreviewMode, children }: ContentfulPreviewScriptProps & { children?: React.ReactNode }) {
  // Use effect to initialize Contentful Live Preview when in preview mode
  useEffect(() => {
    // Skip initialization if not in preview mode
    if (!isPreviewMode) return;
    
    // Create a flag to track initialization
    let isInitializing = false;
    
    const initContentfulPreview = async (): Promise<void> => {
      if (typeof window !== 'undefined') {
        try {
          // Check if SDK is already initialized or currently initializing to prevent multiple initializations
          if (window.contentfulLivePreview?.config || isInitializing) {
            console.log('Contentful Live Preview already initialized or initializing, skipping');
            return;
          }
          
          // Set flag to prevent concurrent initialization attempts
          isInitializing = true;
          
          // Clear any existing SDK state to prevent conflicts
          if (window.contentfulLivePreview) {
            console.log('Clearing existing Contentful Live Preview state');
            // We need to clear the state completely to avoid initialization issues
            window.contentfulLivePreview = undefined;
          }
          
          console.log('Initializing Contentful Live Preview...');
          
          await ContentfulLivePreview.init({
            locale: 'en-US',
            enableInspectorMode: true,
            enableLiveUpdates: true,
            debugMode: process.env.NODE_ENV !== 'production',
            space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '17izd3p84uup',
            environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
          });

          // Set additional configuration for the SDK
          if (window.contentfulLivePreview) {
            // Use type assertion to help TypeScript understand the structure
            const livePreview = window.contentfulLivePreview as {
              config?: Record<string, unknown>;
              resolveEntryUrl?: (entry: ContentfulEntry) => string | undefined;
            };
            
            // Extend the configuration with additional properties
            livePreview.config = {
              ...(livePreview.config ?? {}),
              previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ?? '',
              deliveryToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
              useGraphQl: true,
            };

            // Set up entry URL resolution
            livePreview.resolveEntryUrl = (entry: ContentfulEntry): string | undefined => {
              console.log('Resolving entry URL for:', entry);
              // For insights, use the slug to create the URL
              if (entry?.sys?.contentType?.sys?.id === 'insight') {
                const slug = entry.fields?.slug?.['en-US'] ?? undefined;
                // Use absolute URL with https to avoid mixed content issues
                const baseUrl = typeof window !== 'undefined' ? 
                  `${window.location.protocol}//${window.location.host}` : '';
                return slug ? `${baseUrl}/insights/${slug}?preview=true` : undefined;
              }
              return undefined;
            };
          }
          
          console.log('Contentful Live Preview initialized with live updates enabled', {
            space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
            environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
            previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ? 'Set' : 'Not set',
            deliveryToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? 'Set' : 'Not set'
          });
        } catch (error) {
          console.error('Failed to initialize Contentful Live Preview:', error);
        }
      }
    };
    
    // Run initialization
    void initContentfulPreview();
  }, [isPreviewMode]);
  
  // Return children if not in preview mode
  if (!isPreviewMode) return children ?? null;

  return (
    <>
      {/* Load the Contentful Live Preview SDK script */}
      <Script 
        src="https://unpkg.com/@contentful/live-preview@4.6.12/dist/main.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      
      {/* Initialize the Contentful Live Preview Provider */}
      <ContentfulLivePreviewProvider
        locale="en-US"
        enableInspectorMode={true}
        enableLiveUpdates={true}
      >
        {children}
        {/* Add global styles for Contentful UI elements */}
        <style jsx global>{`
          /* Hide any unwanted Contentful UI elements */
          .cf-wrapper-link {
            display: none !important;
          }
        `}</style>
      </ContentfulLivePreviewProvider>
    </>
  );
}
