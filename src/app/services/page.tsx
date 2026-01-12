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
  title: 'Digital Services for Growth | Matic Digital',
  description:
    'Transform your business with Matic Digitals tailored digital services, expertly crafted from strategy to execution. Drive measurable growth and achieve lasting success across diverse industries with our innovative solutions.'
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
                            <h2 className="whitespace-normal text-xl font-medium leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap md:text-2xl">
                              {service.name}
                            </h2>
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

      <Section className="bg-[#F3F6F0]">
        <Container>
          <Box direction="col" className="gap-[3rem] py-[4rem]">
            <Box direction="col" className="gap-[1rem]">
              <p className="font-bold text-blue md:text-xl md:font-normal">Industry expertise</p>
              <h2 className="text-3xl text-maticblack md:text-4xl">Where we specialize</h2>
              <p className="text-lg text-maticblack/80 md:text-xl">
                We support B2B businesses through every stage, combining versatile expertise with
                proven strength in key industries.
              </p>
            </Box>

            {/* Add your section content here */}
            <Box direction="col" className="gap-[2rem] md:gap-[6rem]">
              <div className="flex flex-wrap justify-center gap-5 md:justify-start">
                {/* Energy Industry Card */}
                <div
                  className="relative flex w-full min-w-[400px] flex-1 flex-col justify-between overflow-hidden rounded-lg shadow-sm"
                  style={{
                    backgroundImage: energyIndustry?.mainImage?.url
                      ? `url(${energyIndustry.mainImage.url})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '28.1875rem'
                  }}
                >
                  <div className="absolute"></div>
                  <div
                    className="relative z-10 flex flex-col gap-[1rem]"
                    style={{
                      paddingTop: '3.56rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <h3 className="mb-2 w-[70%] text-4xl text-white md:text-4xl">
                      {energyIndustry?.name}
                    </h3>
                    <p className="text-white md:text-lg">
                      We help energy companies evolve and scale through integrated brand, web, and
                      digital product solutions, driving transformation in a rapidly changing
                      industry.
                    </p>
                  </div>
                  <div
                    className="relative z-10"
                    style={{
                      paddingBottom: '3.06rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <Link href="/services/energy">
                      <Button className="w-full bg-white text-center text-black hover:bg-white/90">
                        Discover Energy solutions
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Martech Industry Card */}
                <div
                  className="relative flex w-full min-w-[400px] flex-1 flex-col justify-between overflow-hidden rounded-lg shadow-sm"
                  style={{
                    backgroundImage: martechIndustry?.mainImage?.url
                      ? `url(${martechIndustry.mainImage.url})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '28.1875rem'
                  }}
                >
                  <div className="absolute"></div>
                  <div
                    className="relative z-10 flex flex-col gap-[1rem]"
                    style={{
                      paddingTop: '3.56rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <h3 className="mb-2 w-[70%] text-4xl text-white md:text-4xl">
                      {martechIndustry?.name}
                    </h3>
                    <p className="text-white md:text-lg">
                      We help marketing and advertising technology companies accelerate growth with
                      brand, web, and product experiences built to scale and adapt to changing
                      markets.
                    </p>
                  </div>
                  <div
                    className="relative z-10"
                    style={{
                      paddingBottom: '3.06rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <Link href="/services/martech">
                      <Button className="w-full bg-white text-center text-black hover:bg-white/90">
                        Discover Martech & Adtech solutions
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Health Industry Card */}
                <div
                  className="relative flex w-full min-w-[400px] flex-1 flex-col justify-between overflow-hidden rounded-lg shadow-sm"
                  style={{
                    backgroundImage: healthIndustry?.mainImage?.url
                      ? `url(${healthIndustry.mainImage.url})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '28.1875rem'
                  }}
                >
                  <div className="absolute"></div>
                  <div
                    className="relative z-10 flex flex-col gap-[1rem]"
                    style={{
                      paddingTop: '3.56rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <h3 className="mb-2 w-[70%] text-4xl text-white md:text-4xl">
                      {healthIndustry?.name}
                    </h3>
                    <p className="text-white md:text-lg">
                      We partner with health and fitness innovators to build trusted, scalable brand
                      and digital solutions that improve engagement and deliver measurable impact in
                      rapidly evolving markets.
                    </p>
                  </div>
                  <div
                    className="relative z-10"
                    style={{
                      paddingBottom: '3.06rem',
                      paddingLeft: '2.56rem',
                      paddingRight: '2.56rem'
                    }}
                  >
                    <Link href="/services/health">
                      <Button className="w-full bg-white text-center text-black hover:bg-white/90">
                        Discover Health & Fitness solutions
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2-column, 3-row grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
              </div>
            </Box>
          </Box>
        </Container>
      </Section>

      <Section className="dark bg-background">
        <Container>
          <Box direction="col" className="gap-[5.25rem]">
            <TextAnimate animate="blurInUp" as="h2" by="line" className="md:max-w-[47.375rem]" once>
              {workSnippet?.heading ?? ''}
            </TextAnimate>
            <Box className="grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-3">
              {workSnippet?.samplesCollection?.items.map((sample, index) => {
                const row = Math.floor(index / 3); // For 3 columns on desktop
                const delay = row * 0.1 + (index % 3) * 0.05; // Staggered delay based on row and column

                return (
                  <Link
                    href={`/work/${sample.slug}`}
                    key={sample.sys.id}
                    className="aspect-[4/3] w-full"
                  >
                    <BlurFade
                      inView
                      inViewMargin="-100px"
                      direction="up"
                      useBlur={false}
                      delay={delay}
                      className="h-full w-full"
                    >
                      <div
                        style={{ backgroundColor: sample.snippetColor?.value ?? '#000000' }}
                        className="h-full w-full rounded-[0.5rem] p-[2rem]"
                      >
                        <Box direction="col" className="h-full justify-between">
                          <p className="whitespace-normal break-words text-text dark:text-background">
                            {sample.briefDescription}
                          </p>
                          <Image
                            src={sample.logo?.url ?? ''}
                            alt={sample.clientName}
                            width={176} /* 11rem = 176px */
                            height={40} /* 2.5rem = 40px */
                            className="h-[2.5rem] w-auto self-start rounded-none border-none object-contain brightness-0"
                          />
                        </Box>
                      </div>
                    </BlurFade>
                  </Link>
                );
              })}
            </Box>
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
