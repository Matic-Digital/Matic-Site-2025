'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Container } from '@/components/global/matic-ds';
import Image from 'next/image';
import { type ServiceComponent } from '@/types/contentful';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceScrollSectionProps {
  serviceComponent: ServiceComponent;
}

export function ServiceScrollSection({ serviceComponent }: ServiceScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const services = serviceComponent?.servicesCollection?.items || [];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate total scroll distance needed for all sections
      const totalScrollDistance = viewportHeight * services.length;
      const scrolled = Math.max(0, -top + viewportHeight);
      
      // Calculate progress including space for last section
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      // Calculate current section
      const rawIndex = ((scrolled - viewportHeight) / viewportHeight);
      const targetIndex = Math.min(
        services.length - 1,
        Math.max(0, Math.floor(rawIndex))
      );
      
      if (targetIndex !== activeIndex) {
        setActiveIndex(targetIndex);
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [services.length, activeIndex]);
  
  const activeService = services[activeIndex];
  
  if (!activeService) return null;
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-background dark:bg-text dark:text-background"
      style={{
        // Add more viewport height to ensure proper scrolling
        height: `${(services.length + 1.5) * 100}vh`,
        position: 'relative'
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images */}
        {services.map((service, index) => (
          <div
            key={service.sys.id}
            className={cn(
              "absolute inset-0 w-full transition-opacity duration-700",
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="absolute inset-0 bg-background/70 dark:bg-text/70" />
          </div>
        ))}
        
        {/* No overlay gradient */}
        
        {/* Content */}
        <div className="relative z-40 h-screen w-full flex flex-col justify-start pt-[8rem] md:pt-[10rem]">
          <div className="sticky top-[5rem] z-50 bg-background dark:bg-text pt-0 border-t border-text/20 dark:border-background/20 mb-[2rem]">
            <Container>
              <Box className="hidden gap-x-[6.125rem] py-[2rem] md:grid" cols={2}>
                <h4 className="whitespace-normal md:whitespace-nowrap">What we do</h4>
                <h4 className="whitespace-normal md:whitespace-nowrap">Things we make</h4>
              </Box>
            </Container>
          </div>
          
          <Container className="flex-grow flex items-start pt-8 md:pt-12 pb-40 md:max-h-[90vh]">
            <div className="w-full">
              {/* Service content with staggered animation */}
              <div className="w-full">
                {services.map((service, index) => (
                  <div key={service.sys.id} className={`transition-all duration-700 ease-out ${index < 3 && index < activeIndex ? 'mb-4' : 'mb-16'} md:mb-14`}>
                    {/* Mobile layout - stacked */}
                    <motion.div 
                      className="md:hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={index === activeIndex 
                        ? { opacity: 1, scale: 1, y: 0 } 
                        : index < 3 && index < activeIndex
                          ? { opacity: 0.4, scale: 0.85, y: 0 }
                          : { opacity: 0.6, scale: 0.9, y: 0 }
                      }
                      transition={{ 
                        duration: 0.7,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <Box direction="col" className={`origin-top-left transition-all duration-700 ease-out ${index < 3 && index < activeIndex ? 'mb-0' : 'mb-6'}`}>
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
                      
                      <Box className={`grid grid-cols-1 gap-4 origin-top-left pl-[5.75rem] transition-all duration-700 ease-out ${index < 3 && index < activeIndex ? 'mt-0 max-h-0 overflow-hidden opacity-0' : 'mt-6'}`}>
                        {service.productList?.map((product, productIndex) => (
                          <motion.p
                            key={product}
                            className="text-[0.875rem] leading-[160%] tracking-[-0.02rem] text-text/60 whitespace-normal"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + (productIndex * 0.05) }}
                          >
                            {product}
                          </motion.p>
                        ))}
                      </Box>
                    </motion.div>
                    
                    {/* Desktop layout - side by side */}
                    <div className="hidden md:grid md:grid-cols-2 w-full items-start">
                      <div className="min-w-[26rem]">
                        <motion.div
                          className="transition-all duration-500 ease-out"
                          initial={{ opacity: 0, y: 20 }}
                          animate={index === activeIndex 
                            ? { opacity: 1, scale: 1, y: 0 } 
                            : { opacity: 0.6, scale: 0.9, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        >
                          <Box direction="col" className="origin-top-left">
                            <Box className="items-center gap-[2.06rem] mb-4">
                              <Image
                                src={service.bannerIcon?.url ?? ''}
                                alt={service.name}
                                width={100}
                                height={100}
                                className="aspect-square w-[3.625rem] rounded-none border-none"
                              />
                              <h3 className="leading-[120%] tracking-[-0.06rem] whitespace-normal md:whitespace-nowrap">{service.name}</h3>
                            </Box>
                            <div className="max-w-[38rem]">
                              <p className="pl-[5.75rem] text-[1.25rem] font-medium leading-[160%] tracking-[-0.0125rem]">
                                {service.bannerCopy}
                              </p>
                            </div>
                          </Box>
                        </motion.div>
                      </div>
                      
                      <div className="flex-1 pl-[3.5rem] pt-[1.5rem]">
                        <motion.div
                          className="transition-all duration-500 ease-out"
                          initial={{ opacity: 0, y: 20 }}
                          animate={index === activeIndex 
                            ? { opacity: 1, scale: 1, y: 0 } 
                            : { opacity: 0.6, scale: 0.9, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        >
                          <div className="grid grid-cols-2 gap-x-8 gap-y-4 origin-top-left w-full">
                            {service.productList?.map((product, productIndex) => (
                              <motion.p
                                key={product}
                                className="text-base leading-[160%] tracking-[-0.02rem] text-text/60 whitespace-normal md:whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 + (productIndex * 0.05) }}
                              >
                                {product}
                              </motion.p>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* No scroll indicator */}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
