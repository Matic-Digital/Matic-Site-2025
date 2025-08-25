'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type FadingImageProps = {
  images: string[];
  alt?: string;
  /** Milliseconds between slides */
  intervalMs?: number;
  /** Transition duration in ms (matches tailwind duration if using utility classes) */
  transitionMs?: number;
  /** Additional classes for the wrapper */
  className?: string;
  /** Aspect ratio as width/height numbers used to set a stable box via aspect-[w/h] */
  aspect?: { w: number; h: number };
};

/**
 * Crossfading image rotator. Stacks images and fades opacity between them.
 * Uses fill layout for responsive behavior; wrapper defines aspect ratio.
 */
export default function FadingImage({
  images,
  alt = '',
  intervalMs = 3000,
  transitionMs = 1000,
  className,
  aspect = { w: 1024, h: 683 }
}: FadingImageProps) {
  const [index, setIndex] = useState(0);

  const safeImages = useMemo(() => (images && images.length > 0 ? images : ['']), [images]);

  useEffect(() => {
    if (safeImages.length <= 1) return; // nothing to rotate
    const id = setInterval(
      () => {
        setIndex((i) => (i + 1) % safeImages.length);
      },
      Math.max(1000, intervalMs)
    );
    return () => clearInterval(id);
  }, [safeImages.length, intervalMs]);

  const aspectPadding = `${(aspect.h / aspect.w) * 100}%`;

  return (
    <div
      className={['relative w-full overflow-hidden', className].filter(Boolean).join(' ')}
      style={{ paddingTop: aspectPadding }}
    >
      {safeImages.map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className={[
            'absolute inset-0 h-full w-full object-cover',
            'transition-opacity ease-in-out',
            i === index ? 'opacity-100' : 'opacity-0'
          ].join(' ')}
          style={{ transitionDuration: `${transitionMs}ms` }}
        />
      ))}
    </div>
  );
}
