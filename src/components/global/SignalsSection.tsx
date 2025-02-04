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
    <Section id="signals-section" className="border-none bg-gradient-to-b from-[#000227] via-[#000227] to-[#041782] py-24 min-h-[100vh]">
      <Container>
        <Box direction={{ sm: 'col', md: 'row' }} className="justify-between">
          <Image
            src={signal.logo?.url ?? ''}
            alt={signal.tagline ?? 'Signal Logo'}
            width={300}
            height={300}
            className="mb-12 w-fit rounded-none border-none object-contain brightness-0 invert"
          />
          <Box direction="col" gap={4} className="max-w-xl p-8">
            <h3 className="text-background">{signal.tagline}</h3>
            <p className="max-w-[26rem] text-background">{signal.subheader}</p>
            <NewsletterForm />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
