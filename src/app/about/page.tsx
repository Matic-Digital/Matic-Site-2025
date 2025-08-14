import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import {
  getServiceComponent,
  getWorkSnippet,
  getAllClients,
  getWorkCarousel,
  getAllTestimonials,
  getHeaderGrid
} from '@/lib/api';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ApproachText from '@/components/global/ApproachText';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { BlurFade } from '@/components/magicui/BlurFade';
import { ServiceScrollSection } from '@/components/about/ServiceScrollSection';

import { Suspense } from 'react';
import {
  type ServiceComponent,
  type WorkSnippet,
  type Clients,
  type WorkCarousel,
  type Testimonial,
  type HeaderGrid
} from '@/types';
import { notFound } from 'next/navigation';
import DefaultHero from '@/components/global/DefaultHero';
import Image from 'next/image';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { CTASection } from '@/components/global/CTASection';
import HeadingGrid from '@/components/global/HeadingGrid';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

interface AboutClientContentProps {
  headingGrid: HeaderGrid;
  clients: Clients[];
  serviceComponent: ServiceComponent;
  workSnippet: WorkSnippet;
  workCarousel: WorkCarousel | null;
  testimonials: Testimonial[];
}

function AboutClientContent({
  headingGrid,
  clients,
  serviceComponent,
  workSnippet,
  workCarousel,
  testimonials
}: AboutClientContentProps) {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 39.26,
            theme: 'dark'
          },
          {
            percentage: 53.69,
            theme: 'light'
          },
          {
            percentage: 63.74,
            theme: 'dark'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 33.16,
            theme: 'dark'
          },
          {
            percentage: 66.85,
            theme: 'light'
          },
          {
            percentage: 81.15,
            theme: 'dark'
          }
        ]}
      />
      <DefaultHero
        heading="A modern growth partner"
        subheading="We are an independent strategy, design, and technology agency. We craft comprehensive solutions through impactful projects and dedicated collaboration."
      />
      <Section className="py-0">
        <Container>
          <BlurFade
            inView
            inViewMargin="-100px"
            useBlur={false}
            className="mb-[3rem] h-full w-full"
          >
            <Image
              src="https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg"
              alt="placeholder"
              width={1024}
              height={683}
              className="h-full w-full rounded-none border-none object-cover"
            />
          </BlurFade>
          <HeadingGrid {...headingGrid} />
        </Container>
      </Section>

      <ServiceScrollSection serviceComponent={serviceComponent} />

      <Section className="dark bg-background">
        <Container>
          <Box direction="col" className="gap-[5.25rem]">
            <TextAnimate animate="blurInUp" as="h2" by="line" className="md:max-w-[47.375rem]" once>
              {workSnippet.heading}
            </TextAnimate>
            <Box className="flex flex-wrap gap-[1.25rem]">
              {workSnippet.samplesCollection?.items.map((sample, index) => {
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
      <Section className="dark bg-background">
        <Container>
          <TextAnimate animate="blurInUp" as="h2" by="line" className="pb-[6rem]" once>
            Clients
          </TextAnimate>
          <Box className="grid grid-cols-2 gap-x-[5.15rem] gap-y-[3.72rem] pb-[6rem] md:grid-cols-5">
            {clients.map((client, index) => {
              const row = Math.floor(index / 5); // For 5 columns on desktop
              const delay = row * 0.1 + (index % 5) * 0.05; // Staggered delay based on row and column

              return (
                <div key={client.sys.id} className="flex items-center justify-center">
                  <BlurFade
                    inView
                    inViewMargin="-100px"
                    direction="up"
                    useBlur={false}
                    delay={delay}
                  >
                    <Image
                      src={client.logo?.url ?? ''}
                      alt={client.clientName}
                      width={client.logo?.width ?? 100}
                      height={client.logo?.height ?? 100}
                      className="max-h-[3rem] w-fit rounded-none border-none object-contain opacity-60 brightness-0 invert"
                    />
                  </BlurFade>
                </div>
              );
            })}
          </Box>
        </Container>
      </Section>

      <Section className="relative flex min-h-[27rem] flex-col bg-background py-0 dark:bg-text dark:text-background">
        <div className="flex flex-grow flex-col">
          <div className="dark flex-grow bg-background"></div>
          <div className="flex-grow bg-background dark:bg-text dark:text-background"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-8 overflow-hidden">
          <InfiniteSlider duration={25} gap={48}>
            {workCarousel?.contentCollection?.items.map((item) => (
              <Image
                key={item.url}
                src={item.url}
                alt="Work carousel image"
                width={480}
                height={320}
                className="h-auto w-auto rounded-none border-none object-contain"
              />
            ))}
          </InfiniteSlider>
        </div>
      </Section>
      <Section className="bg-background py-24 dark:bg-text dark:text-background">
        <Container>
          <Box
            direction={{ base: 'col', md: 'row' }}
            className="items-left gap-8 md:items-center md:gap-4 md:gap-[12.56rem]"
          >
            <BlurFade
              inView
              inViewMargin="-100px"
              direction="up"
              useBlur={false}
              className="md:w-[52.0625rem]"
            >
              <p className="text-[1.75rem] font-light leading-[140%] text-text dark:text-background">
                <span className="font-semibold">
                  Strategy, creativity, and technology fuel business growth - adaptability drives it
                  forward.
                </span>{' '}
                We craft brands, design experiences, and build digital solutions, turning ideas into
                impact. Change isn&apos;t a challenge - it&apos;s our specialty.
              </p>
            </BlurFade>
            <BlurFade inView inViewMargin="-100px" direction="up" useBlur={false} delay={0.2}>
              <Link href="/contact">
                <Button className="whitespace-nowrap dark:bg-background dark:text-text">
                  Get in touch
                </Button>
              </Link>
            </BlurFade>
          </Box>
        </Container>
      </Section>

      <Section className="bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="justify-between space-y-8">
            <h2 className="dark:text-background">
              <TextAnimate
                animate="slideInUp"
                by="line"
                className="font-chalet-newyork text-[2.25rem] text-text dark:text-background"
                once
              >
                Our philosophy
              </TextAnimate>
            </h2>
            <Box className="max-w-[827px] flex-grow" direction="col" gap={6}>
              <ApproachText
                number={1}
                header="Be human"
                copy="Interact organically. Validate data through human connections at every opportunity."
              />
              <Box className="justify-end">
                <ApproachText
                  number={2}
                  header="Be conversational"
                  copy="Everything is dialogue. Your brand, app and interface is a conversation."
                />
              </Box>
              <Box className="">
                <ApproachText
                  number={3}
                  header="Learn constantly"
                  copy="Use every opportunity to learn about the user. Always use what we know."
                />
              </Box>
              <Box className="justify-end">
                <ApproachText
                  number={4}
                  header="Be intentional"
                  copy="Only show what's useful. Simplicity is powerful. Embrace it."
                />
              </Box>
              <ApproachText
                number={5}
                header="Respond to intent"
                copy="Technology enables brands to respond to user intent. Think everywhere. "
              />
              <Box className="justify-end">
                <ApproachText
                  number={6}
                  header="Think big"
                  copy="Base decisions on future-state needs and leverage all available data."
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background">
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

export default async function About() {
  const serviceComponent = await getServiceComponent('1xHRTfLve3BvEp2NWD6AZm');
  if (!serviceComponent) {
    notFound();
  }

  const workSnippet = await getWorkSnippet('5nX0MRoFCRnM2KaJNvCW34');
  if (!workSnippet) {
    notFound();
  }

  const clients = await getAllClients();
  if (!clients) {
    notFound();
  }

  const workCarousel = await getWorkCarousel('2vShIHrnO3GEi9A5Y6rtxJ');
  if (!workCarousel) {
    notFound();
  }

  const testimonials = await getAllTestimonials();
  if (!testimonials) {
    notFound();
  }

  const headingGrid = await getHeaderGrid('2tLmeLy2SL6MnV2gGBHz49');
  if (!headingGrid) {
    notFound();
  }

  return (
    <Suspense>
      <AboutClientContent
        serviceComponent={serviceComponent}
        workSnippet={workSnippet}
        clients={clients}
        workCarousel={workCarousel}
        testimonials={testimonials}
        headingGrid={headingGrid}
      />
    </Suspense>
  );
}
