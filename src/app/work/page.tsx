'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
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
      <Section className="min-h-screen">
        <Container>
          <Box direction="col" gap={8}>
            <Box direction="col" gap={4}>
              <h1 className="text-5xl font-medium">
                Work, tactics and outcomes
              </h1>
              <p className="max-w-lg">
                We&apos;ve propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations.
              </p>
            </Box>
          </Box>
        </Container>
        <Container className="mt-12">
          <div ref={workGridRef}>
            <WorkGrid works={works ?? []} status={status} scrollRef={workGridRef} />
          </div>
        </Container>
      </Section>
    </>
  );
}