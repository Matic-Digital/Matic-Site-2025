'use client';

import { ContentfulLivePreview } from '@contentful/live-preview';

/**
 * Initialize Contentful Live Preview when in preview mode
 * This function checks if the current page is in preview mode and sets up the SDK
 */
export async function initContentfulPreview(): Promise<void> {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const isPreviewMode = searchParams.get('preview') === 'true';
    
    if (isPreviewMode) {
      await ContentfulLivePreview.init({
        locale: 'en-US',
        enableInspectorMode: true,
        enableLiveUpdates: true,
        debugMode: true, // Enable debug mode to help troubleshoot
        // Add the space ID and environment to help with live updates
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '17izd3p84uup',
        environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
      });
      
      // Log that preview mode is initialized
      console.log('Contentful Live Preview initialized with live updates enabled');
    }
  }
}

/**
 * Cleanup function for Contentful Live Preview
 * Currently a placeholder as the SDK doesn't have a destroy method
 */
export function exitContentfulPreview(): void {
  // The SDK doesn't have a destroy method in the current version
  // This is a placeholder for future SDK versions that might include it
}
