'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const CONSENT_STORAGE_KEY = 'cookieConsent';

type ConsentValue = 'accepted' | 'rejected' | null;

type ConsentGateProps = {
  children: ReactNode;
};

export function ConsentGate({ children }: ConsentGateProps) {
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const readConsent = () => {
      try {
        const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentValue | null;
        if (stored === 'accepted' || stored === 'rejected') {
          setConsent(stored);
        } else {
          setConsent(null);
        }
      } catch {
        setConsent(null);
      }
    };

    // Initial read
    readConsent();

    // Listen for changes dispatched by CookieBanner
    window.addEventListener('cookie-consent-changed', readConsent);

    return () => {
      window.removeEventListener('cookie-consent-changed', readConsent);
    };
  }, []);

  if (consent !== 'accepted') {
    return null;
  }

  return <>{children}</>;
}
