'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '@/components/providers/LoadingProvider';
import { SiteLoader } from './SiteLoader';

export function PageTransition() {
  const { isLoading } = useLoading();
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Always show the transition overlay immediately
      setShow(true);
      // Delay showing the loader
      const timer = setTimeout(() => {
        if (isLoading) {
          setShowLoader(true);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
      // Keep the transition overlay visible briefly to cover the page transition
      const timer = setTimeout(() => setShow(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.2 // Delay exit to allow new page content to fade in
            }
          }}
          className="fixed inset-x-0 bottom-0 top-24 z-50 pointer-events-none"
        >
          {/* Background fade layer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: showLoader ? 0.8 : 0.4,
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            className="absolute inset-0 bg-background"
          />
          
          {/* Blur layer - only show during longer loads */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: showLoader ? 1 : 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            className="absolute inset-0 backdrop-blur-sm"
          />

          {/* Loader */}
          <AnimatePresence>
            {showLoader && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn"
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SiteLoader />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
