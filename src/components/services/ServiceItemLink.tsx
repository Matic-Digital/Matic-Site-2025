'use client';

import React from 'react';
import Link from 'next/link';
import type { Work } from '@/types';

interface ServiceItemLinkProps {
  serviceName: string;
  works: Work[];
  className?: string;
  children: React.ReactNode;
}

/**
 * A component that determines whether to route to the work page with a filter
 * or to the contact page based on whether there are matching work items for the service.
 */
export function ServiceItemLink({ serviceName, works, className, children }: ServiceItemLinkProps) {
  // Check if there are any work items with a category matching the service name
  const hasMatchingWorks = works.some((work) =>
    work.categoriesCollection?.items?.some(
      (category) => category.name.toLowerCase() === serviceName.toLowerCase()
    )
  );

  // If there are matching works, route to the work page with the service as a filter
  // Otherwise, route to the contact page
  const href = hasMatchingWorks ? `/work?service=${encodeURIComponent(serviceName)}` : '/contact';

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
