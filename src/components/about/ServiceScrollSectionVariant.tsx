'use client';

import { useRef, useState } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import Image from 'next/image';
import { type ServiceComponent } from '@/types/contentful';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceScrollSectionVariantProps {
  serviceComponent: ServiceComponent;
}

export function ServiceScrollSectionVariant({
  serviceComponent
}: ServiceScrollSectionVariantProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex] = useState(0);
  const services = serviceComponent?.servicesCollection?.items || [];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F3F6F0] dark:bg-text dark:text-background"
      style={{
        position: 'relative'
      }}
    >
      <div className="relative w-full">
        {/* Background Images */}
        {services.map((service, index) => (
          <div
            key={service.sys.id}
            className={cn(
              'absolute inset-0 w-full transition-opacity duration-700',
              index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            )}
          >
            <div className="absolute inset-0 bg-[#F3F6F0]" />
          </div>
        ))}

        {/* No overlay gradient */}

        {/* Content */}
        <div className="relative z-40 w-full pb-[4rem] pt-[8rem] md:pt-[4rem]">
          <Container>
            <Box className="grid gap-x-[6.125rem]" cols={{ base: 1, md: 2 }}>
              {/* First column - Sticky header */}
              <div className="sticky top-[8rem] z-50 flex flex-col gap-[1.62rem] self-start py-4">
                <p className="font-bold text-blue md:text-xl md:font-normal">What we do</p>
                <h3 className="text-3xl font-bold leading-[120%] md:text-5xl md:font-normal">
                  Building brands for what&apos;s next
                </h3>
                <p className="text-lg leading-[160%] md:text-3xl">
                  We help businesses in moments of growth, scale, and transformation.
                </p>
                <Link href="/services" className="mt-[2.69rem]">
                  <Button>See all services</Button>
                </Link>
              </div>

              {/* Second column - Service items */}
              <div className="w-full space-y-16 md:space-y-32">
                {services.map((service) => (
                  <div key={service.sys.id} className="rounded-[0.625rem] bg-white p-[2rem]">
                    <Box direction="col" className="origin-top-left">
                      <Box className="mb-4 items-center gap-[2.06rem]">
                        <Image
                          src={service.bannerIcon?.url ?? ''}
                          alt={service.name}
                          width={100}
                          height={100}
                          className="aspect-square w-[3.625rem] rounded-none border-none"
                        />
                        <h3 className="whitespace-normal leading-[120%] tracking-[-0.06rem] md:whitespace-nowrap">
                          {service.name}
                        </h3>
                      </Box>
                      <div className="max-w-[38rem]">
                        <p className="pl-[5.75rem] text-[1.25rem] font-medium leading-[160%] tracking-[-0.0125rem]">
                          {service.bannerCopy}
                        </p>
                      </div>
                    </Box>
                  </div>
                ))}
              </div>
            </Box>
          </Container>
        </div>
      </div>
    </section>
  );
}
