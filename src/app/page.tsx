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
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types/contentful';
import { ScrollProgress } from '@/components/global/ScrollProgress';

const colors = [
  'hsl(var(--blue))',
  'hsl(var(--green))',
  'hsl(var(--pink))',
  'hsl(var(--orange))'
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
            percentage: 5.24,
            theme: 'light'
          },
          {
            percentage: 13.30,
            theme: 'dark'
          },
          {
            percentage: 80,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 5,
            theme: 'dark'
          },
          {
            percentage: 60,
            theme: 'blue'
          }
        ]}
      />
        <Section className='relative flex flex-col -mt-24 pt-24 md:min-h-[906px] bg-background dark:bg-darkblue'>
          <Container className="flex-grow flex flex-col ">
            <Box direction="col" gap={4} className="flex-grow justify-center">
              <div className="transition-all text-[108px] text-center font-chalet-newyork text-darkblue dark:text-text font-normal leading-[100%] tracking-[-0.54px]">
                Change happens here.
              </div>
              <Box direction="col" gap={4} className="items-end">
                <Box className="" direction="col" gap={4}>
                  <p className="text-[2rem] leading-[140%] text-normal max-w-[603px]">We create brand, digital and team solutions for businesses at every stage.</p>
                  <Link href="/contact" className="flex text-[1.875rem] items-center gap-2">What we do <ArrowRight className="w-[1.25em] h-[1.25em]"/></Link>
                </Box>
              </Box>
            </Box>
          </Container>
          <Box className="z-40 absolute w-full h-[15px] bottom-0">
            <div className="bg-darkblue flex-grow"></div>
            <div className="bg-blue flex-grow"></div>
            <div className="bg-green flex-grow"></div>
            <div className="bg-pink flex-grow"></div>
            <div className="bg-orange flex-grow"></div>
            <div className="bg-purple flex-grow"></div>
          </Box>
        </Section>
        <Section className="bg-background dark:bg-text">
          <Container>
            <h1 className="text-text dark:text-background">{serviceComponent?.header}</h1>
          </Container>
        </Section>
        <Section className="py-0">
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
        <Section className='dark:bg-text m-4'>
          <Container>
            <Box className="items-center justify-between">
              <h1 className="dark:text-[hsl(var(--base-hsl))]">Journal</h1>
              <Link href="/insights" className='flex'>
                <p className="dark:text-[hsl(var(--base-hsl))]">All thinking and insights</p>
                <ArrowRight className='dark:text-[hsl(var(--base-hsl))]'/>
              </Link>
            </Box>
            <InsightsGrid variant="recent" insights={insights} />
          </Container>
        </Section>
        <SignalsSection logoRoute={'/signalsLogo.svg'} tagline={'Signals is a newsletter you’ll actually want to read'} subheader={'Sharp takes on business, design, and tech. No fluff, just the takeaways you need.'} />
        <CTASection backgroundImageRoute={'/cta-circle.svg'} secondaryBackgroundRoute={'/cta-secondary.svg'} sectionHeader={'Let’s get it together'} sectionSubheader={"Need a partner for what's next?"} ctaButtonText={'Get in touch'} />
      </>
  );
}
