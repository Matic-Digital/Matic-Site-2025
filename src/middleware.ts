import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Set Content Security Policy headers to allow Contentful resources and other third-party services
  const contentSecurityPolicy = `
    default-src 'self' https:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https: unpkg.com static.contentful.com *.contentful.com o2239.ingest.sentry.io *.sentry.io cmp.osano.com munchkin.marketo.net *.loom.com cdn.loom.com evs.sgmt.loom.com widget.clutch.co;
    style-src 'self' 'unsafe-inline' https: *.contentful.com *.loom.com cdn.loom.com;
    img-src 'self' data: https: images.ctfassets.net *.contentful.com *.loom.com cdn.loom.com chrome-extension:;
    font-src 'self' data: https: *.contentful.com *.loom.com cdn.loom.com;
    connect-src 'self' https: api.contentful.com cdn.contentful.com preview.contentful.com graphql.contentful.com *.contentful.com o2239.ingest.sentry.io *.sentry.io *.loom.com evs.sgmt.loom.com;
    frame-src 'self' https: *.contentful.com *.loom.com www.loom.com;
    worker-src 'self' blob:;
    media-src 'self' https: *.loom.com cdn.loom.com;
    upgrade-insecure-requests;
  `;

  // Determine if this is a preview request
  const isPreview = request.nextUrl.searchParams.has('preview') || 
                    request.cookies.has('preview-mode') ||
                    request.nextUrl.pathname.includes('/api/preview');

  // Set the headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add security headers
  response.headers.set('Content-Security-Policy', contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim());
  
  // Add CORS headers for preview requests
  if (isPreview) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
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
