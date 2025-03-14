'use client';

import type { ReactNode } from 'react';

interface RecaptchaProviderProps {
  children: ReactNode;
}

// This component is no longer needed as we're using reCAPTCHA v2 directly
// But we're keeping it as a simple pass-through to avoid breaking changes
export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  return <>{children}</>;
}
