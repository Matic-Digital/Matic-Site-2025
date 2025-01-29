import { type CTA } from '@/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  cta?: CTA;
}

export function CTASection({ cta }: CTASectionProps) {
  if (!cta) return null;

  return (
    <Section className="border-none bg-[var(--background)] py-24">
      <Container className="space-y-12">
        {/* Header */}
        <Box direction="col" gap={4}>
          <h2 className="text-[var(--foreground)]">{cta.sectionHeader}</h2>
        </Box>

        {/* Content */}
        <Box 
          direction={{ sm: 'col', md: 'row' }} 
          gap={4} 
          className="justify-between"
        >
          {/* Subheader */}
          <h3 className="text-[var(--foreground)] flex-grow text-[1.5rem] max-w-md">
            {cta.sectionSubheader}
          </h3>

          {/* Right Column */}
          <Box direction="col" className="max-w-lg space-y-8">
            {/* Copy */}
            <p className="text-[var(--foreground)] text-[1rem] leading-[140%]">
              {cta.sectionCopy}
            </p>

            {/* Actions */}
            <Box direction="col" gap={4}>
              <Link href="/contact">
                <Button variant="secondary">Get in touch</Button>
              </Link>
              <Link href="/services" className="flex items-center gap-4 text-[var(--foreground)]">
                <p className="text-[var(--foreground)] text-[1rem]">Explore services</p>
                <ArrowRight />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
