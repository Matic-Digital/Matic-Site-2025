import { type Partner } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import { InfiniteLogoCarousel } from '@/app/components/InfiniteLogoCarousel';
import { type Client } from '@/types';

interface PartnershipSectionProps {
  partners: Partner[];
  clients: Client[];
}

export function PartnershipSection({ partners, clients }: PartnershipSectionProps) {
  if (!partners?.length) return null;

  return (
    <Section id="partnership-section" className="bg-foreground py-24">
      <Container className="flex flex-col gap-8">
        {/* Header */}
        <Box direction="col" gap={10} className="mb-24">
          <h2 className="text-background">Built by partnership</h2>
          <p className="ml-8 w-64 text-background">
            We partner and build with the most trusted and extensible platforms on the planet
          </p>
        </Box>

        {/* Partners Grid */}
        <Box className="flex flex-wrap items-center gap-4 md:ml-auto md:grid md:w-fit md:grid-cols-3 md:gap-8 md:-mt-28">
          {partners.reverse().map((partner) => (
            <Box
              key={partner.sys.id}
              className="flex aspect-square items-center justify-center border border-[#6A81B4] p-4 md:w-full md:max-w-48 md:p-8"
            >
              {partner.logo?.url && (
                <Image
                  src={partner.logo.url}
                  alt={partner.name}
                  width={300}
                  height={300}
                  className="w-auto rounded-none border-none object-contain brightness-0 invert"
                />
              )}
            </Box>
          ))}
        </Box>
        <Box className="flex flex-col py-8">
          <h3 className="text-background">Some of our clients</h3>
        </Box>
        <InfiniteLogoCarousel clients={clients} />
      </Container>
    </Section>
  );
}
