'use client';

import { type Work } from '@/types';
import { WorkOverlayClient } from './WorkOverlayClient';

interface WorkSectionProps {
  works: Work[];
}

export function WorkSection({ works }: WorkSectionProps) {
  // Reverse the order of works
  const reversedWorks = [...works].reverse();
  
  return (
    <div id="work-section" className="relative w-full bg-black">
      <WorkOverlayClient works={reversedWorks} />
    </div>
  );
}
