'use client';

import { type Hero } from '@/types/contentful';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function ClientHero({ hero }: { hero: Hero }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section className="relative -top-24 left-0 right-0 -mt-24 -mb-20 flex h-[80vh] md:h-[100vh] overflow-hidden">
      <video
        src={hero.backgroundAsset?.url}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
      />
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-all duration-500 ${
          !hasScrolled ? 'bg-white mix-blend-screen' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[95rem] px-6 md:px-12 lg:px-24">
          <h1
            className={`text-6xl md:text-8xl md:text-center font-bold transition-all duration-500 ${
              !hasScrolled ? 'text-black mix-blend-multiply' : 'text-white'
            }`}
          >
            {hero.tagline}
          </h1>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full max-w-[90rem] px-6 md:px-12 lg:px-24 flex justify-end">
            <div className="mt-[calc(theme(fontSize.8xl)+14rem)]">
              <h2
                style={{ color: hasScrolled ? 'white' : 'black' }}
                className="text-xl md:text-2xl font-normal transition-all duration-500 max-w-xl"
              >
                {hero.subheader}
              </h2>
              <Link href={'/services'}>
                <p style={{ color: hasScrolled ? 'white' : 'black' }} className="transition-all duration-500">Explore our services</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
