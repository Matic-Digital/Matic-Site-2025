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
    <footer className="flex overflow-hidden bg-[hsl(var(--footer-bg-hsl))]">
      <Container width="full" className="py-12">
        <Box direction="col" className="h-full justify-between" gap={6}>
          <Box direction="col" gap={8}>
            <Box className="" direction="col" gap={4}>
              <Logo />
              <h1 className="text-[hsl(var(--footer-text-hsl))]">
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
              <p className="max-w-[438px] leading-[140%] text-[hsl(var(--footer-text-hsl))]">
                {footer?.paragraph}
              </p>
              <Box cols={{ sm: 1, md: 3 }} className="w-fit gap-x-8 gap-y-4">
                <Link href="/work">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Work
                  </p>
                </Link>
                <Link href="/journal">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Journal
                  </p>
                </Link>
                <Link href="/studio">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Studio
                  </p>
                </Link>
                <Link href="/services">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Services
                  </p>
                </Link>
                <Link href="/contact">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Contact
                  </p>
                </Link>
                <Link href="/teams">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Teams
                  </p>
                </Link>
                <Link href="/about">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    About
                  </p>
                </Link>
                <Link href="/careers">
                  <p className="text-[1rem] font-semibold leading-none text-[hsl(var(--footer-text-hsl))]">
                    Careers
                  </p>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box direction="col" className="flex-grow justify-evenly">
            <Box direction="col" gap={4} className="max-w-[444px]">
              <h4 className="text-[hsl(var(--footer-text-hsl))]">Subscribe for updates</h4>
              <NewsletterForm 
                variant="inline" 
                labelClassName="!text-[hsl(var(--footer-text-hsl))] bg-[hsl(var(--footer-bg-hsl))]"
                inputClassName="text-[hsl(var(--footer-text-hsl))] placeholder-transparent"
                borderClassName="border-[hsl(var(--footer-text-hsl))] hover:border-[hsl(var(--footer-text-hsl))] focus:border-[hsl(var(--footer-text-hsl))] active:border-[hsl(var(--footer-text-hsl))]"
                buttonClassName="text-[hsl(var(--footer-text-hsl))] hover:text-[hsl(var(--footer-text-hsl))] focus:text-[hsl(var(--footer-text-hsl))] active:text-[hsl(var(--footer-text-hsl))]"
                className="w-full"
              />
              <p className="text-sm text-[hsl(var(--footer-text-hsl))]">
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
                <p className="text-[hsl(var(--footer-text-hsl))]">{footer?.email}</p>
              </Link>
            </Box>
          </Box>
          <Box className="items-center justify-between">
            <Box className="" gap={4}>
              <p className="text-[hsl(var(--footer-text-hsl))] text-xs">
                &copy;Matic Digital, {new Date().getFullYear()}
              </p>
              <Link href="/privacy">
                <p className="text-[hsl(var(--footer-text-hsl))] text-xs">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/terms">
                <p className="text-[hsl(var(--footer-text-hsl))] text-xs">
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
        className="flex w-full max-w-[800px] items-center justify-center bg-[hsl(var(--footer-form-bg-hsl))] py-12"
      >
        <Box direction="col" className="space-y-8 px-16">
          <GetInTouchForm />
        </Box>
      </motion.div>
    </footer>
  );
}
