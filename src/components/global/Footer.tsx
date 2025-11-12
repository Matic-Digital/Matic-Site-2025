'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import { getFooter } from '@/lib/api';
import type { Footer as FooterType } from '@/types/contentful';
import { Logo } from './Logo';
import Image from 'next/image';
import { ClutchWidget } from './ClutchWidget';
import cn from 'classnames';

export function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show form on desktop devices
      if (window.innerWidth >= 768) {
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

        setIsFormVisible(isAtBottom);
      } else {
        // Always hide form on mobile
        setIsFormVisible(false);
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
  }, []);

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
      
      {/* <div className="bg-secondary blue:bg-text dark:bg-background md:hidden">
        <Container width="full" className="py-12">
          <Box direction="col" className="space-y-8">
            <h2 className="text-2xl font-medium text-text blue:text-maticblack">Get in touch</h2>
            <GetInTouchForm />
          </Box>
        </Container>
      </div>
      */} 
      <footer
        id="footer"
        className="relative overflow-hidden bg-background blue:bg-text dark:bg-text"
      >
        {/* <Box className="absolute z-40 h-[15px] w-full">
          <div className="flex-grow bg-darkblue"></div>
          <div className="flex-grow bg-blue"></div>
          <div className="flex-grow bg-green"></div>
          <div className="flex-grow bg-pink"></div>
          <div className="flex-grow bg-orange"></div>
          <div className="flex-grow bg-purple"></div>
        </Box> */}

        <Container width="full" className="py-12 px-[5.19rem]">
          <Box direction="col" className="h-full justify-between space-y-16">
            <Box className="flex flex-col md:flex-row md:justify-between" gap={8}>
              <Box direction="col" gap={8} className="flex-1">
                <Box className="" direction="col" gap={4}>
                  <div
                    className={cn(
                      'transition-colors duration-300',
                      isFormVisible
                        ? 'text-darkblue blue:text-background dark:text-maticblack'
                        : 'text-text blue:text-maticblack dark:text-maticblack'
                    )}
                  >
                    <Logo className="block" />
                  </div>
                  <p
                    className={cn(
                      'text-4xl font-bold transition-colors duration-300',
                      isFormVisible
                        ? 'text-darkblue blue:text-background dark:text-maticblack'
                        : 'text-text blue:text-maticblack dark:text-maticblack'
                    )}
                  >
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
                  </p>
                </Box>
                <Box direction="col" className="" gap={8}>
                  <p className="max-w-[438px] leading-[140%] text-text blue:text-maticblack dark:text-maticblack">
                    {footer?.paragraph}
                  </p>
                  
                  {/* Footer Buttons */}
                  <Box className="flex gap-[1.19rem]">
                    <button 
                      onClick={() => window.location.href = '/contact'}
                      className="bg-maticblack text-white px-6 py-3 rounded-sm cursor-pointer"
                    >
                      Get in touch
                    </button>
                    <button 
                      onClick={() => window.open('https://calendly.com/maticdigital/30min', '_blank', 'noopener,noreferrer')}
                      className="border border-maticblack bg-transparent text-maticblack px-6 py-3 rounded-sm cursor-pointer"
                    >
                      Book a meeting
                    </button>
                  </Box>
                </Box>
              </Box>
              
              {/* Navigation Links - Right Side */}
              <Box direction="col" className="flex-shrink-0 md:w-[300px] md:pt-14" gap={4}>
                <Box cols={{ base: 2, md: 2 }} className="w-full gap-x-[5.5rem] gap-y-5">
                  <Link href="/work">
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      Work
                    </p>
                  </Link>
                  <Link href="/blog">
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      Blog
                    </p>
                  </Link>
                  <Link href="/services">
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      Services
                    </p>
                  </Link>
                  <Link href="https://www.maticteams.com" target="_blank" rel="noopener noreferrer">
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      Matic Teams
                    </p>
                  </Link>
                  <Link href="/about">
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      About
                    </p>
                  </Link>
                  <Link
                    href="https://matic.applytojob.com/apply"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                      Careers
                    </p>
                  </Link>
                </Box>
                
                {/* Subscribe Button with Arrow */}
                <div className="mt-[8.06rem]">
                  <Link href="/#blog" className="font-semibold text-lg text-maticblack hover:text-blue">
                    Subscribe to our newsletter →
                  </Link>
                </div>
              </Box>
            </Box>
            <Box direction="col" className="flex-grow justify-evenly space-y-12">
              {/* <Box direction="col" gap={4} className="max-w-[444px]">
                <h4 className="text-text blue:text-maticblack dark:text-maticblack">
                  Subscribe for updates
                </h4>
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
              </Box> */}
              <Box className="" gap={8}>
                {footer?.socialsCollection?.items.map((social, index) => (
                  <Link key={index} href={social.url} target="_blank" rel="nofollow noopener noreferrer">
                    <Image
                      src={social.logo.url}
                      alt={social.name}
                      width={100}
                      height={100}
                      className="filter-footer aspect-square w-[2rem] rounded-none border-none object-contain"
                    />
                  </Link>
                ))}
                {/* <Link
                  href={`mailto:${footer?.email}`}
                  className="text-maticblack transition-colors hover:text-blue"
                >
                  <p className="text-[hsl(var(--footer-text-hsl))]">{footer?.email}</p>
                </Link> */}
              </Box>
              
              {/* Divider */}
              <div className="mt-[2.87rem] h-px w-full opacity-50" style={{ backgroundColor: '#000227' }}></div>
            </Box>
            <Box className="flex items-center justify-between mt-[1.31rem]">
              <Box className="flex flex-row items-center gap-4">
                <p className="text-xs text-text blue:text-maticblack dark:text-maticblack">
                  &copy;Matic Digital, {new Date().getFullYear()}
                </p>
                <Link href="/privacy-policy">
                  <p className="text-xs text-text blue:text-maticblack dark:text-maticblack">
                    Privacy Policy
                  </p>
                </Link>
              </Box>
              <Box>
                <ClutchWidget />
              </Box>
            </Box>
          </Box>
        </Container>
        {/* <motion.div
          animate={controls}
          initial={{ x: '100%' }}
          className="absolute bottom-0 right-0 flex h-full items-stretch"
        >
          <Box className="relative flex h-full items-stretch">
            <Box className="flex w-[500px] flex-col items-center bg-secondary blue:bg-background dark:bg-background">
              <Box className="w-full px-16 pt-[6.3rem]">
                <p className="text-[2.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-text blue:text-text md:blue:text-text">
                  Get in touch
                </p>
              </Box>
              <Box direction="col" className="w-full space-y-8 px-16 pt-12">
                <GetInTouchForm />
              </Box>
            </Box>
          </Box>
        </motion.div> */}
      </footer>
    </>
  );
}
