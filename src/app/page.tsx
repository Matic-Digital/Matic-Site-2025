import type { Metadata } from 'next';
import {
  getAllWork,
  getServiceComponent,
  getAllInsights,
} from '@/lib/api';
import { ClientHero } from '@/components/global/ClientHero';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollThemeTransition } from '@/components/theme/ScrollThemeTransition';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/contentful';

const colors = [
  'hsl(var(--blue-hsl))',
  'hsl(var(--green-hsl))',
  'hsl(var(--pink-hsl))',
  'hsl(var(--yellow-hsl))'
];

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
  const [insights, serviceComponent, works] = await Promise.all([
    getAllInsights(),
    getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
    getAllWork()
  ]);

  if (!serviceComponent) {
    return null;
  }

  return (
    <>
      <ScrollThemeTransition theme="light">
        <ClientHero tagline={'Change happens here.'} subheader={'Matic creates brand, digital and team solutions for businesses at every stage.'} />
        <Section>
          <Container>
            <h1 className="">{serviceComponent?.header}</h1>
          </Container>
        </Section>
        <Section className="py-0">
          {serviceComponent?.servicesCollection?.items.map((item: Service, index: number) => (
            <ServiceItem key={item.sys.id} item={item} index={index} colors={colors} />
          ))}
        </Section>
      </ScrollThemeTransition>
      <ScrollThemeTransition theme="dark" topAligned>
        <WorkSection works={works.items} />
        <PartnershipSection 
          sectionHeader="Built by partnership"
          sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
          partners={partnerLogos}
        />
        <Section className='dark:bg-text m-4'>
          <Container>
            <Box className="items-center justify-between">
              <h1 className="dark:text-[hsl(var(--base-hsl))]">Journal</h1>
              <Link href="/insights" className='flex'>
                <p className="dark:text-[hsl(var(--base-hsl))]">All thinking and insights</p>
                <ArrowRight className='dark:text-[hsl(var(--base-hsl))]'/>
              </Link>
            </Box>
            <InsightsGrid variant="recent" insights={insights.items} />
          </Container>
        </Section>
        <SignalsSection logoRoute={'/signalsLogo.svg'} tagline={'Signals is a newsletter you’ll actually want to read'} subheader={'Sharp takes on business, design, and tech. No fluff, just the takeaways you need.'} />
      </ScrollThemeTransition>
      <ScrollThemeTransition theme="soft" topAligned>
        <CTASection backgroundImageRoute={'/cta-circle.svg'} secondaryBackgroundRoute={'/cta-secondary.svg'} sectionHeader={'Let’s get it together'} sectionSubheader={"Need a partner for what's next?"} ctaButtonText={'Get in touch'} />
      </ScrollThemeTransition>
    </>
  );
}
