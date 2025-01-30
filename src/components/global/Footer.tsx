'use client';

import React, { useEffect, useState } from 'react';
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

export function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null);
  const { resolvedTheme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      
      void controls.start({ 
        x: isAtBottom ? 0 : "100%", 
        transition: { 
          type: "spring", 
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

  return (
    <footer className="flex bg-background dark:bg-foreground overflow-hidden">
      <Container width="full" className="py-12">
        <Box direction="col" className="">
          <Box className="" direction="col">
            <Logo variant={resolvedTheme === 'dark' ? 'dark' : 'dark'} />
            <h1 className="text-foreground dark:text-background">
              {footer?.tagline?.split(' ').map((word, index, array) => (
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
          <Box direction="col" className="">
            <p className="text-foreground dark:text-background">{footer?.paragraph}</p>
            <Box cols={{ sm: 1, md: 3 }} gap={4}>
              <Link href="/work">
                <p className="text-foreground dark:text-background">Work</p>
              </Link>
              <Link href="/journal">
                <p className="text-foreground dark:text-background">Journal</p>
              </Link>
              <Link href="/studio">
                <p className="text-foreground dark:text-background">Studio</p>
              </Link>
              <Link href="/services">
                <p className="text-foreground dark:text-background">Services</p>
              </Link>
              <Link href="/contact">
                <p className="text-foreground dark:text-background">Contact</p>
              </Link>
              <Link href="/teams">
                <p className="text-foreground dark:text-background">Teams</p>
              </Link>
              <Link href="/about">
                <p className="text-foreground dark:text-background">About</p>
              </Link>
              <Link href="/careers">
                <p className="text-foreground dark:text-background">Careers</p>
              </Link>
            </Box>
          </Box>
          <Box className="" direction="col">
            <h3 className="mb-4 text-foreground dark:text-background">Subscribe for updates</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Work email"
                  className="bg-background text-foreground dark:bg-foreground dark:text-background"
                />
                <Button
                  type="submit"
                  className="bg-foreground text-background hover:bg-foreground/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </Box>
          <Box className="">
            {footer?.socialsCollection?.items.map((social, index) => (
              <Link key={index} href={social.url}>
                <Image
                  src={social.logo.url}
                  alt={social.name}
                  width={100}
                  height={100}
                  className="aspect-square w-24 rounded-none border-none object-contain"
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
      <motion.div
        initial={{ x: "100%" }}
        animate={controls}
        className="min-w-[800px] bg-foreground dark:bg-background py-12 flex items-center justify-center"
      >
        <Box direction="col" className="space-y-8 px-16">
          <h2 className="text-4xl font-light text-background dark:text-foreground">Get in touch</h2>
          <p className="text-background/80 dark:text-foreground/80 max-w-md">
            Let&apos;s discuss how we can help you achieve your business goals.
          </p>
          <Button 
            className="bg-background text-foreground dark:bg-foreground dark:text-background hover:bg-background/90 dark:hover:bg-foreground/90 w-fit"
            size="lg"
          >
            Contact us
          </Button>
        </Box>
      </motion.div>
    </footer>
  );
}
