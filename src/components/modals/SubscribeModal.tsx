'use client';

import React, { useEffect } from 'react';
import { EmailForm } from '../forms/EmailForm';
import { ZAPIER_WEBHOOK_URL } from '@/lib/constants';
import { X } from 'lucide-react';
import Image from 'next/image';

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

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Modal Content - positioned over the blogs */}
      <div className="relative bg-maticblack shadow-xl pointer-events-auto p-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-100">
          <Image
            src="/modal-bg.png"
            alt="Modal background"
            fill
            className="object-cover border-none"
            priority
          />
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Body */}
        <div className="relative flex gap-8 z-10">
          {/* Left side - Text */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-white mb-3 whitespace-nowrap">
              Subscribe for updates
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Receive periodic strategic downloads on all things brand, design and technology.
            </p>
          </div>

          {/* Right side - Email Form */}
          <div className="flex-shrink-0 flex flex-col justify-end">
            <div className="mt-[calc(2.25rem+0.75rem)]">
              <EmailForm
                className="w-auto [&_label]:!text-white [&_input]:!text-white [&_input]:!bg-transparent"
                variant="arrow"
                labelBgClassName="!bg-maticblack !text-white"
                buttonBgClassName="text-white bg-maticblack border border-white hover:bg-white hover:text-maticblack"
                webhookUrl={ZAPIER_WEBHOOK_URL}
                onSubmit={async (data) => {
                  console.log('Newsletter subscription:', data.email);
                  onSubmit();
                }}
                borderClassName="border-white/50 hover:border-white focus:border-white focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
