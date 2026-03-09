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
      <Section className="bg-white">
        <Container>
          <Box direction="col" className="gap-[2rem]">
            <Box direction="col" className="gap-[2rem] md:gap-[4.44rem]">
              <Box direction="col" className="gap-[1.62rem] md:max-w-[48.5625rem]">
                <p className="font-bold text-blue md:text-xl">From insight to execution</p>
                <h2 className="text-4xl font-bold text-maticblack md:text-5xl md:font-normal">
                  Our Process
                </h2>
                <p className="text-maticblack md:text-2xl">
                  We close the gaps with our tested frameworks built to align teams early, sharpen
                  purpose, and deliver solutions that scale.
                </p>
              </Box>
              {/* Mobile Image */}
              <Image
                src="/services-our-process-mobile.svg"
                alt="Description mobile"
                width={124}
                height={124}
                className="h-auto w-full border-none md:hidden"
              />
              {/* Desktop Image */}
              <Image
                src="/services-our-process.svg"
                alt="Description"
                width={124}
                height={124}
                className="hidden h-auto w-full border-none md:block"
              />
            </Box>
            <Box direction="col" className="gap-[2rem] md:gap-[4.25rem]">
              {/* First Row: 01 and 02 */}
              <Box
                direction="col"
                className="gap-[2rem] md:flex-row md:gap-x-[4.25rem] md:gap-y-[2.62rem]"
              >
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h3 className="text-2xl font-bold text-blue md:text-3xl md:font-normal">
                    <span className="opacity-60">01</span> Immersion
                  </h3>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Know everything.</span> We uncover customer insight,
                    category dynamics, and whitespace. This phase immerses us in your market,
                    audience, and operations to find new opportunities and unmet needs.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h3 className="text-2xl font-bold text-green md:text-3xl md:font-normal">
                    <span className="opacity-60">02</span> Creation
                  </h3>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Set the strategy. Build the system.</span> Together,
                    we define a clear vision, design brand systems, and architect the tools that
                    will power your growth with scalable identity to backend infrastructure.
                  </p>
                </div>
              </Box>
              {/* Second Row: 03 and 04 */}
              <Box
                direction="col"
                className="gap-[2rem] md:flex-row md:gap-x-[4.25rem] md:gap-y-[2.62rem]"
              >
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h3 className="text-2xl font-bold text-orange md:text-3xl md:font-normal">
                    <span className="opacity-60">03</span> Implementation
                  </h3>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Bring it to life.</span> We activate your strategy
                    through marketing, websites, and digital platforms. Our team launches, connects,
                    and integrates the experiences that deliver measurable results.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[2rem] md:max-w-[35.625rem] md:gap-[1.69rem]">
                  <div className="flex flex-col items-start gap-[0.75rem]">
                    <h3 className="text-2xl font-bold text-[#060EC2] md:text-3xl md:font-normal">
                      <span className="opacity-60">04</span> Transformation
                    </h3>
                    <p className="text-maticblack md:text-xl">
                      <span className="font-bold">Scale & evolve.</span> With scalable systems,
                      measurable performance, and data-driven insight, your team is positioned for
                      growth, new technologies like AI, and adaptive resources. We stay involved to
                      help you measure what matters, learn from the data, and evolve continuously.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button className="whitespace-nowrap dark:bg-background dark:text-text">
                      Get in touch
                    </Button>
                  </Link>
                </div>
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>

      {/* Insights Journal Section */}
      <InsightsSectionServices insights={insights} />

      <Section className="bg-[#F3F6F0]">
        <Container>
          <Box direction="col" className="gap-[2rem]">
            <p className="font-bold text-blue md:text-xl md:font-normal">Matic recognition</p>
            <Box direction="col" className="gap-[2rem] md:gap-[4.44rem]">
              <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
                <RecognitionTicker
                  items={
                    [
                      {
                        src: '/best-in-industry.svg',
                        alt: 'Best in industry, Top Firm',
                        className:
                          'h-[6.81256rem] w-[6.81256rem] border-none md:h-[11.25rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-brand-messaging-company-colorado.svg',
                        alt: 'Top Brand Messaging Company Colorado',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-branding-company-energy-natural-resources.svg',
                        alt: 'Top Branding Company Energy Natural Resources',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-product-branding-company.svg',
                        alt: 'Top Product Branding Company',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-web-design-company-energy-natural-resources-united-states.svg',
                        alt: 'Top Web Design Company Energy Natural Resources United States',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-product-branding-company.svg',
                        alt: 'Top Product Branding Company',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      },
                      {
                        src: '/top-clutch-user-experience-company-energy-natural-resources-united-states.svg',
                        alt: 'Top User Experience Company Energy Natural Resources United States',
                        className:
                          'h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]',
                        href: 'https://clutch.co/profile/matic-digital',
                        newTab: true
                      }
                    ] as TickerItem[]
                  }
                  durationSec={30}
                />
              </div>
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
      <div className="dark bg-background">
        <CTASection
          sectionHeader={"Let's get it together."}
          sectionSubheader={"Need a partner for what's next?"}
          ctaButtonText={'Get in touch'}
          backgroundImageRoute="/about/cta.jpg"
        />
      </div>
    </>
  );
}
