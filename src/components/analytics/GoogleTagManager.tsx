'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Google Tag Manager component
 *
 * This component adds Google Tag Manager to the site.
 * It uses the Next.js Script component with the afterInteractive strategy
 * for optimal loading performance.
 */
export function GoogleTagManager({ id = 'G-L45B2MQDNJ' }: { id?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Push page view events to dataLayer when route changes
  useEffect(() => {
    if (!id || !pathname || typeof window === 'undefined') return;

    // Construct the URL from pathname and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Push pageview event to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: url
    });
  }, [pathname, searchParams, id]);

  // Return null if GTM ID is not provided
  if (!id) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');
          `
        }}
      />

      {/* Google Tag Manager (noscript) - Usually goes in body, but Next.js doesn't expose body element directly */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `
        }}
      />
    </>
  );
}

// Note: Window interface is likely already extended elsewhere in the project
// so we're not adding additional type declarations here to avoid conflicts
