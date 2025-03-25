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
      config: Record<string, unknown>;
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
    
    const initContentfulPreview = async (): Promise<void> => {
      if (typeof window !== 'undefined') {
        try {
          await ContentfulLivePreview.init({
            locale: 'en-US',
            enableInspectorMode: true,
            enableLiveUpdates: true,
            debugMode: true,
            space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '17izd3p84uup',
            environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
          });

          // Set additional configuration for the SDK
          if (window.contentfulLivePreview) {
            // Extend the configuration with additional properties
            window.contentfulLivePreview.config = {
              ...window.contentfulLivePreview.config,
              previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ?? '',
              deliveryToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
              useGraphQl: true,
            };

            // Set up entry URL resolution
            window.contentfulLivePreview.resolveEntryUrl = (entry: ContentfulEntry): string | undefined => {
              console.log('Resolving entry URL for:', entry);
              // For insights, use the slug to create the URL
              if (entry?.sys?.contentType?.sys?.id === 'insight') {
                const slug = entry.fields?.slug?.['en-US'];
                return slug ? `/insights/${slug}` : undefined;
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
        src="https://unpkg.com/@contentful/live-preview/dist/main.js"
        strategy="afterInteractive"
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
