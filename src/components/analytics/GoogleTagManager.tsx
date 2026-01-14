'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


/**
 * Google Analytics 4 component
 *
 * This component adds Google Analytics 4 (gtag) to the site.
 * It uses the Next.js Script component with the afterInteractive strategy
 * for optimal loading performance and tracks page views on route changes.
 */
export function GoogleTagManager({ id = 'G-JYYY36F61R' }: { id?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when route changes
  useEffect(() => {
    if (!id || !pathname || typeof window === 'undefined' || !window.gtag) return;

    // Construct the URL from pathname and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Send page view to Google Analytics
    window.gtag('config', id, {
      page_path: url,
    });
  }, [pathname, searchParams, id]);

  // Handle consent changes for GA tracking
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    const handleConsentChange = () => {
      try {
        const consent = window.localStorage.getItem('cookieConsent');
        
        if (consent === 'accepted') {
          // Grant consent for analytics
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted'
          });
        } else if (consent === 'rejected') {
          // Deny consent for analytics
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied'
          });
        }
      } catch (error) {
        console.warn('Failed to update GA consent:', error);
      }
    };

    // Set initial consent state
    handleConsentChange();

    // Listen for consent changes
    window.addEventListener('cookie-consent-changed', handleConsentChange);

    return () => {
      window.removeEventListener('cookie-consent-changed', handleConsentChange);
    };
  }, []);

  // Return null if GA ID is not provided
  if (!id) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 gtag script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      
      {/* Google Analytics 4 initialization */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Set default consent state (denied until user accepts)
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500
            });
            
            gtag('config', '${id}');
          `
        }}
      />
    </>
  );
}
