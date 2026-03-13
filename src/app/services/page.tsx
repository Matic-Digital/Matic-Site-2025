import { Container, Box, Section } from '@/components/global/matic-ds';
import {
  getServiceComponent,
  getWorkSnippet,
  getAllTestimonials,
  getAllIndustries,
  getPartnerItems
} from '@/lib/api';
import type { ServiceComponent, WorkSnippet, Testimonial, Industry, Item } from '@/types/contentful';
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
import RecognitionTicker from '@/components/global/RecognitionTicker';
import type { TickerItem } from '@/components/global/RecognitionTicker';
import { ServiceScrollSection } from '@/components/services/ServiceScrollSection';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import DefaultHero from '@/components/global/DefaultHero';
import { type Metadata } from 'next';

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

  // Helper function to find industry by slug
  const findIndustryBySlug = (slug: string) => {
    return industries.find((industry) => industry.slug === slug);
  };

  const energyIndustry = findIndustryBySlug('energy');
  const martechIndustry = findIndustryBySlug('martech');
  const healthIndustry = findIndustryBySlug('health');

  // Filter industries with Default and NoPage variants for line items
  const defaultIndustries = industries.filter(
    (industry) => !industry.pageVariant || industry.pageVariant === 'Default' || industry.pageVariant === 'NoPage'
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
      <Section className="relative overflow-x-clip pb-[5rem]">
        {/* Background image section - positioned absolute so it stays in place */}
        <div className="pointer-events-none absolute right-0 -top-40 -z-10 h-[69.6875rem] w-auto">
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

      <Section className="dark bg-background overflow-visible">
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
        <div className="pointer-events-none absolute z-0 h-auto w-auto">
          <Image
            src="/industry-expertise-bg.svg"
            alt=""
            width={1601}
            height={1235}
            className="h-[77rem] w-full rounded-none border-none object-none"
            priority
          />
        </div>
        <Container className="relative z-10">
          <Box direction="col" className="gap-[3rem] py-[4rem]">
            <Box direction="col" className="gap-[1rem]">
              <h2 className="text-3xl text-white text-maticblack md:text-4xl">Industry expertise</h2>
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
      <Section className="dark bg-[#076EFF]">
        <Container>
          <Carousel opts={{ align: 'start' }}>
            <Box direction="col" className="relative">
              <CarouselNavigation />
              <Image
                src="/Brandmark.svg"
                alt="Matic Digital"
                width={94}
                height={39}
                className="h-[2.4375rem] w-[5.875rem] rounded-none border-none"
              />
              <TestimonialsItems testimonials={testimonials} />
            </Box>
          </Carousel>
        </Container>
      </Section>
      
    </>
  );
}
