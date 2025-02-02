'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import { getFooter } from '@/lib/api';
import type { Footer as FooterType } from '@/types/contentful';
import { Logo } from './Logo';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, useAnimation } from 'framer-motion';
import { GetInTouchForm } from '../forms/GetInTouchForm';
import ClutchWidget from './ClutchWidget';
import { NewsletterForm } from '../forms/NewsletterForm';

export function Footer() {
const [footer, setFooter] = useState<FooterType | null>(null);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

      void controls.start({
        x: isAtBottom ? 0 : '100%',
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.3
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

async function onError(_error: unknown) {
    setError('Error subscribing to newsletter');
}

  return (
    <footer className="flex overflow-hidden bg-mantle">
      <Container width="full" className="py-12">
        <Box direction="col" className="h-full justify-between" gap={6}>
          <Box direction="col" gap={8}>
            <Box className="" direction="col" gap={4}>
              <Logo variant={resolvedTheme === 'dark' ? 'light' : 'dark'} />
              <h1 className="text-text">
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
              </h1>
            </Box>
            <Box direction="col" className="" gap={8}>
              <p className="max-w-[438px] leading-[140%] text-text">
                {footer?.paragraph}
              </p>
              <Box cols={{ sm: 1, md: 3 }} className="w-fit gap-x-8 gap-y-4">
                <Link href="/work">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Work
                  </p>
                </Link>
                <Link href="/journal">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Journal
                  </p>
                </Link>
                <Link href="/studio">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Studio
                  </p>
                </Link>
                <Link href="/services">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Services
                  </p>
                </Link>
                <Link href="/contact">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Contact
                  </p>
                </Link>
                <Link href="/teams">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Teams
                  </p>
                </Link>
                <Link href="/about">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    About
                  </p>
                </Link>
                <Link href="/careers">
                  <p className="text-[1rem] font-semibold leading-none text-text">
                    Careers
                  </p>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box direction="col" className="flex-grow justify-evenly">
            <Box direction="col" gap={4} className="max-w-[444px]">
              <h4 className="text-text">Subscribe for updates</h4>
              <NewsletterForm variant="inline" />
              <p className="text-sm text-foreground/60">
                We&apos;ll never sell or abuse your email. By subscribing you accept our{' '}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
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
              <Link href={`mailto:${footer?.email}`}>
                <p className="text-text">{footer?.email}</p>
              </Link>
            </Box>
          </Box>
          <Box className="items-center justify-between">
            <Box className="" gap={4}>
              <p className="text-text text-xs">
                &copy;Matic Digital, {new Date().getFullYear()}
              </p>
              <Link href="/privacy">
                <p className="text-text text-xs">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/terms">
                <p className="text-text text-xs">
                  Terms of Use
                </p>
              </Link>
            </Box>
            <ClutchWidget />
          </Box>
        </Box>
      </Container>
      <motion.div
        initial={{ x: '100%' }}
        animate={controls}
        className="flex w-full max-w-[800px] items-center justify-center bg-base py-12"
      >
        <Box direction="col" className="space-y-8 px-16">
          <GetInTouchForm />
        </Box>
      </motion.div>
    </footer>
  );
}
