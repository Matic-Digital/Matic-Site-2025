'use client';

import ServiceHero from '@/components/services/ServiceHero';
import { Container, Box, Section } from '@/components/global/matic-ds';
import { ServiceAsset } from '@/components/services/ServiceAsset';
import Image from 'next/image';
import type { Industry, ServiceComponent, Testimonial } from '@/types/contentful';
import { ServiceWorkSampleSlider } from '@/components/services/ServiceWorkSampleSlider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InsightsSectionServices } from '@/components/services/InsightsSectionServices';
import type { Insight } from '@/types';
import { CTASection } from '@/components/global/CTASection';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
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
          <h2 className="text-4xl text-maticblack md:text-5xl">
            We help companies navigate inflection points and create systems for lasting growth.
          </h2>
          {/* Display service items without scroll functionality */}
          {serviceComponent?.servicesCollection?.items &&
          serviceComponent.servicesCollection.items.length > 0 ? (
            <div className="mt-8 space-y-12 md:space-y-[5.44rem]">
              {serviceComponent.servicesCollection.items.map((service, _index) => (
                <div key={service.sys.id} className="relative w-full">
                  {/* Service info and asset section */}
                  <Box direction={{ base: 'col', lg: 'row' }} className="gap-8 lg:gap-8">
                    {/* Left side - Service info */}
                    <div className="flex-1">
                      <div className="sticky top-[14rem] z-10 bg-background">
                        <Box direction="col" className="h-full bg-white">
                          <Box
                            direction={{ base: 'col', md: 'row' }}
                            className="items-left gap-4 md:mb-4 md:items-center md:gap-[2.06rem]"
                          >
                            {service.bannerIcon?.url ? (
                              <Image
                                src={service.bannerIcon.url}
                                alt={service.name}
                                width={58}
                                height={58}
                                className="aspect-square w-[3.625rem] rounded-none border-none"
                              />
                            ) : (
                              <div className="flex aspect-square w-[3.625rem] items-center justify-center rounded-none border-none bg-gray-200">
                                <span className="text-xs text-gray-500">No Icon</span>
                              </div>
                            )}
                            <h3 className="whitespace-normal text-xl font-bold leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap md:text-2xl">
                              {service.name}
                            </h3>
                          </Box>
                          <div className="flex flex-col gap-[1.62rem] md:max-w-[38rem] md:pl-[5.75rem]">
                            <p className="mb-4 text-lg font-medium leading-[160%] tracking-[-0.0125rem] md:text-[1.25rem]">
                              {service.bannerCopy}
                            </p>

                            {/* Products section - in same container as description */}
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
                              {service.productList?.map((product) => (
                                <p
                                  key={product}
                                  className="whitespace-normal text-base leading-[160%] tracking-[-0.02rem] text-text/60 md:whitespace-nowrap"
                                >
                                  {product}
                                </p>
                              ))}
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>

                    {/* Right side - Service Asset - Normal Flow */}
                    {service.sampleProject?.serviceAsset?.url && (
                      <div className="h-[33.25rem] flex-1">
                        <div className="h-[33.25rem] w-full overflow-hidden rounded-lg">
                          <ServiceAsset
                            asset={service.sampleProject.serviceAsset}
                            serviceName={service.name}
                          />
                        </div>
                        {service.sampleProject.serviceAsset.description && (
                          <p className="mt-2 hidden text-sm text-text/60">
                            {service.sampleProject.serviceAsset.description}
                          </p>
                        )}
                      </div>
                    )}
                  </Box>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 p-8 text-center">
              <p className="text-lg text-text/60">
                Services are currently unavailable. Please check back later.
              </p>
            </div>
          )}
        </Container>
      </Section>
      <Section className="bg-[#F3F6F0]">
        <Container>
          <div className="flex flex-col items-stretch pb-[4.38rem] md:flex-row md:justify-between">
            <Box direction="col" className="flex-1 gap-[1.62rem] text-left">
              <p className="font-bold text-blue md:text-xl md:font-normal">
                {industry.workSampleSliderOverline ?? 'Our related work'}
              </p>
              <h2 className="text-4xl text-maticblack md:text-5xl">
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
                  <h1 className="text-2xl font-bold text-blue md:text-3xl md:font-normal">
                    <span className="opacity-60">01</span> Immersion
                  </h1>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Know everything.</span> We uncover customer insight,
                    category dynamics, and whitespace. This phase immerses us in your market,
                    audience, and operations to find new opportunities and unmet needs.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h1 className="text-2xl font-bold text-green md:text-3xl md:font-normal">
                    <span className="opacity-60">02</span> Creation
                  </h1>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Set the strategy. Build the system.</span> Together,
                    we define a clear vision, design brand systems, and architect the tools that
                    will power your growth with scaleable identity to backend infrastructure.
                  </p>
                </div>
              </Box>
              {/* Second Row: 03 and 04 */}
              <Box
                direction="col"
                className="gap-[2rem] md:flex-row md:gap-x-[4.25rem] md:gap-y-[2.62rem]"
              >
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h1 className="text-2xl font-bold text-orange md:text-3xl md:font-normal">
                    <span className="opacity-60">03</span> Implementation
                  </h1>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Bring it to life.</span> We activate your strategy
                    through marketing, websites, and digital platforms. Our team launches, connects,
                    and integrates the experiences that deliver measurable results.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-[2rem] md:max-w-[35.625rem] md:gap-[1.69rem]">
                  <div className="flex flex-col items-start gap-[0.75rem]">
                    <h1 className="text-2xl font-bold text-[#060EC2] md:text-3xl md:font-normal">
                      <span className="opacity-60">04</span> Transformation
                    </h1>
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

      <Section className="dark bg-[#060EC2]">
        <Container>
          <Carousel>
            <Box direction="col" className="relative">
              <CarouselNavigation />
              <p className="font-bold text-white md:text-xl md:font-normal">
                Reviews and references
              </p>
              <CarouselContent>
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.sys.id}>
                      <Box direction="col" className="min-h-[27rem] justify-between pt-16">
                        <blockquote className="border-none pl-0 text-[1.25rem] font-normal not-italic text-text md:w-[40.25rem] md:text-[2.25rem]">
                          &quot;{testimonial.quote}&quot;
                        </blockquote>
                        <Box direction="col" className="">
                          <p className="text-base font-semibold leading-[160%] tracking-[-0.0125rem] text-text md:text-[1.25rem]">
                            {testimonial.reviewer}
                          </p>
                          <p className="text-base font-normal leading-[160%] tracking-[-0.0125rem] text-text md:text-[1.25rem]">
                            {testimonial.position}
                          </p>
                          <Image
                            src="/ratings.svg"
                            alt="ratings"
                            width={107}
                            height={18}
                            className="rounded-none border-none"
                          />
                        </Box>
                      </Box>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <Box
                      direction="col"
                      className="min-h-[27rem] items-center justify-center pt-16"
                    >
                      <p className="text-lg text-text/60">
                        No testimonials available at this time.
                      </p>
                    </Box>
                  </CarouselItem>
                )}
              </CarouselContent>
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
