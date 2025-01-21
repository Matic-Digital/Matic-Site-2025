'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { ScrollDetector } from '@/components/global/ScrollDetector';
import Link from 'next/link';

type HeroGradientProps = {
  text: string;
};

export function HeroGradient({ text }: HeroGradientProps) {
  return (
    <>
      <Section>
        <Container className="">
          <Box direction="col" gap={4} className="items-center">
            <h1 className="text-[7.5rem] leading-none ">{text}</h1>
            <Box direction="col" gap={4} className='items-start w-[25vw] ml-auto'>
              <p className="text-2xl w-[25vw]">We create brand, digital and team solutions for businesses at every stage.</p>
              <Link href='/services'>Explore our services</Link>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
