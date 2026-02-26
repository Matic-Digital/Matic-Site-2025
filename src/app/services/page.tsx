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
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { CTASection } from '@/components/global/CTASection';
import TestimonialsItems from '@/components/services/TestimonialsItems';
import RecognitionTicker from '@/components/global/RecognitionTicker';
import type { TickerItem } from '@/components/global/RecognitionTicker';
import { ServiceAsset } from '@/components/services/ServiceAsset';
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

  // Filter industries with Default variant for line items
  const defaultIndustries = industries.filter(
    (industry) => !industry.pageVariant || industry.pageVariant === 'Default'
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
            percentage: 46.4,
            theme: 'dark'
          },
          {
            percentage: 65,
            theme: 'light'
          },
          {
            percentage: 84.5,
            theme: 'dark'
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
      />
      <Section className="pb-[5rem]">
        <Container className="px-[1.5rem] pt-[4rem]">
          {/* Display service items without scroll functionality */}
          {serviceComponent?.servicesCollection?.items &&
          serviceComponent.servicesCollection.items.length > 0 ? (
            <div className="mt-8 space-y-12 md:space-y-[20rem]">
              {serviceComponent.servicesCollection.items.map((service, _index) => (
                <div key={service.sys.id} className="relative w-full">
                  {/* Service info and asset section */}
                  <Box direction={{ base: 'col', lg: 'row' }} className="gap-8 lg:gap-8">
                    {/* Left side - Service info */}
                    <div className="flex-1">
                      <div className="sticky top-[14rem] z-10 bg-background">
                        <Box direction="col" className="h-full">
                          <h2 className="mb-4 whitespace-normal text-4xl font-medium leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap md:text-2xl">
                            {service.name}
                          </h2>
                          <div className="flex flex-col gap-[1.62rem] md:max-w-[38rem]">
                            <p className="mb-4 text-xl font-medium leading-[160%] tracking-[-0.0125rem] md:text-[1.25rem]">
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

                            {/* Button using bannerLinkCopy */}
                            {service.bannerLinkCopy && (
                              <div className="mt-4">
                                <Button variant="default" className="rounded-sm">
                                  {service.bannerLinkCopy}
                                </Button>
                              </div>
                            )}
                          </div>
                        </Box>
                      </div>
                    </div>

                    {/* Right side - Service Asset - Normal Flow */}
                    {service.sampleProject?.serviceAsset?.url && (
                      <div className="h-[40rem] flex-1">
                        <div className="h-[40rem] w-full overflow-hidden rounded-lg">
                          <ServiceAsset
                            asset={service.sampleProject.serviceAsset}
                            serviceName={service.name}
                          />
                        </div>
                        {service.sampleProject.serviceAsset.description && (
                          <p className="mt-2 hidden text-sm">
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

      <Section className="bg-maticblack">
        <Container>
          <Box direction="col" className="gap-[3rem] py-[4rem]">
            <Box direction="col" className="gap-[1rem]">
              <h2 className="text-3xl text-white text-maticblack md:text-4xl">Industry expertise</h2>
              <p className="text-lg text-white md:text-xl">
                Industries where shared perspective and experience drive the strongest outcomes
              </p>
            </Box>

            {/* Industry expertise line items */}
            <Box direction="col" className="gap-0">
              {defaultIndustries.map((industry, index) => {
                const isLast = index === defaultIndustries.length - 1;
                const clientList = industry.workSamplesCollection?.items
                  .map((work) => work.clientName)
                  .join(', ') || '';

                return (
                  <div
                    key={industry.sys.id}
                    className={`flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between ${!isLast ? 'border-b border-white/20' : ''}`}
                  >
                    <div className="flex w-full items-center gap-4 md:w-1/2">
                      {industry.mainImage?.url && (
                        <div className="flex h-12 w-12 items-center justify-center">
                          <Image
                            src={industry.mainImage.url}
                            alt={industry.name}
                            width={48}
                            height={48}
                            className="h-10 w-10 object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-medium text-white md:text-2xl">
                        {industry.name}
                      </h3>
                    </div>
                    <div className="w-full md:w-1/2">
                      <p className="text-base text-white/70 md:text-lg">
                        {clientList}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Box>
            {/* 2-column, 3-row grid */}
            {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    Fintech & Banking
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    ABN Amro, ING, Deloitte Digital, Glorifi, Mobile Coin, Anderson Advisors
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    Travel, Hospitality & Tourism
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    JetBlue,{' '}
                    <Link
                      href="/work/atlas-ocean-voyages"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      Atlas Ocean Voyages
                    </Link>
                    ,
                    <Link
                      href="/work/colorado"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      Colorado Tourism
                    </Link>
                    , Select Registry, Amtrak, West Hollywood, Louisiana Tourism
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    B2B Technology
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    <Link
                      href="/work/godaddy-registry"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      GoDaddy
                    </Link>
                    ,
                    <Link
                      href="/work/pluto-bio"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      Pluto Bio
                    </Link>
                    ,
                    <Link
                      href="/work/pir"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      PIR
                    </Link>
                    ,
                    <Link
                      href="/work/loomly"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      Loomly
                    </Link>
                    , Azira, Ventura, Centrana, Ballast, Soostone, Toast,
                    <Link
                      href="/work/teambuildr"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      TeamBuildr
                    </Link>
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    Startup
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    <Link
                      href="/work/pluto-bio"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      Pluto Bio
                    </Link>
                    ,
                    <Link
                      href="/work/hive-science"
                      className="font-semibold text-maticblack transition-colors hover:text-blue"
                    >
                      {' '}
                      Hive Science
                    </Link>
                    , KidCorp, Aqa, Nourished RX, ThingVC, GoodCare, Well
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    Non-profit
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    PIR, Net Beacon
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-maticblack md:text-3xl md:font-normal">
                    Other
                  </h3>
                  <p className="max-w-[35rem] leading-relaxed text-maticblack md:text-xl">
                    Protective Insurance, Eleven Madison, OfficeDepot, Cover Your Pergola, TWO12
                  </p>
                  <div className="h-[0.0625rem] max-w-[35rem] bg-[#D9D9D9]"></div>
                </div>
              </div> */}
          </Box>
        </Container>
      </Section>
      <PartnershipSectionVariant
        sectionHeader="Built by partnership"
        sectionSubheader="We partner and build with the most trusted and extensible platforms on the planet."
        partners={partnerItems}
      />
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
          <Carousel opts={{ align: 'start' }}>
            <Box direction="col" className="relative">
              <CarouselNavigation />
              <p className="font-bold text-white md:text-xl md:font-normal">
                Reviews and references
              </p>
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
