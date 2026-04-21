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
import { ServiceCTADefault } from '@/components/services/ServiceCTADefault';
import { BankCTA } from '@/components/services/BankCTA';

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
        description={industry.heroDescription}
        overlineColor="text-blue"
        imageSrc="/service-subpage-hero-bg.svg"
        imageAlt={`${industry.name} industry solutions`}
        icon={industry.mainImage}
        buttonText={industry.heroButtonText}
        buttonLink={industry.heroButtonLink}
        pastClients={industry.pastClientsCollection?.items}
      />
      <Section className="bg-maticblack">
        <div className="flex flex-col items-stretch pb-[4.38rem] pl-[1.5rem] pr-[1.5rem] md:pl-[5.38rem] md:pr-[5.38rem]">
          <Box direction="col" className="flex-1 gap-[1.62rem] text-left">
            <h2 className="md:text-[2rem] text-[1.75rem] font-normal leading-[120%] tracking-[-0.06rem] text-white">
              {industry.workSampleSliderOverline ?? 'Our related work'}
            </h2>
            <p className="w-[75%] text-[1rem] text-white md:text-[1.75rem]">
              {industry.workSampleSliderHeader ??
                `Trusted by leaders shaping the future of ${industry.name.toLowerCase()}.`}
            </p>
          </Box>
        </div>
        <div className="mt-[5.25rem] pb-[5rem]">
          <ServiceWorkSampleSlider workSamples={industry?.workSamplesCollection?.items ?? []} />
        </div>
      </Section>
      <Section className="bg-white">
        <Container className="px-[1.5rem] pt-[4rem]">
          <ServiceScrollSection services={serviceComponent?.servicesCollection?.items || []} />
        </Container>
      </Section>
      {/* Bank CTA Section - Only shown when bankCta is true */}
      {industry.bankCta && <BankCTA />}
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
      {/* Insights Journal Section */}
      <InsightsSectionServices insights={insights} />

      {/* Service CTA Section - Default Style */}
      {industry.industryCta && (
        <ServiceCTADefault
          title={industry.industryCta.title}
          description={industry.industryCta.overline}
          buttonText={industry.industryCta.buttonText}
          buttonLink={industry.industryCta.buttonLink}
        />
      )}

      {/* FAQ Section */}
      {industry.faqItemsCollection?.items && industry.faqItemsCollection.items.length > 0 && (
        <FAQSection faqItems={industry.faqItemsCollection.items} />
      )}
    </>
  );
}
