import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Set Content Security Policy headers to allow Contentful resources and other third-party services
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' unpkg.com *.unpkg.com static.contentful.com *.contentful.com o2239.ingest.sentry.io *.sentry.io cmp.osano.com munchkin.marketo.net *.loom.com cdn.loom.com evs.sgmt.loom.com widget.clutch.co *.googletagmanager.com www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' *.contentful.com *.loom.com cdn.loom.com unpkg.com *.unpkg.com;
    img-src 'self' data: images.ctfassets.net *.contentful.com *.loom.com cdn.loom.com chrome-extension: *.googletagmanager.com www.google-analytics.com;
    font-src 'self' *.contentful.com *.loom.com cdn.loom.com data:;
    connect-src 'self' api.contentful.com cdn.contentful.com preview.contentful.com graphql.contentful.com *.contentful.com o2239.ingest.sentry.io *.sentry.io *.loom.com evs.sgmt.loom.com unpkg.com *.unpkg.com *.google-analytics.com *.analytics.google.com;
    frame-src 'self' *.contentful.com *.loom.com www.loom.com widget.clutch.co;
    worker-src 'self' blob:;
    media-src 'self' *.loom.com cdn.loom.com;
    frame-ancestors 'self' https://app.contentful.com;
  `;

  // Set the headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add security headers
  response.headers.set('Content-Security-Policy', contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim());
  
  return response;
}

// Only apply this middleware to pages that need Contentful preview
export const config = {
  matcher: [
    // Match all insight pages
    '/insights/:path*',
    // Match API routes for preview
    '/api/preview/:path*',
    '/api/exit-preview/:path*',
  ],
};
