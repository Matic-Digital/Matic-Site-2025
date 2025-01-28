import Image from 'next/image';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InfiniteLogoCarousel } from '@/app/components/InfiniteLogoCarousel';
import type { Partner, Client } from '@/types/contentful';

interface PartnershipSectionProps {
  partners: Partner[];
  clients: Client[];
}

export function PartnershipSection({ partners, clients }: PartnershipSectionProps) {
  return (
    <Section id="partnership-section" className="bg-foreground">
      <Container className="flex flex-col gap-8">
        <Box direction="col" gap={10} className="">
          <h2 className="text-white">Built by partnership</h2>
          <p className="ml-8 w-64 text-white">
            We partner and build with the most trusted and extensible platforms on the planet
          </p>
        </Box>
        <Box className="flex flex-wrap items-center gap-4 md:ml-auto md:grid md:w-fit md:grid-cols-3 md:gap-8 md:-mt-28">
          {partners.reverse().map((partner) => (
            <Box
              key={partner.sys.id}
              className="flex aspect-square items-center justify-center border border-[#6A81B4] p-4 md:w-full md:max-w-48 md:p-8"
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
        <Box className="flex flex-col py-8">
          <h3 className="text-white">Some of our clients</h3>
        </Box>
      </Container>
      <InfiniteLogoCarousel clients={clients} />
    </Section>
  );
}
