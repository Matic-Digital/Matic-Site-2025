'use client';

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
      <Section className="min-h-screen">
        <Container className="mb-8">
          <Box direction="col" gap={8}>
            <Box direction="col" gap={4}>
              <TextAnimate animate="blurIn" as="h1" by="word" className="text-5xl font-medium">
                Work, tactics and outcomes
              </TextAnimate>
              <TextAnimate animate="blurIn" as="p" by="line" delay={2} className="max-w-lg">
                We&apos;ve propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations.
              </TextAnimate>
            </Box>
          </Box>
        </Container>
        <WorkGrid works={works ?? []} status={status} scrollRef={workGridRef} />
      </Section>
    </>
  );
}