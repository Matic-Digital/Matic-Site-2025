'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Box, Container } from '@/components/global/matic-ds';
import { getFooter } from '@/lib/api';
import type { Footer as FooterType } from '@/types/contentful';
import { Logo } from './Logo';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import { motion, useAnimation } from 'framer-motion';
import { GetInTouchForm } from '../forms/GetInTouchForm';
import { FloatingLabelInput } from '../ui/floating-label';
import { ArrowRight } from 'lucide-react';
import ClutchWidget from './ClutchWidget';

export function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null);
  const [email, setEmail] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Handle form submission
      setSuccess('Successfully subscribed to newsletter');
    } catch (err) {
      setError('Error subscribing to newsletter');
    }
  };

  return (
    <footer className="flex overflow-hidden bg-background dark:bg-foreground">
      <Container width="full" className="py-12">
        <Box direction="col" className="h-full justify-between" gap={6}>
          <Box direction="col" gap={8}>
            <Box className="" direction="col" gap={4}>
              <Logo variant={resolvedTheme === 'dark' ? 'dark' : 'dark'} />
              <h1 className="text-foreground dark:text-background">
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
              <p className="max-w-[438px] leading-[140%] text-foreground dark:text-background">
                {footer?.paragraph}
              </p>
              <Box cols={{ sm: 1, md: 3 }} className="w-fit gap-x-8 gap-y-4">
                <Link href="/work">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Work
                  </p>
                </Link>
                <Link href="/journal">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Journal
                  </p>
                </Link>
                <Link href="/studio">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Studio
                  </p>
                </Link>
                <Link href="/services">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Services
                  </p>
                </Link>
                <Link href="/contact">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Contact
                  </p>
                </Link>
                <Link href="/teams">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Teams
                  </p>
                </Link>
                <Link href="/about">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    About
                  </p>
                </Link>
                <Link href="/careers">
                  <p className="text-[1rem] font-semibold leading-none text-foreground dark:text-background">
                    Careers
                  </p>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box direction="col" className="flex-grow justify-evenly">
            <Box direction="col" gap={4} className="max-w-[444px]">
              <h4 className="text-background">Subscribe for updates</h4>
              <form onSubmit={handleSubmit} className="relative">
                <FloatingLabelInput
                  type="email"
                  label="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-foreground dark:text-background"
                  labelClassName="text-foreground/50 dark:text-background/50 peer-placeholder-shown:text-foreground/50 dark:peer-placeholder-shown:text-background/50 peer-focus:text-foreground/50 dark:peer-focus:text-background/50 bg-foreground"
                  borderClassName="border-muted-foreground"
                  focusBorderClassName="focus:border-foreground dark:focus:border-background hover:border-foreground dark:hover:border-background"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-foreground/50 transition-colors hover:text-foreground dark:text-background/50 dark:hover:text-background"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
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
                    className="aspect-square w-[25px] rounded-none border-none object-contain"
                  />
                </Link>
              ))}
              <Link href={`mailto:${footer?.email}`}>
                <p className="text-foreground dark:text-background">{footer?.email}</p>
              </Link>
            </Box>
          </Box>
          <Box className="items-center justify-between">
            <Box className="" gap={4}>
              <p className="text-foreground dark:text-background text-xs">
                &copy;Matic Digital, {new Date().getFullYear()}
              </p>
              <Link href="/privacy">
                <p className="text-foreground dark:text-background text-xs">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/terms">
                <p className="text-foreground dark:text-background text-xs">
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
        className="flex w-full max-w-[800px] items-center justify-center bg-foreground py-12 dark:bg-background"
      >
        <Box direction="col" className="space-y-8 px-16">
          <GetInTouchForm />
        </Box>
      </motion.div>
    </footer>
  );
}
