import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the redirect path from the query parameters or default to homepage
  const searchParams = request.nextUrl.searchParams;
  const redirectPath = searchParams.get('redirect') ?? '/';

  // Create response with redirect
  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  // Clear the preview cookie
  response.cookies.delete('preview-mode');

  return response;
}
