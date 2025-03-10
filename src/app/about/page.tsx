import { Container, Section, Box } from '@/components/global/matic-ds';
import { type Metadata } from 'next';
import {
  getServiceComponent,
  getWorkSnippet,
  getAllClients,
  getWorkCarousel,
  getAllTestimonials
} from '@/lib/api';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ApproachText from '@/components/global/ApproachText';
import { TextAnimate } from '@/components/magicui/TextAnimate';
import { Suspense } from 'react';
import {
  type ServiceComponent,
  type WorkSnippet,
  type Clients,
  type WorkCarousel,
  type Testimonial
} from '@/types';
import { notFound } from 'next/navigation';
import DefaultHero from '@/components/global/DefaultHero';
import Image from 'next/image';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';
import { CTASection } from '@/components/global/CTASection';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page'
};

interface AboutClientContentProps {
  clients: Clients[];
  serviceComponent: ServiceComponent;
  workSnippet: WorkSnippet;
  workCarousel: WorkCarousel | null;
  testimonials: Testimonial[];
}

function AboutClientContent({
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
            percentage: 42.02,
            theme: 'dark'
          },
          {
            percentage: 65.26,
            theme: 'light'
          },
          {
            percentage: 81.51,
            theme: 'dark'
          }
        ]}
        mobileBreakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
          {
            percentage: 26.36,
            theme: 'dark'
          },
          {
            percentage: 64.22,
            theme: 'light'
          },
          {
            percentage: 79.34,
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
          <Image
            src="https://images.ctfassets.net/17izd3p84uup/7HVu1INjNXqdXvdi6Ot3Nz/5b2ed22196bada6240c272cd35828634/Mask_group.svg"
            alt="placeholder"
            width={1024}
            height={683}
            className="h-full w-full rounded-none border-none object-cover"
          />
          <Box className="mt-4 md:mt-[5.12rem] md:grid md:grid-cols-3 flex-col items-start md:items-center gap-y-8 md:gap-y-[5.62rem]">
            <Box direction="col">
              <h1 className="">2021</h1>
              <p className="">Year founded</p>
            </Box>
            <Box direction="col">
              <h1 className="">60+</h1>
              <p className="">Projects delivered</p>
            </Box>
            <Box direction="col" className="">
              <h1 className="pb-[0.875rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="177"
                  height="35"
                  viewBox="0 0 177 35"
                  fill="none"
                >
                  <path
                    d="M16.7037 0.581025L20.1191 12.6908H31.2546C31.9661 12.6908 32.2863 13.7509 31.6815 14.2402L22.6806 21.7426L26.1315 33.8523C26.345 34.627 25.5623 35.2794 24.9931 34.7901L15.9922 27.3285L6.99124 34.8309C6.42201 35.3202 5.60375 34.6678 5.85278 33.8931L9.30373 21.7833L0.302814 14.2851C-0.266414 13.7958 0.0181997 12.7357 0.729734 12.7357H11.8652L15.2806 0.581025C15.4941 -0.193675 16.4902 -0.193675 16.7037 0.581025Z"
                    fill="#000227"
                  />
                  <path
                    d="M52.7037 0.581025L56.1191 12.6908H67.2546C67.9661 12.6908 68.2863 13.7509 67.6815 14.2402L58.6806 21.7426L62.1315 33.8523C62.345 34.627 61.5623 35.2794 60.9931 34.7901L51.9921 27.3285L42.9912 34.8309C42.422 35.3202 41.6037 34.6678 41.8528 33.8931L45.3037 21.7833L36.3028 14.281C35.7336 13.7917 36.0182 12.7316 36.7297 12.7316H47.8653L51.2806 0.581025C51.4941 -0.193675 52.4902 -0.193675 52.7037 0.581025Z"
                    fill="#000227"
                  />
                  <path
                    d="M88.7037 0.581025L92.119 12.6908H103.255C103.966 12.6908 104.286 13.7509 103.681 14.2402L94.6806 21.7426L98.1315 33.8523C98.345 34.627 97.5623 35.2794 96.9931 34.7901L87.9921 27.3286L78.9912 34.8309C78.422 35.3202 77.6037 34.6678 77.8528 33.8931L81.3037 21.7833L72.3028 14.281C71.7336 13.7917 72.0182 12.7316 72.7297 12.7316H83.8653L87.2806 0.581025C87.4941 -0.193675 88.4902 -0.193675 88.7037 0.581025Z"
                    fill="#000227"
                  />
                  <path
                    d="M124.704 0.581025L128.119 12.6908H139.255C139.966 12.6908 140.286 13.7509 139.681 14.2402L130.681 21.7426L134.132 33.8523C134.345 34.627 133.562 35.2794 132.993 34.7901L123.992 27.3285L114.991 34.8309C114.422 35.3202 113.604 34.6678 113.853 33.8931L117.304 21.7833L108.303 14.281C107.734 13.7917 108.018 12.7316 108.73 12.7316H119.865L123.281 0.581025C123.494 -0.193675 124.49 -0.193675 124.704 0.581025Z"
                    fill="#000227"
                  />
                  <path
                    d="M161.226 0.581025L164.748 12.6908H176.231C176.965 12.6908 177.295 13.7509 176.672 14.2402L167.389 21.7426L170.948 33.8523C171.168 34.627 170.361 35.2794 169.774 34.7901L160.492 27.3285L151.21 34.8309C150.623 35.3202 149.779 34.6678 150.036 33.8931L153.594 21.7833L144.312 14.281C143.725 13.7917 144.019 12.7316 144.753 12.7316H156.236L159.758 0.581025C159.978 -0.193675 161.006 -0.193675 161.226 0.581025Z"
                    fill="#000227"
                  />
                </svg>
              </h1>
              <p className="">Clutch rating</p>
            </Box>
            <Box direction="col" className="col-span-2 pb-[5rem]">
              <h1 className="">Denver, Colorado</h1>
              <p className="">Headquarters</p>
            </Box>
          </Box>
          <hr />
        </Container>
      </Section>

      <Section>
        <Container>
          <Box className="hidden gap-x-[6.125rem] pb-[4rem] md:grid" cols={2}>
            <h4 className="">What we do</h4>
            <h4 className="">Things we make</h4>
          </Box>
          <Box direction="col" className="">
            <Box className="flex-wrap md:gap-[17.125rem]" direction="col">
              {serviceComponent?.servicesCollection?.items.map((service) => (
                <Box
                  direction={{ base: 'col', md: 'row' }}
                  className="w-full gap-x-[6.125rem]"
                  cols={{ base: 1, md: 2 }}
                  key={service.sys.id}
                >
                  <Box className="">
                    <Box direction="col" className="">
                      <Box className="items-center gap-[2.06rem]">
                        <Image
                          src={service.bannerIcon?.url ?? ''}
                          alt={service.name}
                          width={100}
                          height={100}
                          className="aspect-square w-[3.625rem] rounded-none border-none"
                        />
                        <h3 className="leading-[120%] tracking-[-0.06rem]">{service.name}</h3>
                      </Box>
                      <p className="pl-[5.75rem] text-[1.25rem] font-medium leading-[160%] tracking-[-0.0125rem]">
                        {service.bannerCopy}
                      </p>
                    </Box>
                  </Box>
                  <Box className="pl-[4.1rem] pt-4 md:pl-0 md:pt-0" cols={{ base: 1, md: 2 }}>
                    {service.productList?.map((product) => (
                      <p
                        key={product}
                        className="text-[0.875rem] leading-[160%] tracking-[-0.02rem] text-text/60 md:text-base"
                      >
                        {product}
                      </p>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Section>

      <Section className="dark bg-background">
        <Container>
          <Box direction="col" className="gap-[5.25rem]">
            <h2 className="md:max-w-[47.375rem]">{workSnippet.heading}</h2>
            <Box className="flex-wrap gap-[1.25rem]">
              {workSnippet.samplesCollection?.items.map((sample) => (
                <div
                  key={sample.sys.id}
                  style={{ backgroundColor: sample.snippetColor?.value ?? '#000000' }}
                  className="h-[19.25rem] w-[25.6875rem] rounded-[0.5rem] p-[2rem]"
                >
                  <Box direction="col" className="h-full justify-between">
                    <p className="dark:text-background text-text">{sample.briefDescription}</p>
                    <Image
                      src={sample.logo?.url ?? ''}
                      alt={sample.clientName}
                      width={176} /* 11rem = 176px */
                      height={40} /* 2.5rem = 40px */
                      className="h-[2.5rem] w-auto self-start rounded-none border-none object-contain brightness-0"
                    />
                  </Box>
                </div>
              ))}
            </Box>
          </Box>
        </Container>
      </Section>
      <Section className="dark bg-background">
        <Container>
          <h1 className="pb-[6rem]">Clients</h1>
          <Box className="grid grid-cols-2 md:grid-cols-5 gap-x-[5.15rem] gap-y-[3.72rem] pb-[6rem]">
            {clients.map((client) => (
              <Image
                key={client.sys.id}
                src={client.logo?.url ?? ''}
                alt={client.clientName}
                width={client.logo?.width ?? 100}
                height={client.logo?.height ?? 100}
                className="max-h-[3rem] w-fit rounded-none border-none object-contain opacity-60 brightness-0 invert"
              />
            ))}
          </Box>
        </Container>
      </Section>

      <Section className="relative flex min-h-[27rem] flex-col py-0">
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
          <Box direction={{ base: 'col', md: 'row' }} className="items-center gap-4 md:gap-[12.56rem]">
            <p className="text-[1.75rem] font-light leading-[140%] md:w-[52.0625rem]">
              <span className="font-semibold">
                Strategy, creativity, and technology fuel business growth - adaptability drives it
                forward.
              </span>{' '}
              We craft brands, design experiences, and build digital solutions, turning ideas into
              impact. Change isn&apos;t a challenge - it&apos;s our specialty.
            </p>
            <Link href="/contact">
              <Button className="dark:bg-background dark:text-text">Get in touch</Button>
            </Link>
          </Box>
        </Container>
      </Section>

      <Section className="bg-background dark:bg-text dark:text-background">
        <Container>
          <Box direction={{ base: 'col', md: 'row' }} className="justify-between space-y-8">
            <h1 className="dark:text-background">
              <TextAnimate
                animate="slideInUp"
                by="line"
                className="font-chalet-newyork text-[2.25rem] text-text dark:text-background"
                once
              >
                Our philosophy
              </TextAnimate>
            </h1>
            <Box className="max-w-[827px] flex-grow" direction="col" gap={4}>
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
                      <blockquote className="md:w-[40.25rem] border-none pl-0 text-[1.25rem] md:text-[2.25rem] font-normal not-italic text-text">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <Box direction="col" className="">
                        <p className="text-base md:text-[1.25rem] font-semibold leading-[160%] tracking-[-0.0125rem] text-text">
                          {testimonial.reviewer}
                        </p>
                        <p className="text-base md:text-[1.25rem] font-normal leading-[160%] tracking-[-0.0125rem] text-text">
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
        backgroundImageRoute='/about/cta.jpg'
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

  return (
    <Suspense>
      <AboutClientContent
        serviceComponent={serviceComponent}
        workSnippet={workSnippet}
        clients={clients}
        workCarousel={workCarousel}
        testimonials={testimonials}
      />
    </Suspense>
  );
}
