import { type CapabilitiesResponse, type Hero, type WorkResponse } from '@/types/contentful';
import { getCapabilities, getHero, getAllWork } from '@/lib/api';
import { WhatWeDo } from '@/components/global/WhatWeDo';
import { WorkSection } from '@/components/global/WorkSection';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollFadeText } from '@/components/global/ScrollFadeText';
import { ClientHero } from '@/components/global/ClientHero';

/**
 * Landing page
 */
export default async function HomePage() {
  const [capabilities, hero, works] = await Promise.all([
    getCapabilities(),
    getHero(),
    getAllWork(),
  ]);

  if (!hero) {
    throw new Error('Failed to load hero content');
  }

  return (
    <>
      <ClientHero hero={hero} />
      <WhatWeDo capabilities={capabilities.items} />
      <WorkSection works={works.items} />
    </>
  );
}
