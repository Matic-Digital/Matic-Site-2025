'use client';

import { PageTransition } from '@/components/transitions/PageTransition';
import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Function to scroll to top on page change - improves UX
function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background"></div>}>
      <ScrollToTop />
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}
