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
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const menuItems = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Journal' },
];

export default function Header() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and before hydration, default to light theme styles
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300" data-no-transition>
        <Container width="full">
          <Box className="h-20 items-center justify-between">
            <Link href="/">
              <Logo variant="dark" withLink={false} />
            </Link>

            <div className="hidden md:flex items-center space-x-4 text-foreground">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                            {
                              'text-muted-foreground': pathname !== item.href,
                              'font-bold': pathname === item.href,
                            }
                          )}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-accent-foreground',
                        {
                          'text-muted-foreground': pathname !== item.href,
                          'font-bold': pathname === item.href,
                        }
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </Box>
        </Container>
      </header>
    );
  }

  // After hydration, use the resolved theme
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
      )}
      data-no-transition
    >
      <Container width="full" className="border-b border-border bg-background/80 backdrop-blur">
        <Box className="h-20 items-center justify-between">
          <Link href="/">
            <Logo variant={resolvedTheme === 'dark' ? 'light' : 'dark'} withLink={false} />
          </Link>
          <div className={cn(
            'hidden md:flex items-center space-x-4',
            {
              'text-background': resolvedTheme === 'dark',
              'text-foreground': resolvedTheme === 'light',
            }
          )}>
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          {
                            'text-foreground font-normal': pathname !== item.href,
                            'font-semibold': pathname === item.href,
                          }
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Box gap={2} className="">
            <Link href="/contact" className="hidden md:block">
              <Button>Contact Us</Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <Logo variant={resolvedTheme === 'dark' ? 'light' : 'dark'} withLink={false} />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-accent-foreground',
                        {
                          'text-muted-foreground': pathname !== item.href,
                          'font-bold': pathname === item.href,
                        }
                      )}
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
          </Box>
        </Box>
      </Container>
    </header>
  );
}
