import { type CTA } from '@/types';
import Link from 'next/link';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface CTASectionProps {
  cta?: CTA;
}

export function CTASection({ cta }: CTASectionProps) {
  if (!cta) return null;

  return (
    <Section className="h-screen items-center justify-center flex">
      <Container className="">
        <Box direction="col" className="relative items-center justify-center h-full">
          <Box className="relative overflow-hidden rounded-full aspect-square w-[500px]">
            <Image
              src={cta.backgroundImage?.url ?? ''}
              alt={cta.sectionHeader}
              width={500}
              height={500}
              className="object-cover border-none rounded-full"
            />
            <div 
              className="absolute inset-0 rounded-full" 
              style={{ 
                background: 'linear-gradient(to right, transparent 40%, hsl(var(--base)) 100%)' 
              }} 
            />
          </Box>

        <Box direction="col" className="z-20 absolute items-center">
          <h2 className="">{cta.sectionSubheader}</h2>
          <h1 className="">{cta.sectionHeader}</h1>
          <Link href='/contact'>
            <Button className="">
              {cta.ctaButtonText}
            </Button>
          </Link>
        </Box>
        </Box>
      </Container>
    </Section>
  );
}
