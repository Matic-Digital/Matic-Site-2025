'use client';

import { type Signals } from '@/types';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { EmailForm } from '../forms/EmailForm';

interface SignalsSectionProps {
  signal?: Signals;
}

export function SignalsSection({ signal }: SignalsSectionProps) {
  if (!signal) return null;

  return (
    <Section id="signals-section" className="border-none bg-base py-24">
      <Container>
        <Box direction="col" className="md:flex-row md:justify-between space-y-12 md:space-y-0">
          <div className="w-fit relative">
            <div 
              className="w-[300px] h-[300px] bg-[hsl(var(--text))]"
              style={{
                WebkitMaskImage: `url(${signal.logo?.url})`,
                maskImage: `url(${signal.logo?.url})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </div>
          <Box direction="col" gap={4} className="max-w-xl px-0 md:p-8">
            <h1 className="text-text text-[1.75rem] md:text-[2rem]">{signal.tagline}</h1>
            <p className="max-w-[26rem] text-[1rem] md:text-[1.125rem] leading-relaxed text-text">{signal.subheader}</p>
            <EmailForm 
              labelBgClassName="bg-base"
              buttonText='Subscribe'
            />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
