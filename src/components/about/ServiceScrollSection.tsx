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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollProgress, setScrollProgress] = useState(0);
  const services = serviceComponent?.servicesCollection?.items || [];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      // Only proceed if we have services
      if (services.length === 0) return;

      // Calculate overall scroll progress through the section first
      const scrolled = Math.max(0, -top);
      const progress = Math.max(0, Math.min(1, scrolled / (height - viewportHeight)));

      // Calculate the position of each service item
      // Use a smaller value to prevent skipping items during scrolling
      // This creates smaller activation zones that transition more smoothly
      const serviceHeight = viewportHeight * 0.3; // Reduced to prevent skipping items

      const servicePositions = services.map((_, index) => {
        // Calculate where each service item should be positioned
        const itemTopOffset = index * serviceHeight;
        // Calculate the item's position relative to the viewport
        const itemTopInViewport = itemTopOffset + top;
        // Calculate the center of the item
        const itemCenter = itemTopInViewport + serviceHeight / 2;
        // Special adjustment for the third item to ensure it doesn't get skipped
        let bias = 0;
        if (index === 2) {
          // Give the third item a significant advantage to ensure it gets selected
          bias = viewportHeight * 0.15;
        } else if (index > 2) {
          // Normal bias for other items
          bias = viewportHeight * 0.08;
        }
        // Return the distance from the viewport center, with bias
        // Lower distance means higher priority for selection
        return Math.abs(itemCenter - (viewportCenter - bias));
      });

      // Find the index of the service closest to the viewport center
      let closestIndex = 0;

      // Debug the service positions
      console.log('Service positions:', servicePositions);

      // Handle potential undefined values safely
      if (servicePositions.length > 0) {
        let minDistance = servicePositions[0];

        for (let i = 1; i < servicePositions.length; i++) {
          const distance = servicePositions[i];
          // Check if distance is defined and less than minDistance
          if (
            typeof distance === 'number' &&
            typeof minDistance === 'number' &&
            distance < minDistance
          ) {
            minDistance = distance;
            closestIndex = i;
          }
        }

        // Debug the selection process
        console.log(
          'Selected index:',
          closestIndex,
          'with distance:',
          servicePositions[closestIndex]
        );
      }

      // Special case for the third item (index 2)
      // Force the third item to be active within a specific scroll range
      // This needs to happen before any other special cases
      if (services.length >= 3 && progress >= 0.2 && progress <= 0.65) {
        // Ensure we don't skip directly from 1 to 3+ when scrolling quickly
        if (activeIndex < 2 && closestIndex > 2) {
          console.log('Fast scroll detected - forcing third item activation');
          setActiveIndex(2);
          setScrollProgress(progress);
          return;
        }
        // Normal case - within the third item's range
        if (activeIndex !== 2) {
          console.log('Forcing third item (index 2) to be active due to scroll range');
          setActiveIndex(2);
        }
        setScrollProgress(progress);
        return; // Skip the rest of the processing
      }

      // Special case for last item - if we're near the end of the section, activate the last item
      // We check both progress and if we're close to the bottom of the page
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if ((progress > 0.7 || isNearBottom) && services.length > 0) {
        setActiveIndex(services.length - 1);
        setScrollProgress(progress);
        return;
      }

      // Debug the closest index calculation
      console.log('Processing closest index calculation...');

      // Use a sequential approach to ensure we don't skip items
      // Only allow moving to adjacent items (i.e., can only move one index at a time)
      let newIndex = closestIndex;

      // Special case: if we're at index 1 and closestIndex is 3, force to index 2
      if (activeIndex === 1 && closestIndex === 3) {
        newIndex = 2;
        console.log('Special case: forcing index 2 when moving from 1 to 3');
      }
      // Special case: if we're at index 3 and closestIndex is 1, force to index 2
      else if (activeIndex === 3 && closestIndex === 1) {
        newIndex = 2;
        console.log('Special case: forcing index 2 when moving from 3 to 1');
      }
      // General case: ensure we don't skip items
      else if (Math.abs(newIndex - activeIndex) > 1) {
        // If trying to skip more than one item, only move one item in the right direction
        newIndex = activeIndex + (newIndex > activeIndex ? 1 : -1);
        console.log('Preventing skipping by setting index to:', newIndex);
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }

      // Update the scroll progress state
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length, activeIndex]);

  const activeService = services[activeIndex];

  if (!activeService) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background dark:bg-text dark:text-background"
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
            <div className="absolute inset-0 bg-background/70 dark:bg-text/70" />
          </div>
        ))}

        {/* No overlay gradient */}

        {/* Content */}
        <div className="relative z-40 flex w-full flex-col justify-between space-y-8 pb-[4rem] pt-[8rem] md:pt-[4rem]">
          <div className="sticky top-[5rem] z-50 mb-[2rem] border-t border-text/20 bg-background pt-0 dark:border-background/20 dark:bg-text md:top-0 md:mb-0 md:pt-[6rem]">
            <Container>
              <Box className="grid gap-x-[6.125rem] py-[2rem]" cols={{ base: 1, md: 2 }}>
                <h4 className="whitespace-normal md:whitespace-nowrap">What we do</h4>
                <h4 className="mt-2 whitespace-normal md:mt-0 md:whitespace-nowrap">
                  Things we make
                </h4>
              </Box>
            </Container>
          </div>

          <Container className="flex flex-grow items-start overflow-visible pb-16 pt-8 md:pt-0">
            <div className="w-full">
              {/* Service content with staggered animation */}
              <div className="w-full">
                {services.map((service, index) => (
                  <div
                    key={service.sys.id}
                    className={`transition-all duration-700 ease-out ${index < activeIndex ? 'mb-8' : 'mb-16'} md:mb-32`}
                  >
                    {/* Mobile layout - stacked but with similar styling to desktop */}
                    <div className="md:hidden">
                      <motion.div
                        className="transition-all duration-500 ease-out"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          index === activeIndex
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0.6, scale: 0.9, y: 0 }
                        }
                        transition={{
                          duration: 0.5,
                          ease: [0.32, 0.72, 0, 1]
                        }}
                      >
                        <Box direction="col" className="origin-top-left">
                          <Box className="mb-4 items-center gap-[2.06rem]">
                            <Image
                              src={service.bannerIcon?.url ?? ''}
                              alt={service.name}
                              width={100}
                              height={100}
                              className="aspect-square w-[3.625rem] rounded-none border-none"
                            />
                            <h3 className="whitespace-normal leading-[120%] tracking-[-0.06rem]">
                              {service.name}
                            </h3>
                          </Box>
                          <div className="max-w-[38rem]">
                            <p className="pl-[5.75rem] text-[1.25rem] font-medium leading-[160%] tracking-[-0.0125rem]">
                              {service.bannerCopy}
                            </p>
                          </div>
                        </Box>
                      </motion.div>

                      <motion.div
                        className="mt-6 transition-all duration-500 ease-out"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          index === activeIndex
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0.6, scale: 0.9, y: 0 }
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <div className="grid w-full origin-top-left grid-cols-1 gap-y-4 pl-[5.75rem]">
                          {service.productList?.map((product, productIndex) => (
                            <motion.p
                              key={product}
                              className="whitespace-normal text-base leading-[160%] tracking-[-0.02rem] text-text/60"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 + productIndex * 0.05 }}
                            >
                              {product}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Desktop layout - side by side */}
                    <div className="hidden w-full items-start md:grid md:grid-cols-2">
                      <div className="min-w-[26rem]">
                        <motion.div
                          className="transition-all duration-500 ease-out"
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            index === activeIndex
                              ? { opacity: 1, scale: 1, y: 0 }
                              : { opacity: 0.6, scale: 0.9, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                      </div>

                      <div className="flex-1 pl-[3.5rem] pt-[1.5rem]">
                        <motion.div
                          className="transition-all duration-500 ease-out"
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            index === activeIndex
                              ? { opacity: 1, scale: 1, y: 0 }
                              : { opacity: 0.6, scale: 0.9, y: 0 }
                          }
                          transition={{ duration: 0.5 }}
                        >
                          <div className="grid w-full origin-top-left grid-cols-2 gap-x-8 gap-y-4">
                            {service.productList?.map((product, productIndex) => (
                              <motion.p
                                key={product}
                                className="whitespace-normal text-base leading-[160%] tracking-[-0.02rem] text-text/60 md:whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 + productIndex * 0.05 }}
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
