'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/global/Logo';
import { Box, Container } from '@/components/global/matic-ds';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Journal' },
];

export default function Header() {
  const isDark = false; // For now, we'll keep it light theme
  const pathname = usePathname();

  const navClasses = cn(
    'hidden md:flex items-center space-x-4',
    {
      'text-background': !isDark,
      'text-foreground': isDark,
    }
  );

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-colors bg-background duration-300',
    )}>
      <Container width="full">
        <Box className="h-20 items-center justify-between">
          <Link href="/">
            <Logo variant={isDark ? 'light' : 'dark'} withLink={false} />
          </Link>

          <div className={navClasses}>
            {/* Desktop Menu Items */}
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => {
                  const navLinkStyle = cn(
                    "inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm transition-all duration-300",
                    {
                      'text-foreground font-normal hover:text-foreground hover:font-semibold': !isDark,
                      'text-background font-normal hover:text-background hover:font-semibold': isDark,
                      'font-bold': pathname === item.href,
                    }
                  );

                  return (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navLinkStyle}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Box gap={2} className="">
            <Link href="/contact" className="hidden md:block">
              <Button>Contact Us</Button>
            </Link>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium">
                    <Menu className="size-7" />
                    <span className="sr-only">Toggle Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>
                      <Logo variant={isDark ? 'light' : 'dark'} withLink={false} />
                    </SheetTitle>
                  </SheetHeader>
                  {/* Mobile Menu Items */}
                  <nav className="mt-8 flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-lg font-medium hover:text-primary ${
                          pathname === item.href ? 'font-bold' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link href="/contact" className="">
                      <Button>Contact Us</Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </Box>
        </Box>
      </Container>
    </header>
  );
}
