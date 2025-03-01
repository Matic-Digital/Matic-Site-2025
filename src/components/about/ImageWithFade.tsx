'use client';

import Image from 'next/image';
import { type ImageProps } from 'next/image';

type ImageWithFadeProps = Omit<ImageProps, 'onLoadingComplete' | 'className'> & {
  className?: string;
};

export function ImageWithFade({ className = '', ...props }: ImageWithFadeProps) {
  return (
    <Image
      {...props}
      className={`opacity-0 transition-opacity duration-300 ${className}`}
      onLoadingComplete={(img) => {
        img.classList.remove('opacity-0');
      }}
    />
  );
}
