'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  loading?: boolean;
}

export function PageTransition({ children, loading = false }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state on route change
    setIsLoading(true);

    // Wait for all priority images to load
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img[fetchpriority="high"]');
      return Array.from(images).every((img): img is HTMLImageElement => {
        if (!(img instanceof HTMLImageElement)) return false;
        return img.complete && img.naturalWidth > 0;
      });
    };

    if (checkImagesLoaded()) {
      setIsLoading(false);
    } else {
      // Wait for load event on window to ensure all priority resources are loaded
      const handleLoad = () => {
        if (checkImagesLoaded()) {
          setIsLoading(false);
        }
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading || loading ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
