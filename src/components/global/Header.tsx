'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 m-4 rounded-lg',
        !isScrolled ? 'bg-transparent border-transparent backdrop-blur-none' :
          (!isHovered && isScrollingDown) ? 'bg-transparent border-transparent backdrop-blur-none' : 'bg-base/75 border-base backdrop-blur'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container width="full">
        <Box className="h-16 items-center justify-between">
          <div className="w-[40px] flex-shrink-0">
            <Link href="/" onClick={handleLogoClick}>
              <Logo className="" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={cn(
            'absolute left-1/2 -translate-x-1/2 hidden md:block',
            isScrolled && !isHovered && isScrollingDown ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 translate-y-0'
          )}>
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'transition-colors duration-100 px-4',
                        pathname === item.href && 'text-text'
                      )}
                    >
                      <p className="text-[0.875rem]">
                        {item.label}
                      </p>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Link href="/contact" className="hidden md:block flex-shrink-0">
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
                            'font-medium transition-all duration-100 hover:font-semibold',
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
