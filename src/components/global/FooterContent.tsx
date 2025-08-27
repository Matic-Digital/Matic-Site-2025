'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import type { Footer as FooterType } from '@/types/contentful';
import { Logo } from './Logo';
import Image from 'next/image';
import { useAnimation } from 'framer-motion';
import { EmailForm } from '../forms/EmailForm';
import cn from 'classnames';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';

interface FooterContentProps {
  footer: FooterType;
}

export function FooterContent({ footer }: FooterContentProps) {
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

  return (
    <Container width="full" className="py-12">
      <Box direction="col" className="h-full justify-between space-y-16">
        <Box direction="col" gap={8}>
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
            <h1
              className={cn(
                'transition-colors duration-300',
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
            </h1>
          </Box>
          <Box direction="col" className="" gap={8}>
            <p className="max-w-[438px] leading-[140%] text-text blue:text-maticblack dark:text-maticblack">
              {footer?.paragraph}
            </p>
            <Box cols={{ base: 3, md: 3 }} className="w-fit gap-x-16 gap-y-6">
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
              <Link href="/studio">
                <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                  Studio
                </p>
              </Link>
              <Link href="/services">
                <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                  Services
                </p>
              </Link>
              <Link href="/contact">
                <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                  Contact
                </p>
              </Link>
              <Link href="/teams">
                <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                  Teams
                </p>
              </Link>
              <Link href="/careers">
                <p className="text-[1rem] font-semibold leading-none text-text blue:text-maticblack dark:text-maticblack">
                  Careers
                </p>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box direction="col" className="flex-grow justify-evenly space-y-12">
          <Box direction="col" gap={4} className="max-w-[444px]">
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
            />
          </Box>
          <Box className="" gap={8}>
            {footer?.socialsCollection?.items.map((social, index) => (
              <Link key={index} href={social.url}>
                <Image
                  src={social.logo.url}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="invert blue:invert-0 dark:invert-0"
                />
              </Link>
            ))}
          </Box>
          <Box direction="col" gap={4}>
            <p className="text-text blue:text-maticblack dark:text-maticblack">{footer?.address}</p>
            <Box gap={4}>
              <Link href={`tel:${footer?.phone}`}>
                <p className="text-text blue:text-maticblack dark:text-maticblack">
                  {footer?.phone}
                </p>
              </Link>
              <Link href={`mailto:${footer?.email}`}>
                <p className="text-text blue:text-maticblack dark:text-maticblack">
                  {footer?.email}
                </p>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
