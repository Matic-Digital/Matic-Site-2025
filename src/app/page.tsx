import {
  type CapabilitiesResponse,
  type Hero,
  type WorkResponse,
  type PartnersResponse,
  type ClientsResponse
} from '@/types/contentful';
import { getCapabilities, getHero, getAllWork } from '@/lib/api';
import { WhatWeDo } from '@/components/global/WhatWeDo';
import { WorkSection } from '@/components/global/WorkSection';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollFadeText } from '@/components/global/ScrollFadeText';
import { ClientHero } from '@/components/global/ClientHero';
import { getAllPartners, getAllClients } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllInsights, getAllWaysToEngage, getAllSignals, getAllCTAs } from '@/lib/api';
import { InsightsList } from '@/components/insights/InsightsList';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { InfiniteLogoCarousel } from './components/InfiniteLogoCarousel';
import { Button } from '@/components/ui/button';

/**
 * Landing page
 */
export default async function HomePage() {
  const [capabilities, hero, works, partners, clients, insights, engage, signals, cta] = await Promise.all([
    getCapabilities(),
    getHero(),
    getAllWork(),
    getAllPartners(),
    getAllClients(),
    getAllInsights(),
    getAllWaysToEngage(),
    getAllSignals(),
    getAllCTAs()
  ]);

  if (!hero) {
    return null;
  }

  return (
    <>
      <ClientHero hero={hero} />
      <WhatWeDo capabilities={capabilities.items} />
      <WorkSection works={works.items} />

      <Section className="bg-foreground">
        <Container>
          <Box direction="col" gap={4}>
            <h1 className="text-white">Built by partnership</h1>
            <p className="text-white">
              We partner and build with the most trusted and extensible platforms on the planet
            </p>
          </Box>
          <Box className="flex flex-wrap items-center gap-4">
            {partners.items.reverse().map((partner) => (
              <Box
                key={partner.sys.id}
                className="flex aspect-square w-28 items-center justify-center border p-4"
              >
                <Image
                  src={partner.logo?.url}
                  alt={partner.name}
                  width={300}
                  height={300}
                  className="w-auto rounded-none border-none object-contain brightness-0 invert"
                />
              </Box>
            ))}
          </Box>
          <Box className="flex flex-col gap-4">
            <h3 className="text-white">Some of our clients</h3>
          </Box>
        </Container>
        <InfiniteLogoCarousel clients={clients.items} />
      </Section>
      <Section>
        <Container>
          <Box>
            <h1 className="">Journal</h1>
            <Box className="items-center justify-between">
              <Link href="/insights">All thinking and updates</Link>
              <ArrowRight />
            </Box>
          </Box>
          <Box>
            <InsightsList initialInsights={insights.items} initialTotal={insights.total} />
          </Box>
        </Container>
      </Section>
      <Section className="bg-gradient-to-b from-[#000227] via-[#000227] to-[#041782] border-none">
        <Container>
          <Image
            src={signals.items[0]?.logo?.url ?? ''}
            alt={signals.items[0]?.tagline ?? 'Signal Logo'}
            width={300}
            height={300}
            className="w-auto rounded-none border-none object-contain brightness-0 invert"
          />
          <Box direction="col" gap={4}>
            <h3 className="text-white">
              {signals.items[0]?.tagline}
            </h3>
            <p className="text-white">
              {signals.items[0]?.subheader}
            </p>
          </Box>
        </Container>
        <Container>
          <Box direction="col" gap={4}>
            <h2 className="text-white">{cta.items[0]?.sectionHeader}</h2>
            <h3 className="text-white">{cta.items[0]?.sectionSubheader}</h3>
          </Box>
          <Box direction="col" gap={4}>
            <p className="text-white">
              {cta.items[0]?.sectionCopy}
            </p>
            <Link href={'/contact'}>
              <Button variant="secondary">Get in touch</Button>
            </Link>
            <Link href={'/services'} className="flex text-white items-center gap-4">
              <p className="text-white">Explore services</p>
              <ArrowRight />
            </Link>
          </Box>
        </Container>
        <Container>
          <h2 className="text-white">Other ways to engage.</h2>
          <Carousel className="">
            <CarouselContent>
              {engage.items.reverse().map((way) => (
                <CarouselItem key={way.sys.id}>
                  <Box gap={4} className="border p-4">
                    <Image
                      src={way.bannerImage?.url}
                      alt={way.engagementHeader}
                      width={300}
                      height={300}
                      className="rounded-none border-none w-36"
                    />
                    <Box direction="col" gap={4} className="flex-grow justify-center">
                      <h3 className="text-white">{way.engagementHeader}</h3>
                      <p className="whitespace-pre-wrap text-white">{way.engagementCopy}</p>
                      <Link href={way.engagementLink} className="">
                        <Button>{way.signUpCopy}</Button>
                      </Link>
                    </Box>
                  </Box>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Container>
      </Section>
    </>
  );
}
