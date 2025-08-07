import { Container, Box, Section } from '@/components/global/matic-ds';
import { getServiceComponent, getWorkSnippet, getAllTestimonials } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { BlurFade } from '@/components/magicui/BlurFade';
import { PartnershipSectionVariant } from '@/components/global/PartnershipSectionVariant';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { CTASection } from '@/components/global/CTASection';

const partnerLogos = [
  { id: '1', logoUrl: '/partners/contentful.svg' },
  { id: '2', logoUrl: '/partners/figma.svg' },
  { id: '3', logoUrl: '/partners/hive.svg' },
  { id: '4', logoUrl: '/partners/hubspot.svg' },
  { id: '5', logoUrl: '/partners/notion.svg' },
  { id: '6', logoUrl: '/partners/shopify.svg' },
  { id: '7', logoUrl: '/partners/vercel.svg' },
  { id: '8', logoUrl: '/partners/webflow.svg' },
  { id: '9', logoUrl: '/partners/wordpress.svg' },
  { id: '10', logoUrl: '/partners/wordpress.svg' }
];

export default async function ServicesPage() {
  const serviceComponent = await getServiceComponent('1xHRTfLve3BvEp2NWD6AZm');
  const workSnippet = await getWorkSnippet('5nX0MRoFCRnM2KaJNvCW34');
  const testimonials = await getAllTestimonials();
  return (
    <>
      <Section>
        <Container className="px-[1.5rem] pt-[4rem]">
          <h1 className="text-maticblack">
            We help companies navigate inflection points and create systems for lasting growth.
          </h1>
          {/* Display service items without scroll functionality */}
          {serviceComponent?.servicesCollection?.items && (
            <div className="mt-8 space-y-12 md:space-y-[4.19rem]">
              {serviceComponent.servicesCollection.items.map((service, _index) => (
                <div key={service.sys.id} className="h-[33.25rem] w-full">
                  {/* Service info section */}
                  <div className="sticky top-0 z-10 bg-background">
                    <Box direction="col" className="gap-4">
                      <Box
                        direction={{ base: 'col', md: 'row' }}
                        className="items-left gap-4 md:mb-4 md:items-center md:gap-[2.06rem]"
                      >
                        <Image
                          src={service.bannerIcon?.url ?? ''}
                          alt={service.name}
                          width={58}
                          height={58}
                          className="aspect-square w-[3.625rem] rounded-none border-none"
                        />
                        <h3 className="whitespace-normal text-xl font-bold leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap md:text-2xl">
                          {service.name}
                        </h3>
                      </Box>
                      <div className="md:max-w-[38rem] md:pl-[5.75rem]">
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
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-[#F3F6F0]">
        <Container>
          <Box direction="col" className="gap-[3rem] py-[4rem]">
            <Box direction="col" className="gap-[1rem]">
              <h2 className="text-maticblack md:text-4xl">Your New Section Title</h2>
              <p className="text-lg text-maticblack/80 md:text-xl">
                Add your content description here. This is a placeholder section that you can
                customize with your specific content.
              </p>
            </Box>

            {/* Add your section content here */}
            <Box direction="col" className="gap-[2rem]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder content items */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold text-maticblack">Feature 1</h3>
                  <p className="text-maticblack/70">
                    Description of your first feature or service.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold text-maticblack">Feature 2</h3>
                  <p className="text-maticblack/70">
                    Description of your second feature or service.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-xl font-semibold text-maticblack">Feature 3</h3>
                  <p className="text-maticblack/70">
                    Description of your third feature or service.
                  </p>
                </div>
              </div>

              {/* 2-column, 3-row grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 1 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the first grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 2 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the second grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 3 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the third grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 4 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the fourth grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 5 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the fifth grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-maticblack">Grid Item 6 Heading</h3>
                  <p className="leading-relaxed text-maticblack/70">
                    Description for the sixth grid item. Add your content here to explain this
                    particular aspect of your service or offering.
                  </p>
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
            <Box className="flex flex-wrap gap-[1.25rem]">
              {workSnippet?.samplesCollection?.items.map((sample, index) => {
                const row = Math.floor(index / 3); // For 3 columns on desktop
                const delay = row * 0.1 + (index % 3) * 0.05; // Staggered delay based on row and column

                return (
                  <Link
                    href={`/work/${sample.slug}`}
                    key={sample.sys.id}
                    className="aspect-[4/3] w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.833rem)] md:min-w-[25rem]"
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
                          <p className="whitespace-normal text-text dark:text-background">
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
        partners={partnerLogos}
      />
      <Section>
        <Container>
          <Box direction="col" className="gap-[2rem]">
            <Box direction="col" className="gap-[2rem] md:gap-[4.44rem]">
              <Box direction="col" className="gap-[1.62rem] md:max-w-[48.5625rem]">
                <p className="font-bold text-blue md:text-xl">From insight to execution</p>
                <h2 className="text-4xl font-bold text-maticblack md:text-5xl md:font-normal">
                  Our Process
                </h2>
                <p className="text-maticblack md:text-2xl">
                  We move fast, with our tested structure that aligns teams early, sharpens purpose,
                  and delivers work that scales.
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
                <div className="flex w-full flex-col items-start gap-[0.75rem] md:max-w-[35.625rem]">
                  <h1 className="text-2xl font-bold text-[#060EC2] md:text-3xl md:font-normal">
                    <span className="opacity-60">04</span> Transformation
                  </h1>
                  <p className="text-maticblack md:text-xl">
                    <span className="font-bold">Scale & evolve.</span> With scalable systems,
                    measurable performance, and data-driven insight, your team is positioned for
                    growth, new technologies like AI, and adaptive resources. We stay involved to
                    help you measure what matters, learn from the data, and evolve continuously.
                  </p>
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
            <p className="font-bold text-blue md:text-xl">Matic recognition</p>
            <Box direction="col" className="gap-[2rem] md:gap-[4.44rem]">
              <div className="grid grid-cols-3 justify-items-center gap-x-[1.05rem] gap-y-[0.75rem] md:grid-cols-7 md:justify-items-stretch md:gap-[2.5rem] [&>*:nth-child(7)]:col-span-3 [&>*:nth-child(7)]:justify-self-center md:[&>*:nth-child(7)]:col-span-1 md:[&>*:nth-child(7)]:justify-self-auto">
                <Image
                  src="/best-in-industry.svg"
                  alt="Best in industry, Top Firm"
                  width={124}
                  height={124}
                  className="h-[6.81256rem] w-[6.81256rem] border-none md:h-[11.25rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-brand-messaging-company-colorado.svg"
                  alt="Top Brand Messaging Company Colorado"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-branding-company-energy-natural-resources.svg"
                  alt="Top Branding Company Energy Natural Resources"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-product-branding-company.svg"
                  alt="Top Product Branding Company"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-web-design-company-energy-natural-resources-united-states.svg"
                  alt="Top Web Design Company Energy Natural Resources United States"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-product-branding-company.svg"
                  alt="Top Product Branding Company"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
                />
                <Image
                  src="/top-clutch-user-experience-company-energy-natural-resources-united-states.svg"
                  alt="Top User Experience Company Energy Natural Resources United States"
                  width={124}
                  height={124}
                  className="h-[6.3205rem] w-[6.81256rem] border-none md:h-[10.4375rem] md:w-[11.25rem]"
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
              <CarouselContent>
                {testimonials.map((testimonial) => (
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
                ))}
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
