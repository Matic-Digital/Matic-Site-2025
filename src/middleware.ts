import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Set Content Security Policy headers to allow Contentful resources
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' unpkg.com static.contentful.com *.contentful.com o2239.ingest.sentry.io;
    style-src 'self' 'unsafe-inline' *.contentful.com;
    img-src 'self' data: images.ctfassets.net *.contentful.com;
    font-src 'self' *.contentful.com;
    connect-src 'self' api.contentful.com cdn.contentful.com preview.contentful.com graphql.contentful.com *.contentful.com o2239.ingest.sentry.io;
    frame-src 'self' *.contentful.com;
    worker-src 'self' blob:;
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
