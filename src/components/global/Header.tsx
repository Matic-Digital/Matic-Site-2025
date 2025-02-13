'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

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
    href: '/studio',
    label: 'Studio'
  }
];

export default function Header() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      
      // Determine scroll direction with a minimum threshold
      const scrollDelta = currentScrollY - lastScrollY.current;
      if (Math.abs(scrollDelta) > 5) { // Only update direction on significant scroll
        setIsScrollingDown(scrollDelta > 0);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="fixed inset-x-0 top-0 z-50 p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container width="full" className={cn(
        'rounded-lg border transition-colors duration-200',
        isScrolled ? 'bg-base/60 backdrop-blur-md border-base/20' : 'bg-transparent border-transparent',
        isScrollingDown ? 'bg-transparent backdrop-blur-none border-transparent' : 'bg-base/60',
        isHovered ? 'bg-base/60 backdrop-blur-md border-base/20' : ''
      )}>
        <Box className="h-16 items-center justify-between">
          <Box className="flex w-full items-center justify-between">
            <Link href="/" className="relative z-50">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className={cn(
              'hidden md:block flex items-center transition-all duration-200',
              isScrolled && !isHovered && isScrollingDown ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'
            )}>
              <NavigationMenu className="h-full flex items-center">
                <NavigationMenuList className="gap-8 h-full flex items-center">
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href} className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn('px-0 flex items-center', pathname === item.href && 'text-text')}
                      >
                        <p className="text-[1rem]">{item.label}</p>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <Link href="/contact">
              <Button className="">Contact Us</Button>
            </Link>

            {/* Mobile Navigation */}
            <Box className="flex items-center gap-4 md:hidden">
              <MobileNav items={menuItems} />
            </Box>
          </Box>
        </Box>
      </Container>
    </header>
  );
}
