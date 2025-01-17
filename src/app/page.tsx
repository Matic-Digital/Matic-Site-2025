// Next.js metadata types
import type { Metadata } from 'next';

import { Section } from '@/components/global/matic-ds';
import { HeroGradient } from '@/components/global/HeroGradient';

/**
 * Metadata configuration for SEO
 */
export const metadata: Metadata = {
  title: 'Contentful Next.js Starter',
  description: 'Contentful Next.js Starter'
};

/**
 * Landing page
 */
export default async function HomePage() {
  return (
    <Section className="relative !p-0">
      <HeroGradient text="Change happens here." />
    </Section>
  );
}
