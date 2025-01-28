'use client';

import { Container } from '@/components/global/matic-ds';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type NumberWord =
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN'
  | 'EIGHT'
  | 'NINE'
  | 'TEN';

const gradientMap: Record<NumberWord, string> = {
  ONE: 'from-purple-600 via-pink-600 to-blue-600',
  TWO: 'from-cyan-400 via-blue-500 to-purple-600',
  THREE: 'from-pink-500 via-red-500 to-yellow-500',
  FOUR: 'from-green-400 via-cyan-500 to-blue-600',
  FIVE: 'from-purple-500 via-pink-500 to-red-500',
  SIX: 'from-yellow-400 via-orange-500 to-pink-500',
  SEVEN: 'from-blue-500 via-purple-500 to-pink-500',
  EIGHT: 'from-indigo-500 via-purple-500 to-pink-500',
  NINE: 'from-green-500 via-emerald-500 to-teal-500',
  TEN: 'from-blue-600 via-indigo-500 to-purple-500'
};

interface WhatWeDoItemProps {
  number: NumberWord;
  title: string;
  description: string;
  iconUrl?: string | null;
  isActive?: boolean;
  onHover?: (number: NumberWord | '') => void;
  isLast?: boolean;
}

export function WhatWeDoItem({
  number,
  title,
  description,
  iconUrl,
  isActive = false,
  onHover,
  isLast = false
}: WhatWeDoItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemRef.current) return;

      const rect = itemRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Get the element's center point
      const elementCenter = rect.top + rect.height / 2;
      
      // Define the active zone (middle third of the screen)
      const activeZoneStart = windowHeight * 0.33;
      const activeZoneEnd = windowHeight * 0.66;
      
      // Activate when element's center is in the middle third of the screen
      if (elementCenter > activeZoneStart && elementCenter < activeZoneEnd) {
        onHover?.(number);
      } else if (isActive) {
        onHover?.('');
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [number, onHover, isActive]);

  return (
    <div
      ref={itemRef}
      className={`group relative flex w-full items-center justify-center overflow-hidden transition-all duration-700 ${isActive ? 'is-active -translate-y-2' : 'translate-y-0'} ${isLast ? 'pb-0' : ''}`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientMap[number]} animate-gradient-x`} />
      </div>
      <Container>
        <div className="relative z-10 flex items-center py-16">
          {iconUrl && (
            <div className="relative aspect-square w-14 mr-8">
              <Image
                src={iconUrl}
                alt={title}
                fill
                className={`rounded-none border-none object-contain transition-all duration-700 ${isActive ? 'brightness-0 invert scale-110' : ''} `}
              />
            </div>
          )}
          <div className="flex justify-between items-start gap-24 flex-grow">
            <div className="flex flex-col items-start">
              <p className={`text-sm transition-all duration-700 ${isActive ? 'text-white translate-x-2' : 'text-[#6A81B4] translate-x-0'} mb-2`}>
                {number}
              </p>
              <h3 className={`transition-all duration-700 ${isActive ? 'text-white translate-x-2' : 'text-black translate-x-0'} text-2xl`}>
                {title}
              </h3>
            </div>
            <p className={`transition-all duration-700 ${isActive ? 'text-white translate-x-2' : 'text-black translate-x-0'} text-left max-w-xl text-lg leading-relaxed`}>
              {description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
