'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { env } from '@/env';

/**
 * Google Analytics component
 * 
 * This component adds Google Analytics tracking to the site.
 * It uses the Next.js Script component with the afterInteractive strategy
 * for optimal loading performance.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Track page views when the route changes
  useEffect(() => {
    // Skip if measurement ID is not provided or gtag is not available
    if (!measurementId || !pathname || !window.gtag) return;
    
    // Construct the URL from pathname and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Send pageview to Google Analytics
    window.gtag('config', measurementId, {
      page_path: url
    });
  }, [pathname, searchParams, measurementId]);
  
  // Return null if measurement ID is not provided
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
