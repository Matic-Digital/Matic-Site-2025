'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetOverlay } from '@/components/ui/sheet';
import { useState } from 'react';

interface MobileNavProps {
  items: Array<{ href: string; label: string }>;
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer text-text">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </div>
      </SheetTrigger>
      <SheetOverlay className="backdrop-blur-sm" />
      <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-background/95 backdrop-blur-md">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="mt-8">
          <ul className="flex flex-col space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'font-medium',
                    pathname === item.href && 'text-text'
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
