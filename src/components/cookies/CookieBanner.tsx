'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Container, Box } from '@/components/global/matic-ds';
import { Logo } from '@/components/global/Logo';
import { Button } from '@/components/ui/button';

const CONSENT_STORAGE_KEY = 'cookieConsent';

type ConsentValue = 'accepted' | 'rejected';

export function CookieBanner() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem(CONSENT_STORAGE_KEY) : null;
      if (!stored) {
        // No decision yet, show banner with slide-up animation
        setIsVisible(true);
      }
    } catch {
      // If localStorage is unavailable, still attempt to show the banner
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (value: ConsentValue) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
        // Notify listeners (e.g., ConsentGate) that consent has changed
        window.dispatchEvent(new Event('cookie-consent-changed'));
      }
    } catch {
      // Ignore storage errors; just proceed to hide banner
    }

    // Trigger slide-down animation by hiding the banner
    setIsVisible(false);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={[
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6',
        'transition-transform duration-500 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      ].join(' ')}
    >
      <Container
        width="full"
        className="pointer-events-auto w-full bg-blue text-white shadow-lg"
      >
        <Box className="flex flex-col gap-4 py-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-5">
          <Box className="flex flex-1 items-start gap-4">
            <div className="pointer-events-none flex h-10 w-10 shrink-0 items-center justify-center">
              <Logo className="h-6 w-auto text-white" />
            </div>
            <div className="text-sm leading-snug sm:text-[13px]">
              <p className="text-white text-sm">Hello! We use cookies to enhance site navigation, analyze usage, and support our marketing efforts.</p>
              <p className="mt-1 text-white text-sm">
                You can accept or decline cookies below. For more details, see our{' '}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Box>

          <Box className="mt-1 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="default"
              className="bg-maticblack px-4 py-2 text-sm font-medium text-white hover:bg-maticblack/90 w-full sm:w-auto rounded-none"
              onClick={() => handleChoice('rejected')}
            >
              Reject all
            </Button>
            <Button
              variant="default"
              className="bg-maticblack px-4 py-2 text-sm font-medium text-white hover:bg-maticblack/90 w-full sm:w-auto rounded-none"
              onClick={() => handleChoice('accepted')}
            >
              Accept all cookies
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
