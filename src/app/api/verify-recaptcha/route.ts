import { NextResponse } from 'next/server';

interface RecaptchaRequest {
  token: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RecaptchaRequest;

    if (!body.token) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json(
      { error: 'Failed to verify reCAPTCHA' },
      { status: 500 }
    );
  }
}
