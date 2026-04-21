import { Container, Box, Section } from '@/components/global/matic-ds';
import {
  getServiceComponent,
  getWorkSnippet,
  getAllTestimonials,
  getAllIndustries,
  getPartnerItems,
  getAllClients
} from '@/lib/api';
import type {
  ServiceComponent,
  WorkSnippet,
  Testimonial,
  Industry,
  Item,
  Clients
} from '@/types/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { BlurFade } from '@/components/magicui/BlurFade';
import { PartnershipSectionVariant } from '@/components/global/PartnershipSectionVariant';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
import WorkCarouselSlider from '@/components/services/WorkCarouselSlider';
import { IndustryLineItem } from '@/components/services/IndustryLineItem';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { CTASection } from '@/components/global/CTASection';
import TestimonialsItems from '@/components/services/TestimonialsItems';
import { ClientPartnersSection } from '@/components/global/ClientPartnersSection';
import RecognitionTicker from '@/components/global/RecognitionTicker';
import type { TickerItem } from '@/components/global/RecognitionTicker';
import { ServiceScrollSection } from '@/components/services/ServiceScrollSection';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import DefaultHero from '@/components/global/DefaultHero';
import { type Metadata } from 'next';
import ThreeCardSection from '@/components/global/ThreeCardSection';

export const metadata: Metadata = {
  title: 'Branding, Web Design & Digital Growth Services | Matic Digital',
  description:
    'Matic Digital helps high-growth B2B brands with market strategy, branding, UX/UI and websites that turn strategic clarity into measurable growth.'
};

// services schema is injected in <head> via ServicesSchema component in the root layout

export default async function ServicesPage() {
  // Add error handling for API calls
  let serviceComponent: ServiceComponent | null = null;
  let workSnippet: WorkSnippet | null = null;
  let testimonials: Testimonial[] = [];
  let industries: Industry[] = [];
  let partnerItems: Item[] = [];
  let clients: Clients[] = [];

  try {
    serviceComponent = await getServiceComponent('1xHRTfLve3BvEp2NWD6AZm');
  } catch (error) {
    console.error('Error fetching service component:', error);
  }

  try {
    workSnippet = await getWorkSnippet('5nX0MRoFCRnM2KaJNvCW34');
  } catch (error) {
    console.error('Error fetching work snippet:', error);
  }

  try {
    testimonials = await getAllTestimonials();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  try {
    const industriesResponse = await getAllIndustries();
    industries = industriesResponse.items;
  } catch (error) {
    console.error('Error fetching industries:', error);
  }

  try {
    partnerItems = await getPartnerItems();
  } catch (error) {
    console.error('Error fetching partner items:', error);
  }

  try {
    clients = await getAllClients();
  } catch (error) {
    console.error('Error fetching clients:', error);
  }

  // Helper function to find industry by slug
  const findIndustryBySlug = (slug: string) => {
    return industries.find((industry) => industry.slug === slug);
  };

  const energyIndustry = findIndustryBySlug('energy');
  const martechIndustry = findIndustryBySlug('martech');
  const healthIndustry = findIndustryBySlug('health');

  // Filter industries with Default and NoPage variants for line items
  const defaultIndustries = industries.filter(
    (industry) =>
      !industry.pageVariant ||
      industry.pageVariant === 'Default' ||
      industry.pageVariant === 'NoPage'
  );

  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 67.5,
            theme: 'dark'
          },
          {
            percentage: 92,
            theme: 'light'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 50.5,
            theme: 'dark'
          },
          {
            percentage: 71,
            theme: 'light'
          },
          {
            percentage: 86.34,
            theme: 'dark'
          }
        ]}
      />
      <DefaultHero
        heading="Strategic clarity for high growth companies"
        subheading="We build brand and digital systems that turn strategic clarity into lasting growth."
        showButton={true}
        buttonHref="/contact"
        buttonText="Discuss a project"
      />
      <ThreeCardSection
        heading="Strategy in motion"
        description="Clarity on what to build. Speed to get it live. Systems that keep it working."
        blueBg={true}
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
            title: 'Lead with clarity',
            description:
              'We clarify goals, align teams, map the competitive landscape, and surface white space to deliver lasting outcomes.',
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
            overline: 'Activate',
            title: 'Strategy made tangible',
            description:
              'Insight without execution is just a deck. We move from strategy to live systems at a pace that keeps you ahead of the market.',
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
            title: 'Compounding momentum',
            description:
              "Markets move. Competitors adapt. We'll partner beyond the build, supporting the systems, evolving the strategy, and scaling the value.",
            backgroundImage: '/drive-bg.svg'
          }
        ]}
      />
      <Section className="relative overflow-x-clip pb-[5rem]">
        {/* Background image section - positioned absolute so it stays in place */}
        <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-[69.6875rem] w-auto">
          <Image
            src="/circle-bg-one.svg"
            alt=""
            width={1522}
            height={1115}
            className="h-full w-auto rounded-none border-none object-none"
            priority
          />
        </div>
        {/* Second background image - positioned in the middle, aligned left */}
        <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-[69.6875rem] w-auto">
          <Image
            src="/circle-bg-two.svg"
            alt=""
            width={1522}
            height={1115}
            className="h-full w-auto rounded-none border-none object-none"
            priority
          />
        </div>
        <Container className="px-[1.5rem] pt-[4rem]">
          <ServiceScrollSection services={serviceComponent?.servicesCollection?.items || []} />
        </Container>
      </Section>

      <Section className="dark overflow-visible bg-background">
        <Container className="overflow-visible">
          <TextAnimate animate="blurInUp" as="h2" by="line" className="md:max-w-[47.375rem]" once>
            {workSnippet?.heading ?? ''}
          </TextAnimate>
        </Container>
        <div className="mt-[5.25rem]">
          <WorkCarouselSlider samples={workSnippet?.samplesCollection?.items ?? []} />
        </div>
      </Section>

      <Section className="relative bg-maticblack">
        <div className="pointer-events-none absolute w-full opacity-75">
          <Image
            src="/industry-expertise-bg.png"
            alt=""
            width={1601}
            height={1601}
            className="h-full w-full rounded-none border-none"
            priority
          />
        </div>
        <Container className="relative z-10">
          <Box direction="col" className="gap-[3rem] py-[4rem]">
            <Box direction="col" className="gap-[1rem]">
              <h2 className="text-3xl text-maticblack text-white md:text-4xl">
                Industry expertise
              </h2>
              <p className="text-lg text-white md:text-xl">
                Industries where shared perspective and experience drive the strongest outcomes
              </p>
            </Box>

            {/* Industry expertise line items */}
            <Box direction="col" className="gap-0">
              {defaultIndustries.map((industry, index) => (
                <IndustryLineItem
                  key={industry.sys.id}
                  industry={industry}
                  isLast={index === defaultIndustries.length - 1}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Section>
      <PartnershipSectionVariant
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build technology with the most trusted and extensible platforms on the planet."
        partners={partnerItems}
      />
    </>
  );
}
