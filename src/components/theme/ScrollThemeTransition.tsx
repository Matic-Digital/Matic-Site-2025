'use client';

import React from 'react';
import { useThemeTransition } from '@/hooks/useThemeTransition';

interface ScrollThemeTransitionProps {
  children: React.ReactNode;
  topAligned?: boolean;
}

export function ScrollThemeTransition({ children, topAligned = false }: ScrollThemeTransitionProps) {
  const { targetRef } = useThemeTransition({ topAligned });

  return (
    <div ref={targetRef}>
      {children}
    </div>
  );
}
