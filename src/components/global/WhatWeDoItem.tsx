'use client';

import { Container } from '@/components/global/matic-ds';

interface WhatWeDoItemProps {
  number: string;
  title: string;
  description: string;
  gradient: Record<string, string>;
  isActive?: boolean;
  onHover?: (number: string) => void;
}

export function WhatWeDoItem({ 
  number,
  title,
  description,
  gradient,
  isActive = false,
  onHover,
}: WhatWeDoItemProps) {
  const gradientString = `linear-gradient(to bottom right, ${
    Object.entries(gradient)
      .map(([offset, color]) => `${color} ${offset}`)
      .join(', ')
  })`;

  return (
    <div 
      className={`group relative w-full flex items-center justify-center ${isActive ? 'is-active' : ''}`}
      onMouseEnter={() => onHover?.(number)}
      onMouseLeave={() => onHover?.('')}
    >
      <style jsx>{`
        .group::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: ${gradientString};
          transition: opacity 0.15s ease-in-out;
        }
        .group.is-active::before {
          opacity: 1;
        }
      `}</style>

      <Container>
        <div className="relative z-10 flex items-start gap-8 py-12">
          <div className="flex-grow">
            <p className={`uppercase transition-colors duration-150 ${
              isActive ? 'text-white' : ''
            }`}>{number}</p>
            <h3 className={`transition-colors duration-150 ${
              isActive ? 'text-white' : ''
            }`}>{title}</h3>
          </div>
          <div className="w-1/3">
            <p className={`transition-colors duration-150 ${
              isActive ? 'text-white' : ''
            }`}>{description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
