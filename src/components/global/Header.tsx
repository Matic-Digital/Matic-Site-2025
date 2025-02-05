'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Box } from './matic-ds';
import { Container } from './matic-ds';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { Logo } from './Logo';

const menuItems = [
  {
    href: '/work',
    label: 'Work',
  },
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/insights',
    label: 'Journal',
  },
  {
    href: '/studio',
    label: 'Studio',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors',
        isScrolled && !isScrollingDown && ' ',
        ''
      )}
      data-no-transition
    >
      <Container 
        width="full" 
        className={cn(
          'transition-colors duration-300',
          isScrolled && !isScrollingDown ? '' : '',
          ''
        )}
      >
        <Box className="h-20 items-center justify-between">
          <Link href="/">
            <Logo variant="dark" className="" />
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
            'hidden md:flex items-center space-x-4 transition-all duration-300',
            isScrollingDown && 'opacity-0 pointer-events-none'
          )}>
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:font-semibold focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                        pathname === item.href && 'text-text'
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Link href="/contact" className="hidden md:block">
            <Button className="bg-text text-[hsl(var(--base-hsl))] hover:bg-text/90">Contact Us</Button>
          </Link>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="bg-transparent hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 text-text"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-base/95 backdrop-blur-md border-border/10">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="mt-8">
                  <ul className="flex flex-col space-y-3">
                    {menuItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'font-medium hover:font-semibold',
                            pathname === item.href && 'text-text'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Box>
      </Container>
    </header>
  );
}
