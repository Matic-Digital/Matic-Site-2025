'use client';

import { PageTransition } from '@/components/transitions/PageTransition';

export default function Loading() {
  return (
    <PageTransition loading>
      <div className="min-h-screen" />
    </PageTransition>
  );
}
