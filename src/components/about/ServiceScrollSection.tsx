'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import Image from 'next/image';
import { type ServiceComponent } from '@/types/contentful';

interface ServiceScrollSectionProps {
  serviceComponent: ServiceComponent;
}

export function ServiceScrollSection({ serviceComponent }: ServiceScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const services = serviceComponent?.servicesCollection?.items || [];
  
  // Setup refs array
  useEffect(() => {
    serviceRefs.current = serviceRefs.current.slice(0, services.length);
  }, [services.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Determine which service item is most visible in the viewport
      let mostVisibleIndex = -1;
      let maxVisibility = 0;
      
      serviceRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const centerY = (rect.top + rect.bottom) / 2;
        const viewportCenterY = window.innerHeight / 2;
        
        // Calculate how centered this item is in the viewport
        const visibility = 1 - Math.min(1, Math.abs(centerY - viewportCenterY) / (window.innerHeight / 2));
        
        if (visibility > maxVisibility && visibility > 0.5) { // Only consider items that are at least 50% visible
          maxVisibility = visibility;
          mostVisibleIndex = index;
        }
      });
      
      setActiveIndex(mostVisibleIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative w-full bg-background dark:bg-text dark:text-background mb-[4rem]"
    >
      <div className="sticky top-0 z-40 bg-background pt-[6rem]">
        <Container>
          <hr />
          <Box className="hidden gap-x-[6.125rem] py-[2rem] md:grid" cols={2}>
            <h4 className="whitespace-normal md:whitespace-nowrap">What we do</h4>
            <h4 className="whitespace-normal md:whitespace-nowrap">Things we make</h4>
          </Box>
        </Container>
      </div>

      {/* All service items */}
      <Container className="relative pt-[2rem]">
        <div className="flex flex-col space-y-[6rem]">
          {services.map((service, index) => (
            <div 
              key={service.sys.id}
              ref={el => serviceRefs.current[index] = el}
              className="min-h-[60vh] flex items-center w-full"
            >
              <div 
                className={`w-full transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-50'}`}
              >
                <Box
                  direction={{ base: 'col', md: 'row' }}
                  className="w-full gap-x-[6.125rem]"
                  cols={{ base: 1, md: 2 }}
                >
                  <Box className="">
                    <Box direction="col" className="">
                      <Box className="items-center gap-[2.06rem]">
                        <Image
                          src={service.bannerIcon?.url ?? ''}
                          alt={service.name}
                          width={100}
                          height={100}
                          className="aspect-square w-[3.625rem] rounded-none border-none"
                        />
                        <h3 className="leading-[120%] tracking-[-0.06rem] whitespace-normal">{service.name}</h3>
                      </Box>
                      <p className="pl-[5.75rem] text-[1.25rem] font-medium leading-[160%] tracking-[-0.0125rem] whitespace-normal">
                        {service.bannerCopy}
                      </p>
                    </Box>
                  </Box>
                  <Box className="pl-[5.875rem] pt-4 md:pl-0 md:pt-0" cols={{ base: 1, md: 2 }}>
                    {service.productList?.map((product) => (
                      <p
                        key={product}
                        className="text-[0.875rem] leading-[160%] tracking-[-0.02rem] text-text/60 md:text-base whitespace-normal"
                      >
                        {product}
                      </p>
                    ))}
                  </Box>
                </Box>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
