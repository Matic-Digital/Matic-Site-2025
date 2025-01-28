import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import type { CTA } from '@/types/contentful';

interface CTASectionProps {
  cta?: CTA;
}

export function CTASection({ cta }: CTASectionProps) {
  if (!cta) return null;

  return (
    <Section className="border-none bg-[#041782] py-24">
      <Container className="space-y-12">
        <Box direction="col" gap={4}>
          <h2 className="text-white">{cta.sectionHeader}</h2>
        </Box>
        <Box direction={{ sm: 'col', md: 'row' }} gap={4} className="justify-between">
          <h3 className="text-white flex-grow text-[1.5rem] max-w-md">{cta.sectionSubheader}</h3>
          <Box direction="col" className="max-w-lg space-y-8">
            <p className="text-white text-[1rem] leading-[140%]">{cta.sectionCopy}</p>
            <Link href={'/contact'}>
              <Button variant="secondary">Get in touch</Button>
            </Link>
            <Link href={'/services'} className="flex items-center gap-4 text-white">
              <p className="text-white text-[1rem]">Explore services</p>
              <ArrowRight />
            </Link>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
