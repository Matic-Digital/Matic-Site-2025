'use client';
// Next.js and icon imports
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { ErrorBoundary } from '@/components/global/ErrorBoundary';

import { Container, Box } from '@/components/global/matic-ds';

// Navigation menu components from shadcn
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

// Sheet components for mobile menu from shadcn
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from '@/components/ui/sheet';

import { Logo } from '@/components/global/Logo';

// Theme toggle component
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { Button } from '../ui/button';

/**
 * Navigation menu items configuration
 * Each item has a URL and display label
 */
const menuItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Journal' },
  { href: '/studio', label: 'Studio' },
];

/**
 * Header component with responsive navigation
 * Features:
 * - Desktop: Full navigation menu
 * - Mobile: Hamburger menu with slide-out sheet
 * - Sticky positioning with blur effect
 * - Consistent branding across breakpoints
 */
export function Header() {
  const pathname = usePathname();

  return (
    <Container width="full" className="sticky top-0 z-50 px-4">
      <header className="w-full">
        <Box className="items-center justify-between">
          {/* Desktop Navigation */}
          <Logo />

          <div className="mr-4 hidden md:flex">
            {/* Desktop Menu Items */}
            <ErrorBoundary>
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                          {...(pathname === item.href && { 'data-active': true })}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </ErrorBoundary>
          </div>

          <Box gap={2}>
            <Link href="/contact">
              <Button className="">
                Get in touch
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              {/* Hamburger Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium">
                    <Menu className="size-7" />
                    <span className="sr-only">Toggle Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <Logo />
                  </SheetHeader>
                  {/* Mobile Menu Items */}
                  <nav className="mt-8 flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={`text-lg font-medium hover:text-primary ${
                            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </Box>
        </Box>
      </header>
    </Container>
  );
}
