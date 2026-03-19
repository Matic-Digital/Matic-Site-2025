'use client';

import React, { useEffect } from 'react';
import { EmailForm } from '../forms/EmailForm';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';
import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function SubscribeModal({ isOpen, onClose, onSubmit }: SubscribeModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Don't prevent body scroll - allow scrolling past modal
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 z-50 flex items-end justify-center px-4 pb-4 md:items-center md:pb-0 md:pt-0"
        >
          {/* Modal Content - positioned over the blogs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto relative w-full max-w-md overflow-hidden bg-maticblack p-6 shadow-xl md:w-auto md:max-w-none md:p-12"
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-100">
              <Image
                src="/modal-bg.png"
                alt="Modal background"
                fill
                className="border-none object-cover"
                priority
              />
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 p-1 text-white transition-colors hover:text-gray-300"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body */}
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:gap-8">
              {/* Text Section */}
              <div className="flex-shrink-0 text-center md:text-left">
                <h2 className="mb-3 text-xl font-bold text-white md:text-2xl">
                  Subscribe for updates
                </h2>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/80 md:mx-0">
                  Receive periodic strategic downloads on all things brand, design and technology.
                </p>
              </div>

              {/* Email Form Section */}
              <div className="flex flex-shrink-0 flex-col justify-end">
                <div className="md:mt-[calc(2.25rem+0.75rem)]">
                  <EmailForm
                    className="w-full md:w-auto [&_a]:!text-white [&_input]:!bg-transparent [&_input]:!text-white [&_label]:!text-white [&_p]:!text-white"
                    variant="arrow"
                    labelBgClassName="!bg-maticblack !text-white"
                    buttonBgClassName="text-white bg-maticblack border border-white hover:bg-white hover:text-maticblack"
                    webhookUrl={ZAPIER_WEBHOOK_URL}
                    onSubmit={async (data) => {
                      console.log('Newsletter subscription:', data.email);
                      onSubmit();
                    }}
                    borderClassName="!border-white !hover:border-white !focus:border-white !focus:ring-white !focus:ring-offset-0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
