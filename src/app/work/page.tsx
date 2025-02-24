import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { WorkGrid } from '@/components/work/WorkGrid';
import { getAllWork } from '@/lib/api';
import type { Work } from '@/types';

export default async function Work() {
  const works = await getAllWork();

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
          <Container className="space-y-8 mb-8">
            <Box className="" direction="col" gap={4}>
              <h1 className="text-5xl font-medium">
                Work, tactics and outcomes
              </h1>
              <p className="max-w-lg">
                We&apos;ve propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations.
              </p>
            </Box>
          </Container>
          <WorkGrid works={works} />
      </Section>
    </>
  );
}