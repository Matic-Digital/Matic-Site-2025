import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import {
  getServiceComponent,
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
import { ServiceScrollSectionVariant } from '@/components/about/ServiceScrollSectionVariant';

import { Suspense } from 'react';
import {
  type ServiceComponent,
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
//import FadingImage from '@/components/global/FadingImage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

interface AboutClientContentProps {
  headingGrid: HeaderGrid;
  clients: Clients[];
  serviceComponent: ServiceComponent;
  workCarousel: WorkCarousel | null;
  testimonials: Testimonial[];
}

function AboutClientContent({
  headingGrid,
  clients,
  serviceComponent,
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
            percentage: 51,
            theme: 'dark'
          },
          {
            percentage: 65,
            theme: 'light'
          },
          {
            percentage: 78.5,
            theme: 'dark'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 41,
            theme: 'dark'
          },
          {
            percentage: 58.7,
            theme: 'light'
          },
          {
            percentage: 75.5,
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
            {/* Temporarily disabling slideshow until assets are ready */}
            {/**
             * <FadingImage
             *   images={[
             *     'https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg',
             *     'https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg',
             *     'https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg',
             *   ]}
             *   alt="placeholder"
             *   className="h-full w-full rounded-none border-none"
             *   intervalMs={5000}
             * />
             */}
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

      <ServiceScrollSectionVariant serviceComponent={serviceComponent} />
      <Section className="bg-white md:pb-[5.44rem] md:pt-[4.19rem]">
        <Container>
          <div className="flex flex-col items-stretch gap-[2.69rem] md:flex-row md:justify-between">
            <Box direction="col" className="flex-1 gap-[1.62rem] text-left">
              <p className="font-bold text-blue md:text-xl md:font-normal">What we do</p>
              <h2 className="text-4xl text-maticblack md:text-5xl">Powering your next move</h2>
              <p className="max-w-3xl text-lg text-maticblack/80 md:text-3xl">
                Our team brings together market insight, strategic design, and digital execution to
                unlock long-term value.
              </p>
            </Box>
            <Link href="/services" className="self-start md:self-end">
              <Button>See all services</Button>
            </Link>
          </div>
          <Box
            direction={{ base: 'col', md: 'row' }}
            className="flex-1 gap-[2rem] pt-[2.5rem] text-left md:pt-[3.37rem]"
          >
            <p className="max-w-3xl text-maticblack md:text-xl">
              <span className="font-bold">
                Founded in 2021 and based in Denver, Matic Digital was created to meet the real and
                evolving needs of modern businesses.
              </span>{' '}
              What started as a core design studio quickly expanded into something more adaptable: a
              full-service partner focused on outcomes, powered by great talent and thoughtful
              systems.
            </p>
            <p className="max-w-3xl text-maticblack md:text-xl">
              <span className="font-bold">
                Today, Matic is both a full-stack agency and a flexible operating model.
              </span>{' '}
              Our Studio leads with strategy, design, and development. Matic Teams connects clients
              with top-tier specialists who embed seamlessly into their world. Whether launching a
              brand, rethinking a platform, or extending a team, we stay hands-on, efficient, and
              built to scale.
            </p>
          </Box>
        </Container>
      </Section>

      <Section className="dark bg-background">
        <Container>
          <TextAnimate animate="blurInUp" as="h1" by="line" className="pb-[6rem]" once>
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

      <Section className="bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction="col" className="justify-between space-y-8">
            <div className="flex flex-col items-stretch gap-[2.69rem] md:flex-row md:justify-between">
              <Box direction="col" className="flex-1 gap-[1.62rem] text-left">
                <p className="font-bold text-blue md:text-xl md:font-normal">The Matic framework</p>
                <h2 className="text-4xl text-maticblack md:text-5xl">Our philosophy</h2>
                <p className="max-w-3xl text-lg text-maticblack/80 md:text-3xl">
                  These principles define how we create solutions that bridge strategy, technology,
                  and audience needs.
                </p>
              </Box>
              <Link href="/services" className="self-start md:self-end">
                <Button>See all services</Button>
              </Link>
            </div>
            <Box className="flex w-full flex-col gap-x-8 gap-y-6">
              <Box className="flex flex-col gap-[2.69rem] md:flex-row">
                <ApproachText
                  number={1}
                  header="Be human"
                  copy="Technology should amplify, not replace, human value. Leverage AI to enhance insight, improve efficiency, and amplify human advantage."
                />
                <ApproachText
                  number={2}
                  header="Story is strategy"
                  copy="The best experiences tell a story shaped by real audience insight. We use data to craft narratives that resonate, connect, and create brand experiences that last."
                />
                <ApproachText
                  number={3}
                  header="Lead with insight"
                  copy="Learning drives growth. We foster constant discovery and turn user insights into strategies that evolve alongside the business."
                />
              </Box>
              <Box className="flex flex-col gap-[2.69rem] md:flex-row">
                <ApproachText
                  number={4}
                  header="Strip to the signal"
                  copy="Simplicity is power. We help brands remove noise, focus on what matters, and create experiences with clarity and purpose."
                />
                <ApproachText
                  number={5}
                  header="Anticipate the moment"
                  copy="User intent is the heartbeat of great digital products. We design systems that sense and respond in real time to meet people where they are."
                />
                <ApproachText
                  number={6}
                  header="Build for tomorrow"
                  copy="Scalable systems win. We help businesses build evergreen brands, future-forward websites, and strategic guidelines that evolve with their needs and ambitions."
                />
              </Box>
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
        clients={clients}
        workCarousel={workCarousel}
        testimonials={testimonials}
        headingGrid={headingGrid}
      />
    </Suspense>
  );
}
