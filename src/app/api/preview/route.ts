import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// The secret used to verify the preview request is legitimate
const CONTENTFUL_PREVIEW_SECRET = 'mvYDl3PIkWTKRiCpgHVSaagkn-LTM_cfaxWGNB759Xw';

export async function GET(request: NextRequest) {
  // Parse query parameters
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('contentType');

  // Check the secret and validate other required parameters
  if (secret !== CONTENTFUL_PREVIEW_SECRET || !slug) {
    return NextResponse.json(
      { message: 'Invalid token or missing slug parameter' },
      { status: 401 }
    );
  }

  // Check content type and create appropriate response
  if (contentType === 'insights') {
    // Create response with redirect
    const response = NextResponse.redirect(new URL(`/insights/${slug}?preview=true`, request.url));

    // Set a cookie to enable preview mode
    response.cookies.set('preview-mode', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    return response;
  }

  if (contentType === 'work') {
    // Create response with redirect for work content
    const response = NextResponse.redirect(new URL(`/work/${slug}?preview=true`, request.url));

    // Set a cookie to enable preview mode
    response.cookies.set('preview-mode', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    return response;
  }

  // Default fallback if content type is not specified or not supported
  return NextResponse.json({ message: 'Invalid content type specified' }, { status: 400 });
}
