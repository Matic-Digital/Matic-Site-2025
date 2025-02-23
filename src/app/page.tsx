import type { Metadata } from 'next';
import { getAllWork, getServiceComponent, getAllInsights, getAllTestimonials } from '@/lib/api';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import type { Service } from '@/types/contentful';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { HeroSection } from '@/components/home/HeroSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const colors = ['hsl(var(--blue))', 'hsl(var(--green))', 'hsl(var(--pink))', 'hsl(var(--orange))'];

const partnerLogos = [
  { id: '1', logoUrl: '/partners/contentful.svg' },
  { id: '2', logoUrl: '/partners/figma.svg' },
  { id: '3', logoUrl: '/partners/hive.svg' },
  { id: '4', logoUrl: '/partners/hubspot.svg' },
  { id: '5', logoUrl: '/partners/notion.svg' },
  { id: '6', logoUrl: '/partners/shopify.svg' },
  { id: '7', logoUrl: '/partners/vercel.svg' },
  { id: '8', logoUrl: '/partners/webflow.svg' },
  { id: '9', logoUrl: '/partners/wordpress.svg' }
];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Matic Digital',
  description: 'Matic Digital - Digital Product Agency'
};

export default async function HomePage() {
  const [insights, serviceComponent, works, testimonials] = await Promise.all([
    getAllInsights(),
    getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
    getAllWork(),
    getAllTestimonials()
  ]);

  if (!serviceComponent) {
    return null;
  }

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 0.01,
            theme: 'dark'
          },
          {
            percentage: 13.3,
            theme: 'dark'
          },
          {
            percentage: 82.77,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 0.01,
            theme: 'dark'
          },
          {
            percentage: 5.14,
            theme: 'light'
          },
          {
            percentage: 15.6,
            theme: 'dark'
          },
          {
            percentage: 84.74,
            theme: 'blue'
          }
        ]}
      />
      <div className="relative">
        <HeroSection />
      </div>
      <Section className="bg-background dark:bg-text">
        <Container>
          <h1 className="text-text pt-6 pb-8 dark:text-background">{serviceComponent?.header}</h1>
        </Container>
      </Section>
      <Section className="py-6 bg-background dark:bg-text space-y-8 -mb-1">
        {serviceComponent?.servicesCollection?.items.map((item: Service, index: number) => (
          <ServiceItem
            key={item.sys.id}
            item={item}
            colors={[colors[0] ?? '', colors[1] ?? '', colors[2] ?? '', colors[3] ?? '']}
            index={index}
          />
        ))}
      </Section>
      <WorkSection works={works.slice(0, 5)} />
      <PartnershipSection
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
        partners={partnerLogos}
      />
      <InsightsSection insights={insights} />
      <SignalsSection testimonials={testimonials} />
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        secondaryBackgroundRoute={'/cta-secondary.svg'}
        sectionHeader={'Let\'s get it together'}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
