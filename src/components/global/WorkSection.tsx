'use client';

import { Section } from '@/components/global/matic-ds';
import { WorkOverlayClient } from './WorkOverlayClient';
import { type Work } from '@/types';

interface WorkSectionProps {
  works: Work[];
}

export function WorkSection({ works }: WorkSectionProps) {
  // Reverse the order of works
  const reversedWorks = [...works].reverse();
  
  return (
    <Section id="work-section" className="!pt-0 !pb-0 bg-background">
      <WorkOverlayClient works={reversedWorks} />
    </Section>
  );
}
