import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceComponent, getInsightsFromDifferentCategories, getAllWork, getFAQItems } from '@/lib/api';
import { PartnershipSection } from '@/components/global/PartnershipSection';
import { ClientPartnersSection } from '@/components/global/ClientPartnersSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container, Section } from '@/components/global/matic-ds';
import { CTASection } from '@/components/global/CTASection';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import type { Service } from '@/types/contentful';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import { HeroSection } from '@/components/home/HeroSection';
import { TextEffect } from '@/components/ui/text-effect';
import { FAQSection } from '@/components/global/FAQSection';

const colors = ['hsl(var(--blue))', 'hsl(var(--pink))', 'hsl(var(--green))', 'hsl(var(--orange))'];

const partnerLogos = [
  { id: '1', logoUrl: '/partners/contentful-logo.svg' },
  { id: '2', logoUrl: '/partners/webflow-logo.svg' },
  { id: '3', logoUrl: '/partners/vercel-logo.svg' },
  { id: '4', logoUrl: '/partners/nextjs-logo.svg' },
  { id: '5', logoUrl: '/partners/figma-logo.svg' },
  { id: '6', logoUrl: '/partners/wordpress-logo.svg' },
  { id: '7', logoUrl: '/partners/hubspot-logo.svg' },
  { id: '8', logoUrl: '/partners/shopify-logo.svg' },
  { id: '9', logoUrl: '/partners/hive-science-logo.svg' },
  { id: '10', logoUrl: '/partners/adobe-logo.svg' }
];

// Permanent logos (never rotate)
const permanentLogos = [
  { id: '1', logoUrl: '/partners/GD Registry Logo.svg', name: 'GoDaddy' },
  { id: '2', logoUrl: '/partners/nextrcker.svg', name: 'Nextracker' },
  { id: '9', logoUrl: '/partners/FFP.svg', name: 'FFP' }
];

// Rotating logos (cycle through the remaining positions)
const rotatingLogos = [
  { id: '3', logoUrl: '/partners/mogl.svg', name: 'MOGL' },
  { id: '4', logoUrl: '/partners/Pluto.svg', name: 'Pluto' },
  { id: '5', logoUrl: '/partners/org.svg', name: 'Org' },
  { id: '6', logoUrl: '/partners/loomly.svg', name: 'Loomly' },
  { id: '7', logoUrl: '/partners/teambuildr.svg', name: 'TeamBuildr' },
  { id: '8', logoUrl: '/partners/Azira logo white 1.svg', name: 'Azira' },
  { id: '10', logoUrl: '/partners/Well.svg', name: 'Well' },
  { id: '11', logoUrl: '/partners/Amtrak-Logo.svg', name: 'Amtrak' },
  { id: '12', logoUrl: '/partners/Colorado.svg', name: 'Colorado' },
  { id: '13', logoUrl: '/partners/JetBlue.svg', name: 'JetBlue' }
];

// Combined array for the component (used as fallback)
const allClientLogos = [...permanentLogos, ...rotatingLogos];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Digital Product Agency Denver | Web Design & Custom Software | Matic Digital',
  description:
    "Transform your digital presence with Matic Digital, Denver's leading product agency. We design exceptional websites, apps, and custom software that drive growth. Get started today."
};

export default async function HomePage() {
  const [insights, serviceComponent, works, faqItems] = await Promise.all([
    getInsightsFromDifferentCategories(),
    getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
    getAllWork(),
    getFAQItems()
  ]);

  if (!serviceComponent) {
    return null;
  }

  // Filter works to only include featured items and sort by order field
  const featuredWorks = works
    .filter((work) => work.isFeatured)
    .sort((a, b) => {
      // Handle undefined order values (place them at the end)
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      // Sort by order (ascending)
      return a.order - b.order;
    });

  console.log(`Found ${featuredWorks.length} featured works out of ${works.length} total works`);
  featuredWorks.forEach((work) => {
    console.log(`Featured work: ${work.clientName}, order: ${work.order}`);
  });

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 7.68,
            theme: 'light'
          },
          {
            percentage: 21.23,
            theme: 'dark'
          },
          {
            percentage: 89.85,
            theme: 'blue'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 0.01,
            theme: 'dark'
          },
          {
            percentage: 6.56,
            theme: 'light'
          },
          {
            percentage: 17.49,
            theme: 'dark'
          },
          {
            percentage: 85.31,
            theme: 'blue'
          }
        ]}
      />
      <div className="relative">
        <HeroSection />
      </div>
      <Section className="bg-background dark:bg-text">
        <Container>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <TextEffect
                as="h2"
                per="word"
                delay={2}
                className="pb-8 pt-6 text-text dark:text-background"
              >
                {serviceComponent?.header}
              </TextEffect>
              <TextEffect
                as="p"
                per="word"
                delay={2}
                className="whitespace-normal pb-8 text-text dark:text-background md:whitespace-nowrap"
              >
                {serviceComponent?.subheading ?? ''}
              </TextEffect>
            </div>
            <Link
              href="/services"
              className="mt-6 rounded-sm bg-text px-4 py-2 text-background transition-opacity hover:opacity-80 dark:bg-background dark:text-text"
            >
              Our Services
            </Link>
          </div>
        </Container>
      </Section>
      <Section className="-mb-1 space-y-4 bg-background py-6 pb-0 dark:bg-text md:space-y-8">
        {serviceComponent?.servicesCollection?.items.map((item: Service, index: number) => (
          <ServiceItem
            key={item.sys.id}
            item={item}
            colors={colors}
            index={index}
            isLast={index === serviceComponent.servicesCollection.items.length - 1}
            works={works}
          />
        ))}
      </Section>
      <WorkSection works={featuredWorks} />
      <PartnershipSection
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
        partners={partnerLogos}
      />
      <ClientPartnersSection
        sectionHeader="Trusted by industry leaders"
        sectionSubheader="Our clients"
        clients={allClientLogos}
        permanentClients={permanentLogos}
        rotatingClients={rotatingLogos}
      />
      <InsightsSection insights={insights} />
      <FAQSection faqItems={faqItems} />
      <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      />
    </>
  );
}
