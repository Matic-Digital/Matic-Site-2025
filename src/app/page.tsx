import type { Metadata } from 'next';
import { getServiceComponent, getAllInsights, getAllTestimonials, getAllWork } from '@/lib/api';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container, Section } from '@/components/global/matic-ds';
import { SignalsSection } from '@/components/global/SignalsSection';
import { CTASection } from '@/components/global/CTASection';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import type { Service } from '@/types/contentful';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { HeroSection } from '@/components/home/HeroSection';
import { TextEffect } from '@/components/ui/text-effect';

const colors = ['hsl(var(--blue))', 'hsl(var(--pink))', 'hsl(var(--green))', 'hsl(var(--orange))'];

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
    getAllInsights(3),
    getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
    getAllWork(),
    getAllTestimonials()
  ]);

  if (!serviceComponent) {
    return null;
  }

  // Filter works to only include featured items and sort by order field
  const featuredWorks = works
    .filter(work => work.isFeatured)
    .sort((a, b) => {
      // Handle undefined order values (place them at the end)
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      // Sort by order (ascending)
      return a.order - b.order;
    });
  
  console.log(`Found ${featuredWorks.length} featured works out of ${works.length} total works`);
  featuredWorks.forEach(work => {
    console.log(`Featured work: ${work.clientName}, order: ${work.order}`);
  });

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
            percentage: 5.83,
            theme: 'light'
          },
          {
            percentage: 14.34,
            theme: 'dark'
          },
          {
            percentage: 92.59,
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
            percentage: 86.77,
            theme: 'blue'
          }
        ]}
      />
      <div className="relative">
        <HeroSection />
      </div>
      <Section className="bg-background dark:bg-text">
        <Container>
          <TextEffect as="h1" per="word" delay={2} className="pb-8 pt-6 text-text dark:text-background">
            {serviceComponent?.header}
          </TextEffect>
          <TextEffect as="p" per="word" delay={2} className="pb-8 whitespace-normal md:whitespace-nowrap text-text dark:text-background">
            {serviceComponent?.subheading ?? ''}
          </TextEffect>
        </Container>
      </Section>
      <Section className="-mb-1 space-y-4 md:space-y-8 bg-background py-6 pb-0 dark:bg-text">
        {serviceComponent?.servicesCollection?.items.map((item: Service, index: number) => (
          <ServiceItem
            key={item.sys.id}
            item={item}
            colors={colors}
            index={index}
            isLast={index === serviceComponent.servicesCollection.items.length - 1}
          />
        ))}
      </Section>
      <WorkSection works={featuredWorks} />
      <PartnershipSection
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
        partners={partnerLogos}
      />
      <InsightsSection insights={insights} />
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        secondaryBackgroundRoute={'/cta-secondary.svg'}
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
