'use client';

import { PageTransition } from "@/components/transitions/PageTransition";
import { Suspense } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageTransition>
        {children}
      </PageTransition>
    </Suspense>
  );
}
