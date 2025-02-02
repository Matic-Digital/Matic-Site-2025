'use client';

import { type Signals } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

interface SignalsSectionProps {
  signal?: Signals;
}

export function SignalsSection({ signal }: SignalsSectionProps) {
  if (!signal) return null;

  return (
    <Section id="signals-section" className="border-none bg-base py-24">
      <Container>
        <Box direction={{ sm: 'col', md: 'row' }} className="justify-between">
          <Image
            src={signal.logo?.url ?? ''}
            alt={signal.tagline ?? 'Signal Logo'}
            width={300}
            height={300}
            className="mb-12 w-fit rounded-none border-none object-contain filter-text"
          />
          <Box direction="col" gap={4} className="max-w-xl p-8">
            <h1 className="text-text">{signal.tagline}</h1>
            <p className="max-w-[26rem] text-text">{signal.subheader}</p>
            <NewsletterForm variant="button" buttonText="Subscribe" />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
