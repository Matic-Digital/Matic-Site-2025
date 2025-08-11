'use client';

import ServiceHero from '@/components/services/ServiceHero';
import type { Industry } from '@/types/contentful';

interface ServicePageClientProps {
  industry: Industry;
  allIndustries: Industry[];
  isPreviewMode?: boolean;
}

export function findSecondBoxColor(slug: string) {
  switch (slug) {
    case 'energy':
      return 'bg-[#060EC2]';
    case 'martech':
      return 'bg-[#DD2590]';
    case 'health':
      return 'bg-[#12B76A]';
  }
}

export function ServicePageClient({
  industry,
  allIndustries: _allIndustries,
  isPreviewMode: _isPreviewMode = false
}: ServicePageClientProps) {
  return (
    <>
      {/* Service Hero Component */}
      <ServiceHero
        overline={industry.heroOverline}
        heading={industry.heroHeader}
        overlineColor="text-orange"
        imageSrc={industry.mainImage.url}
        imageAlt={`${industry.name} industry solutions`}
        firstBoxDescription={industry.heroCtaTitle}
        secondBoxDescription={industry.heroCtaDescription}
        secondBoxColor={findSecondBoxColor(industry.slug)}
      />
    </>
  );
}
