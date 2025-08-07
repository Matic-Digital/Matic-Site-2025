'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PageTransitionProps {
  children: React.ReactNode;
  loading?: boolean;
}

// This tracks links that have been prefetched
const prefetchedPaths = new Set<string>();

// Component to prefetch pages when links are visible in viewport
export function PrefetchLink({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!prefetchedPaths.has(href)) {
      router.prefetch(href);
      prefetchedPaths.add(href);
    }
  }, [href, router]);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Animation variants
const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export function PageTransition({ children, loading = false }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      // Skip transition on first load for faster initial page render
      setIsFirstLoad(false);
      setIsLoading(false);
      return;
    }

    // Reset loading state on route change
    setIsLoading(true);

    // Use requestAnimationFrame to check for high priority images
    // This is more efficient than the previous implementation
    const checkImagesLoaded = () => {
      requestAnimationFrame(() => {
        const priorityImages = document.querySelectorAll('img[fetchpriority="high"]');

        // If no priority images, don't delay transition
        if (priorityImages.length === 0) {
          setIsLoading(false);
          return;
        }

        const allLoaded = Array.from(priorityImages).every((img): img is HTMLImageElement => {
          if (!(img instanceof HTMLImageElement)) return false;
          return img.complete && img.naturalWidth > 0;
        });

        if (allLoaded) {
          setIsLoading(false);
        } else {
          // Set a maximum timeout to prevent waiting too long
          setTimeout(() => setIsLoading(false), 300);
        }
      });
    };

    // Check immediately
    checkImagesLoaded();

    // Also check on window load for any remaining resources
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [pathname, isFirstLoad]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate={isLoading || loading ? 'hidden' : 'enter'}
        exit="exit"
        variants={variants}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
