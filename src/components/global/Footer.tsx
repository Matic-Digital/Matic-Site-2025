'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import { getFooter } from '@/lib/api';
import type { Footer as FooterType } from '@/types/contentful';
import { Logo } from './Logo';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { GetInTouchForm } from '../forms/GetInTouchForm';
import { ClutchWidget } from './ClutchWidget';
import { EmailForm } from '../forms/EmailForm';
import cn from 'classnames';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';

export function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null);
  const controls = useAnimation();
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show form on desktop devices
      if (window.innerWidth >= 768) {
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

        setIsFormVisible(isAtBottom);
        void controls.start({
          x: isAtBottom ? 0 : '100%',
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.3
          }
        });
      } else {
        // Always hide form on mobile
        setIsFormVisible(false);
        void controls.start({
          x: '100%',
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.3
          }
        });
      }
    };

    // Run the handler once on mount and add scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    // Also listen for window resize to handle orientation changes
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [controls]);

  useEffect(() => {
    async function loadFooter() {
      try {
        const data = await getFooter();
        setFooter(data);
      } catch (error) {
        console.error('Error loading footer:', error);
      }
    }
    void loadFooter();
  }, []);

  if (!footer) {
    return null;
  }

  return (
    <>
      {/* Mobile Get In Touch Form */}
      <div className="md:hidden bg-secondary dark:bg-background blue:bg-text">
        <Container width="full" className="py-12">
          <Box direction="col" className="space-y-8">
            <h2 className="text-2xl font-medium text-text blue:text-maticblack">Get in touch</h2>
            <GetInTouchForm />
          </Box>
        </Container>
      </div>

      <footer className="overflow-hidden relative bg-background dark:bg-text blue:bg-text">
        <Box className="z-40 absolute w-full h-[15px]">
          <div className="bg-darkblue flex-grow"></div>
          <div className="bg-blue flex-grow"></div>
          <div className="bg-green flex-grow"></div>
          <div className="bg-pink flex-grow"></div>
          <div className="bg-orange flex-grow"></div>
          <div className="bg-purple flex-grow"></div>
        </Box>

        <Container width="full" className="py-12">
          <Box direction="col" className="h-full justify-between space-y-16">
            <Box direction="col" gap={8}>
              <Box className="" direction="col" gap={4}>
                <div className={cn(
                  "transition-colors duration-300",
                  isFormVisible ? "text-darkblue dark:text-maticblack blue:text-background" : "text-text dark:text-maticblack blue:text-maticblack"
                )}>
                  <Logo className="block" />
                </div>
                <h1 className={cn(
                  "transition-colors duration-300",
                  isFormVisible ? "text-darkblue dark:text-maticblack blue:text-background" : "text-text dark:text-maticblack blue:text-maticblack"
                )}>
                  <span className="relative z-10">
                    {footer?.tagline
                      ?.split(' ')
                      .map((word, index, array) => (
                        <span key={index}>
                          {word === '®' ? (
                            <sup className="text-[0.5em]">®</sup>
                          ) : (
                            word + (index < array.length - 1 ? ' ' : '')
                          )}
                        </span>
                      ))}
                  </span>
                </h1>
              </Box>
              <Box direction="col" className="" gap={8}>
                <p className="max-w-[438px] leading-[140%] text-text dark:text-maticblack blue:text-maticblack">
                  {footer?.paragraph}
                </p>
                <Box cols={{ base: 3, md: 3 }} className="w-fit gap-x-16 gap-y-6">
                  <Link href="/work">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Work
                    </p>
                  </Link>
                  <Link href="/journal">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Journal
                    </p>
                  </Link>
                  <Link href="/studio">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Studio
                    </p>
                  </Link>
                  <Link href="/services">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Services
                    </p>
                  </Link>
                  <Link href="/contact">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Contact
                    </p>
                  </Link>
                  <Link href="/teams">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Teams
                    </p>
                  </Link>
                  <Link href="/about">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      About
                    </p>
                  </Link>
                  <Link href="/careers">
                    <p className="text-[1rem] font-semibold leading-none text-text dark:text-maticblack blue:text-maticblack">
                      Careers
                    </p>
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box direction="col" className="flex-grow justify-evenly space-y-12">
              <Box direction="col" gap={4} className="max-w-[444px]">
                <h4 className="text-text dark:text-maticblack blue:text-maticblack">Subscribe for updates</h4>
                <EmailForm 
                  className="w-full max-w-[438px]"
                  variant="arrow"
                  labelBgClassName="bg-background dark:bg-text blue:bg-text text-text dark:text-maticblack blue:text-maticblack"
                  buttonBgClassName="text-text dark:text-maticblack dark:bg-maticblack blue:text-maticblack bg-background hover:bg-maticblack hover:text-background"
                  webhookUrl={ZAPIER_WEBHOOK_URL}
                  onSubmit={async (data) => {
                    // Optional additional handling after webhook submission
                    console.log('Newsletter subscription:', data.email);
                  }}
                  borderClassName="dark:border-maticblack"
                />
              </Box>
              <Box className="" gap={8}>
                {footer?.socialsCollection?.items.map((social, index) => (
                  <Link key={index} href={social.url}>
                    <Image
                      src={social.logo.url}
                      alt={social.name}
                      width={100}
                      height={100}
                      className="aspect-square w-[25px] rounded-none border-none object-contain filter-footer"
                    />
                  </Link>
                ))}
                <Link href={`mailto:${footer?.email}`} className="text-maticblack hover:text-blue transition-colors">
                  <p className="text-[hsl(var(--footer-text-hsl))]">{footer?.email}</p>
                </Link>
              </Box>
            </Box>
            <Box className="items-center justify-between">
              <Box direction='row' gap={4} className="flex flex-col md:flex-row items-center md:items-center flex-shrink min-w-0 whitespace-nowrap">
                <Box className="flex flex-row gap-4 items-center">
                  <p className="text-text dark:text-maticblack blue:text-maticblack text-xs">
                    &copy;Matic Digital, {new Date().getFullYear()}
                  </p>
                  <Link href="/privacy">
                    <p className="text-text dark:text-maticblack blue:text-maticblack text-xs">
                        Privacy Policy
                    </p>
                  </Link>
                  <Link href="/terms">
                    <p className="text-text dark:text-maticblack blue:text-maticblack text-xs">
                      Terms of Use
                    </p>
                  </Link>
                </Box>
                <Box className="mt-4 md:mt-0">
                  <ClutchWidget />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
        <motion.div
          animate={controls}
          initial={{ x: '100%' }}
          className="absolute bottom-0 right-0 flex items-stretch h-full"
        >
          <Box className="relative flex items-stretch h-full">
            <Box className="w-[500px] bg-secondary dark:bg-background blue:bg-background flex flex-col items-center">
              <Box className="w-full px-16 pt-[6.3rem]">
                <h1 className="text-text blue:text-text md:blue:text-text text-[2.5rem] font-medium leading-[1.2] tracking-[-0.02em]">Get in touch</h1>
              </Box>
              <Box direction="col" className="space-y-8 px-16 w-full pt-12">
                <GetInTouchForm />
              </Box>
            </Box>
          </Box>
        </motion.div>
      </footer>
    </>
  );
}
