'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetOverlay } from '@/components/ui/sheet';
import { useState } from 'react';
import { Button } from '../ui/button';
import type { Service, Industry } from '@/types/contentful';

interface MobileNavProps {
  items: Array<{ href: string; label: string }>;
  services?: Service[];
  industries?: Industry[];
}

export function MobileNav({ items, services = [], industries = [] }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer text-text">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </div>
      </SheetTrigger>
      <SheetOverlay className="backdrop-blur-sm" />
      <SheetContent
        side="right"
        className="w-[280px] bg-background/95 backdrop-blur-md sm:w-[350px] overflow-y-auto"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="mt-8 flex flex-col gap-4">
          <ul className="flex flex-col space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                {item.label === 'Services' ? (
                  <div>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex w-full items-center justify-between font-medium"
                    >
                      <span>{item.label}</span>
                      {servicesOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {servicesOpen && (
                      <div className="mt-6 ml-4 flex flex-col gap-4">
                        {/* Services Landing Page Link */}
                        <Link
                          href="/services"
                          className={cn('font-medium hover:text-blue transition-colors', pathname === '/services' && 'text-blue')}
                          onClick={() => setOpen(false)}
                        >
                          Services
                        </Link>

                        {/* Craft & Capability - Alt Industries */}
                        <div>
                          <p className="mb-3 mt-2 text-xs font-medium uppercase tracking-wider text-[#076EFF]">
                            Craft & Capability
                          </p>
                          <div className="flex flex-col gap-2">
                            {industries && industries.length > 0 ? (
                              industries
                                .filter((industry) => industry.pageVariant === 'Alt')
                                .map((industry) => (
                                  <Link
                                    key={industry.sys.id}
                                    href={`/services/${industry.slug}`}
                                    className={cn(
                                      "text-sm hover:text-blue transition-colors",
                                      pathname === `/services/${industry.slug}` && 'text-blue'
                                    )}
                                    onClick={() => setOpen(false)}
                                  >
                                    {industry.name}
                                  </Link>
                                ))
                            ) : (
                              <p className="text-xs text-maticblack/50">No services available</p>
                            )}
                          </div>
                        </div>

                        {/* Sector Expertise - Default Industries */}
                        <div>
                          <p className="mb-3 mt-2 text-xs font-medium uppercase tracking-wider text-[#076EFF]">
                            Sector Expertise
                          </p>
                          <div className="flex flex-col gap-2">
                            {industries && industries.length > 0 ? (
                              industries
                                .filter((industry) => industry.pageVariant === 'Default')
                                .map((industry) => (
                                  <Link
                                    key={industry.sys.id}
                                    href={`/services/${industry.slug}`}
                                    className={cn(
                                      "text-sm hover:text-blue transition-colors",
                                      pathname === `/services/${industry.slug}` && 'text-blue'
                                    )}
                                    onClick={() => setOpen(false)}
                                  >
                                    {industry.name}
                                  </Link>
                                ))
                            ) : (
                              <p className="text-xs text-maticblack/50">No services available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn('font-medium hover:text-blue transition-colors', pathname === item.href && 'text-blue')}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="ml-6" onClick={() => setOpen(false)}>
            <Button variant="default">Contact Us</Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
