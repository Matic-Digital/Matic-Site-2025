'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Box } from './matic-ds';
import { Container } from './matic-ds';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from '@/components/ui/navigation-menu';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';

const menuItems = [
  {
    href: '/work',
    label: 'Work'
  },
  {
    href: '/services',
    label: 'Services'
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/insights',
    label: 'Journal'
  },
  {
    href: 'https://www.maticteams.com',
    label: 'On-Demand Teams'
  }
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);
  const initialScrollHandled = useRef(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.85, 0.9], [1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Special handling for initial scroll from top
      if (currentScrollY <= 10) {
        // Reset when at the top
        setIsScrolled(false);
        setIsScrollingDown(false);
        initialScrollHandled.current = false;
      } else {
        // Always set scrolled to true when not at the top
        setIsScrolled(true);

        // For the first scroll event after leaving the top
        if (!initialScrollHandled.current && lastScrollY.current <= 10 && currentScrollY > 10) {
          setIsScrollingDown(true);
          initialScrollHandled.current = true;
        } else {
          // Normal scroll direction detection with threshold
          const scrollDelta = currentScrollY - lastScrollY.current;
          if (Math.abs(scrollDelta) > 5) {
            // Only update direction on significant scroll
            setIsScrollingDown(scrollDelta > 0);
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show background on hover when scrolled, or on scroll up
  // Never show background when scrolling down from the top
  const shouldShowBackground = isHovered ? isScrolled : !isScrollingDown && isScrolled;

  return (
    <motion.header
      style={{ opacity }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-200 md:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container
        width="full"
        className={cn(
          'text-text transition-all duration-200 md:rounded-lg md:border',
          shouldShowBackground
            ? 'border-background/20 bg-background/60 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        )}
      >
        <Box className="h-16 items-center justify-between">
          <Box className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50 text-text hover:text-text/90">
              <Logo className="text-current hover:text-current" />
            </Link>

            {/* Desktop Navigation */}
            <div
              className={cn(
                'absolute left-1/2 hidden -translate-x-1/2 transition-all duration-200 md:block',
                isScrollingDown && isScrolled && !isHovered
                  ? 'pointer-events-none translate-y-2 opacity-0'
                  : 'translate-y-0 opacity-100'
              )}
            >
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none text-text no-underline outline-none transition-all duration-200 hover:text-text dark:text-text dark:hover:text-text',
                          pathname.startsWith(item.href)
                            ? 'font-medium'
                            : 'font-light hover:font-medium'
                        )}
                        target={item.href.startsWith('https://') ? '_blank' : undefined}
                        rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Contact Button */}
            <div className="hidden md:block">
              <Link href="/contact">
                <Button variant="default" className="rounded-sm">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav items={menuItems} />
            </div>
          </Box>
        </Box>
      </Container>
    </motion.header>
  );
}
