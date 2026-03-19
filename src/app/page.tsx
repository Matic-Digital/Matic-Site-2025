import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getServiceComponent,
  getInsightsFromDifferentCategories,
  getAllWork,
  getFAQItems,
  getPartnerItems,
  getAllIndustries
} from '@/lib/api';
import { ClientPartnersSection } from '@/components/global/ClientPartnersSection';
import { ServiceItem } from '@/components/services/ServiceItem';
import { Container, Section } from '@/components/global/matic-ds';
import { WorkSection } from '@/components/global/WorkSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import type { Service } from '@/types/contentful';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import HomepageHero from '@/components/global/HomepageHero';
import { TextEffect } from '@/components/ui/text-effect';
import { FAQSection } from '@/components/global/FAQSection';
import { PartnershipSectionVariant } from '@/components/global/PartnershipSectionVariant';
import ThreeCardSection from '@/components/global/ThreeCardSection';
import ServiceListVariant from '@/components/services/ServiceListVariant';
import IndustryCards from '@/components/global/IndustryCards';
import Image from 'next/image';

const colors = ['hsl(var(--blue))', 'hsl(var(--pink))', 'hsl(var(--green))', 'hsl(var(--orange))'];

/**
 * Landing page
 */
export const metadata: Metadata = {
  title: 'Digital Product Agency Denver | Web Design & Custom Software | Matic Digital',
  description:
    "Transform your digital presence with Matic Digital, Denver's leading product agency. We design exceptional websites, apps, and custom software that drive growth. Get started today."
};

export default async function HomePage() {
  const [insights, serviceComponent, works, faqItems, partnerItems, industriesData] =
    await Promise.all([
      getInsightsFromDifferentCategories(),
      getServiceComponent('1xHRTfLve3BvEp2NWD6AZm'),
      getAllWork(),
      getFAQItems(),
      getPartnerItems(),
      getAllIndustries(10) // Get up to 10 industries
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
            theme: 'light'
          },
          {
            percentage: 63.3,
            theme: 'dark'
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
      <HomepageHero
        title="We move ambitious brands"
        spanText="into category leaders"
        description="Matic transforms brands and designs the systems and platforms that drive business forward."
      />
      <WorkSection works={featuredWorks} />
      <ThreeCardSection
        heading="Why choose us"
        description="We combine strategic thinking with technical expertise to deliver exceptional results"
        cards={[
          {
            icon: (
              <Image
                src="/enable-icon.svg"
                alt="Enable"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            hoverIcon: (
              <Image
                src="/enable-icon-hover.svg"
                alt="Enable"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            overline: 'Enable',
            title: 'Strategic Approach',
            description:
              'We start with a deep understanding of your business goals and challenges to create solutions that drive real results.',
            backgroundImage: '/enable-bg.svg'
          },
          {
            icon: (
              <Image
                src="/activate-icon.svg"
                alt="Active"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            hoverIcon: (
              <Image
                src="/active-icon-hover.svg"
                alt="Active"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            overline: 'Active',
            title: 'Expert Execution',
            description:
              'Our team of specialists brings years of experience to deliver high-quality work on time and on budget.',
            backgroundImage: '/activate-bg.svg'
          },
          {
            icon: (
              <Image
                src="/drive-icon.svg"
                alt="Drive"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            hoverIcon: (
              <Image
                src="/drive-icon-hover.svg"
                alt="Drive"
                width={34}
                height={34}
                className="rounded-none border-none"
              />
            ),
            overline: 'Drive',
            title: 'Long-term Partnership',
            description:
              "We're committed to your success beyond project delivery, providing ongoing support and strategic guidance.",
            backgroundImage: '/drive-bg.svg'
          }
        ]}
      />
      <ServiceListVariant services={serviceComponent?.servicesCollection?.items || []} />
      <IndustryCards
        industries={industriesData.items || []}
        title="Industries where experience runs deep."
        description="We move those that move the world. These are where Matic has gathered valuable pattern recognition."
      />
      {/* <ClientPartnersSection
        sectionHeader="Trusted by industry leaders"
        sectionSubheader="Our clients"
        clients={allClientLogos}
        permanentClients={permanentLogos}
        rotatingClients={rotatingLogos}
      /> */}
      <InsightsSection insights={insights} />
      <FAQSection faqItems={faqItems} />
      {/* <PartnershipSectionVariant
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build technology with the most trusted and extensible platforms on the planet."
        partners={partnerItems}
      /> */}
      {/* <CTASection
        backgroundImageRoute={'/cta-circle.svg'}
        sectionHeader={"Let's get it together"}
        sectionSubheader={"Need a partner for what's next?"}
        ctaButtonText={'Get in touch'}
      /> */}
    </>
  );
}
