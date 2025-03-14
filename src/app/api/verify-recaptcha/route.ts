import { NextResponse } from 'next/server';

interface RecaptchaRequest {
  token: string;
}

interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RecaptchaRequest;

    if (!body.token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // For our simplified implementation, we're still accepting the mock tokens
    // but in a real implementation, this would be replaced with actual reCAPTCHA verification
    if (body.token.startsWith('human-verification-')) {
      // Simple validation - token should be recent (within last minute)
      const timestamp = parseInt(body.token.replace('human-verification-', ''));
      const now = Date.now();
      const isRecent = now - timestamp < 60000; // 1 minute
      
      if (isRecent) {
        return NextResponse.json({ success: true, verified: true });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            verified: false, 
            errors: ['Token expired'] 
          },
          { status: 400 }
        );
      }
    } 
    // If it's not our mock token, try to verify with Google reCAPTCHA
    else {
      // Get the secret key from environment variables
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      
      if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables');
        return NextResponse.json(
          { error: 'reCAPTCHA configuration error' },
          { status: 500 }
        );
      }

      // Verify the token with Google reCAPTCHA API
      const verificationURL = 'https://www.google.com/recaptcha/api/siteverify';
      const response = await fetch(verificationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: body.token,
        }),
      });

      const data = await response.json() as RecaptchaVerifyResponse;

      if (data.success) {
        return NextResponse.json({ success: true, verified: true });
      } else {
        console.error('reCAPTCHA verification failed:', data['error-codes']);
        return NextResponse.json(
          { 
            success: false, 
            verified: false, 
            errors: data['error-codes'] 
          },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error('Failed to verify token:', error);
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
