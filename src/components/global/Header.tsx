'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { Service, Industry } from '@/types/contentful';

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
    href: '/blog',
    label: 'Blog'
  }
];

interface HeaderProps {
  services?: Service[];
  industries?: Industry[];
}

export default function Header({ services = [], industries = [] }: HeaderProps = {}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const lastScrollY = useRef(0);
  const initialScrollHandled = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('Header - Services:', services);
    console.log('Header - Industries:', industries);
  }, [services, industries]);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownOpen]);

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
              ref={dropdownRef}
            >
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      {item.href === '/services' ? (
                        <div 
                          className="flex items-center gap-0"
                          onMouseEnter={() => setServicesDropdownOpen(true)}
                          onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              'flex select-none items-center gap-1 space-y-1 rounded-md p-3 leading-none text-text no-underline outline-none transition-all duration-200 hover:text-text dark:text-text dark:hover:text-text',
                              pathname.startsWith(item.href)
                                ? 'font-medium'
                                : 'font-light hover:font-medium'
                            )}
                          >
                            {item.label}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-1"
                            >
                              {/* Horizontal line - visible when closed */}
                              <motion.path
                                d="M4 8 L12 8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={false}
                                animate={{
                                  opacity: servicesDropdownOpen ? 0 : 1,
                                  pathLength: servicesDropdownOpen ? 0 : 1
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut"
                                }}
                              />
                              {/* Chevron down - visible when open */}
                              <motion.path
                                d="M4 7 L8 11 L12 7"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={false}
                                animate={{
                                  opacity: servicesDropdownOpen ? 1 : 0,
                                  pathLength: servicesDropdownOpen ? 1 : 0
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut"
                                }}
                              />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none text-text no-underline outline-none transition-all duration-200 hover:text-text dark:text-text dark:hover:text-text',
                            pathname.startsWith(item.href)
                              ? 'font-medium'
                              : 'font-light hover:font-medium'
                          )}
                          target={item.href.startsWith('https://') ? '_blank' : undefined}
                          rel={
                            item.href.startsWith('https://')
                              ? 'nofollow noopener noreferrer'
                              : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      )}
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

      {/* Services Dropdown Menu */}
      <AnimatePresence>
        {servicesDropdownOpen && (
          <>
            {/* Invisible bridge to keep dropdown open when hovering gap */}
            <div
              className="fixed left-0 right-0 top-[5rem] z-40 h-[3rem]"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-[8rem] z-40 md:px-8"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Container width="full">
                <div className="bg-white overflow-hidden" style={{ borderRadius: '0.5rem', boxShadow: '0 0 18px 6px rgba(0, 0, 0, 0.15)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-0">
                    {/* Left side: First two sections with padding */}
                    <div className="p-8" style={{ borderBottom: '0.75rem solid #000227' }}>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Section 1: Craft & Capability - Alt Industries */}
                        <div>
                          <p className="mb-4 text-xs font-medium uppercase tracking-wider" style={{ color: '#076EFF' }}>
                            Craft & Capability
                          </p>
                          <div className="flex flex-col" style={{ gap: '1.25rem' }}>
                            {industries && industries.length > 0 ? (
                              industries
                                .filter((industry) => industry.pageVariant === 'Alt')
                                .map((industry) => (
                                  <Link
                                    key={industry.sys.id}
                                    href={`/services/${industry.slug}`}
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="block rounded-md transition-colors hover:text-maticblack/70 relative"
                                    style={{
                                      position: 'relative'
                                    }}
                                    onMouseEnter={(e) => {
                                      const dot = document.createElement('div');
                                      dot.className = 'hover-dot';
                                      dot.style.cssText = 'position: absolute; left: -16px; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; background-color: #076EFF; transition: all 0.2s;';
                                      e.currentTarget.appendChild(dot);
                                    }}
                                    onMouseLeave={(e) => {
                                      const dot = e.currentTarget.querySelector('.hover-dot');
                                      if (dot) dot.remove();
                                    }}
                                  >
                                    <p className="font-normal text-maticblack">{industry.name}</p>
                                  </Link>
                                ))
                            ) : (
                              <p className="text-sm text-maticblack/50">No industries available</p>
                            )}
                          </div>
                        </div>

                        {/* Section 2: Sector Expertise - Default Industries */}
                        <div>
                          <p className="mb-4 text-xs font-medium uppercase tracking-wider" style={{ color: '#076EFF' }}>
                            Sector Expertise
                          </p>
                          <div className="grid grid-cols-3" style={{ columnGap: '1.62rem', rowGap: '1.69rem' }}>
                            {industries && industries.length > 0 ? (
                              industries
                                .filter((industry) => industry.pageVariant === 'Default')
                                .map((industry) => (
                                  <Link
                                    key={industry.sys.id}
                                    href={`/services/${industry.slug}`}
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="flex flex-col items-start gap-2 rounded-md transition-colors hover:text-maticblack/70 relative"
                                    onMouseEnter={(e) => {
                                      const dot = document.createElement('div');
                                      dot.className = 'hover-dot';
                                      dot.style.cssText = 'position: absolute; left: -16px; top: 8px; width: 6px; height: 6px; border-radius: 50%; background-color: #076EFF; transition: all 0.2s;';
                                      e.currentTarget.appendChild(dot);
                                    }}
                                    onMouseLeave={(e) => {
                                      const dot = e.currentTarget.querySelector('.hover-dot');
                                      if (dot) dot.remove();
                                    }}
                                  >
                                    {industry.navIcon && (
                                      <Image
                                        src={industry.navIcon.url}
                                        alt={industry.navIcon.title || industry.name}
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                        style={{ borderRadius: 0, border: 'none' }}
                                      />
                                    )}
                                    <p className="font-normal text-maticblack">{industry.name}</p>
                                  </Link>
                                ))
                            ) : (
                              <p className="text-sm text-maticblack/50">No industries available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Insights Card - extends to edges */}
                    <Link
                      href="/blog/signals"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="group relative flex flex-col justify-between overflow-hidden bg-maticblack p-8 min-h-[20rem] transition-all hover:brightness-110"
                      style={{ borderBottom: '0.75rem solid #076EFF' }}
                    >
                      {/* Background SVG */}
                      <Image
                        src="/default-service-cta-card.svg"
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', border: 'none', borderRadius: 0 }}
                        className="z-0"
                        priority
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#076EFF]">
                            Insights
                          </p>
                          <p className="text-lg text-white leading-[140%]">
                            What's moving in AI, design, technology, and the industries we serve. From the team building in it.
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-base font-semibold text-white transition-colors group-hover:text-white/90">
                          Explore Signals
                          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="23" viewBox="0 0 31 23" fill="none" className="transition-transform group-hover:translate-x-1">
                            <g clipPath="url(#clip0_1_854)">
                              <path d="M26.443 9.66602H0V13.0561H26.443V9.66602Z" fill="white"/>
                              <path d="M19.11 22.7257L16.7188 20.3489L25.7637 11.3628L16.7188 2.37675L19.11 0L30.5381 11.3628L19.11 22.7257Z" fill="white"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1_854">
                                <rect width="30.5376" height="22.7257" rx="8" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Container>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
