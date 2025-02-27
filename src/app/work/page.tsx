'use client';

import DefaultHero from '@/components/global/DefaultHero';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { WorkGrid } from '@/components/work/WorkGrid';
import { getAllWork } from '@/lib/api';
import type { Work } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Work() {
  const { data: works, status } = useQuery({
    queryKey: ['works'],
    queryFn: () => getAllWork(),
    retry: 3,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const workGridRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <DefaultHero heading="Work, tactics and outcomes" subheading="We&apos;ve propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations." />
      <Section className="py-0">
        <WorkGrid
          works={works ?? []}
          status={status}
          _scrollRef={workGridRef}
        />
      </Section>
    </>
  );
}