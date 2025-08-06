import DefaultHero from '@/components/global/DefaultHero';
import { Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { WorkGrid } from '@/components/work/WorkGrid';
import { WorkGridSkeleton } from '@/components/work/WorkSkeleton';
import { getAllWork } from '@/lib/api';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function WorkContent() {
  return (
    <Suspense fallback={<WorkGridSkeleton />}>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <DefaultHero
        heading="Work, tactics and outcomes"
        subheading="We've propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations."
      />
    </Suspense>
  );
}

export default async function Work() {
  const works = await getAllWork();

  return (
    <>
      <WorkContent />
      <Section className="py-0">
        <WorkGrid works={works ?? []} status="success" />
      </Section>
    </>
  );
}
