'use client';

import ServiceHero from '@/components/services/ServiceHero';
import { Container, Box, Section } from '@/components/global/matic-ds';
import { ServiceScrollSection } from '@/components/services/ServiceScrollSection';
import Image from 'next/image';
import type { Industry, ServiceComponent, Testimonial } from '@/types/contentful';
import { ServiceWorkSampleSlider } from '@/components/services/ServiceWorkSampleSlider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InsightsSectionServices } from '@/components/services/InsightsSectionServices';
import type { Insight } from '@/types';
import { CTASection } from '@/components/global/CTASection';
import { Carousel } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import TestimonialsItems from '@/components/services/TestimonialsItems';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import RecognitionTicker from '@/components/global/RecognitionTicker';
import type { TickerItem } from '@/components/global/RecognitionTicker';
import ThreeCardSection from '@/components/global/ThreeCardSection';
import { FAQSection } from '@/components/global/FAQSection';

interface ServicePageClientProps {
  industry: Industry;
  allIndustries: Industry[];
  serviceComponent?: ServiceComponent;
  testimonials: Testimonial[];
  insights: Insight[];
  isPreviewMode?: boolean;
}

export function findSecondBoxColor(slug: string) {
  switch (slug) {
    case 'energy':
      return 'bg-[#060EC2]';
    case 'martech':
      return 'bg-[#DD2590]';
    case 'health':
      return 'bg-[#12B76A]';
  }
}

export default function ServicePageClient({
  industry,
  allIndustries: _allIndustries,
  serviceComponent,
  testimonials,
  insights,
  isPreviewMode: _isPreviewMode = false
}: ServicePageClientProps) {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 11.3,
            theme: 'light'
          },
          {
            percentage: 83.5,
            theme: 'dark'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'dark'
          },
          {
            percentage: 12.5,
            theme: 'light'
          },
          {
            percentage: 83.5,
            theme: 'dark'
          }
        ]}
      />
      {/* Service Hero Component */}
      <ServiceHero
        overline={industry.heroOverline}
        heading={industry.heroHeader}
        overlineColor="text-orange"
        imageSrc={industry.mainImage.url}
        imageAlt={`${industry.name} industry solutions`}
        firstBoxDescription={industry.heroCtaTitle}
        secondBoxDescription={industry.heroCtaDescription}
        secondBoxColor={findSecondBoxColor(industry.slug)}
      />
      <Section className="bg-[#F3F6F0]">
        <Container>
          <div className="flex flex-col items-stretch pb-[4.38rem] md:flex-row md:justify-between">
            <Box direction="col" className="flex-1 gap-[1.62rem] text-left">
              <p className="font-bold text-blue md:text-xl md:font-normal">
                {industry.workSampleSliderOverline ?? 'Our related work'}
              </p>
              <h2 className="w-[75%] text-4xl text-maticblack md:text-5xl">
                {industry.workSampleSliderHeader ??
                  `Trusted by leaders shaping the future of ${industry.name.toLowerCase()}.`}
              </h2>
            </Box>
            <Link href="/work" className="self-start md:self-end">
              <Button>See our Work</Button>
            </Link>
          </div>
          <ServiceWorkSampleSlider workSamples={industry?.workSamplesCollection?.items ?? []} />
        </Container>
      </Section>
      <Section className="bg-white md:pt-[5rem]">
        <Container>
          <Box direction="col" className="gap-[1.62rem] text-left">
            <p className="font-bold text-blue md:text-xl md:font-normal">What we do</p>
            <h2 className="text-4xl text-maticblack md:text-5xl">Powering your next move</h2>
            <p className="max-w-3xl text-lg text-maticblack/80 md:text-3xl">
              Our team brings together market insight, strategic design, and digital execution to
              unlock long-term value.
            </p>
          </Box>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="px-[1.5rem] pt-[4rem]">
          <ServiceScrollSection services={serviceComponent?.servicesCollection?.items || []} />
        </Container>
      </Section>
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
            overline: 'Active',
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
      {/* Insights Journal Section */}
      <InsightsSectionServices insights={insights} />

      {/* FAQ Section */}
      {industry.faqItemsCollection?.items && industry.faqItemsCollection.items.length > 0 && (
        <FAQSection faqItems={industry.faqItemsCollection.items} />
      )}
    </>
  );
}
