import DefaultHero from '@/components/global/DefaultHero';
import { Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { WorkGrid } from '@/components/work/WorkGrid';
import { WorkGridSkeleton } from '@/components/work/WorkSkeleton';
import { getAllWork } from '@/lib/api';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// Metadata with canonical URL to consolidate SEO value for filtered pages
export const metadata: Metadata = {
  title: 'Work - Matic Digital',
  description:
    "We've propelled our partners into their next growth stage, transformed their business and driven lasting loyalty through meaningful collaborations.",
  alternates: {
    canonical: 'https://www.maticdigital.com/work'
  }
};

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
