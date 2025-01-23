'use client';

import { Container } from '@/components/global/matic-ds';
import Image from 'next/image';

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

interface WhatWeDoItemProps {
  number: NumberWord;
  title: string;
  description: string;
  iconUrl?: string | null;
  isActive?: boolean;
  onHover?: (number: NumberWord | '') => void;
}

export function WhatWeDoItem({
  number,
  title,
  description,
  iconUrl,
  isActive = false,
  onHover
}: WhatWeDoItemProps) {
  return (
    <div
      className={`group relative flex w-full items-center justify-center ${isActive ? 'is-active' : ''}`}
      onMouseEnter={() => onHover?.(number)}
      onMouseLeave={() => onHover?.('')}
    >
      <Container>
        <div className="relative z-10 flex flex-col items-center gap-8 py-12 md:flex-row">
          <div className="flex gap-4 flex-grow">
            {iconUrl && (
              <div className="relative aspect-square w-14">
                <Image
                  src={iconUrl}
                  alt={title}
                  fill
                  className={`rounded-none border-none object-contain transition-[filter] duration-150 ${isActive ? 'brightness-0 invert' : ''} `}
                />
              </div>
            )}
            <div className="flex-grow">
              <div className="flex items-center gap-4">
                <p
                  className={`uppercase transition-colors duration-150 ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {number}
                </p>
              </div>
              <h3 className={`transition-colors duration-150 ${isActive ? 'text-white' : ''}`}>
                {title}
              </h3>
            </div>
          </div>
          <div className="md:w-1/3 ">
            <p className={`transition-colors duration-150 ${isActive ? 'text-white' : ''}`}>
              {description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
