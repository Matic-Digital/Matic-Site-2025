'use client';

import { useEffect } from 'react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import '@contentful/live-preview/style.css';

interface ContentfulPreviewInitializerProps {
  isPreviewMode: boolean;
}

export function ContentfulPreviewInitializer({ isPreviewMode }: ContentfulPreviewInitializerProps) {
  useEffect(() => {
    const initContentfulPreview = async (): Promise<void> => {
      if (isPreviewMode) {
        // Initialize Contentful Live Preview
        await ContentfulLivePreview.init({
          locale: 'en-US',
          enableInspectorMode: true,
          enableLiveUpdates: true,
          debugMode: false,
        });
      }
    };
    
    // Run initialization if in preview mode
    if (isPreviewMode) {
      void initContentfulPreview();
    }
    
    // No cleanup needed as the SDK doesn't have a destroy method
    return undefined;
  }, [isPreviewMode]);

  // This component doesn't render anything
  return null;
}
