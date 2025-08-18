'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type TickerItem = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  newTab?: boolean;
};

interface RecognitionTickerProps {
  items: TickerItem[];
  gap?: string; // tailwind-like spacing value in rem (e.g., '2.5rem')
  durationSec?: number; // animation duration
}

export function RecognitionTicker({
  items,
  gap = '2.5rem',
  durationSec = 15
}: RecognitionTickerProps) {
  const animatedRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const renderItem = (item: TickerItem, key: string, isDuplicate = false) => {
    const img = (
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width ?? 124}
        height={item.height ?? 124}
        className={item.className}
      />
    );

    if (!item.href) {
      // When no link, the image itself carries the key
      return React.cloneElement(img, { key });
    }

    const target = item.newTab ? '_blank' : undefined;
    // Always include security + SEO attributes on these links
    const rel = 'noopener noreferrer nofollow';

    // Prevent keyboard focus on duplicate tracks
    const tabIndex = isDuplicate ? -1 : undefined;

    return (
      <Link
        key={key}
        href={item.href}
        target={target}
        rel={rel}
        className="inline-block"
        tabIndex={tabIndex}
      >
        {img}
      </Link>
    );
  };

  useLayoutEffect(() => {
    // Measure once after mount to avoid mid-animation snapping
    const measureOnce = () => {
      const total = animatedRef.current?.scrollWidth ?? 0;
      // We rendered 3 duplicate tracks; use fractional precision to avoid overshoot
      const oneTrack = total > 0 ? total / 3 : 0;
      setTrackWidth(oneTrack);
    };
    // Next frame to ensure layout is settled
    const raf = requestAnimationFrame(measureOnce);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (animatedRef.current) {
      // Preserve fractional precision to avoid drift
      animatedRef.current.style.setProperty('--track-w', `${trackWidth}px`);
    }
  }, [trackWidth]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={animatedRef}
        className="flex w-max items-center will-change-transform"
        style={{
          columnGap: 0,
          animation: `ticker-move ${durationSec}s linear infinite`,
          animationDirection: 'reverse'
        }}
      >
        {/* Track A */}
        <div className="flex shrink-0 items-center" style={{ columnGap: gap, paddingRight: gap }}>
          {items.map((item, idx) => renderItem(item, `a-${idx}-${item.src}`))}
        </div>
        {/* Track B (duplicate) */}
        <div
          className="flex shrink-0 items-center"
          aria-hidden
          style={{ columnGap: gap, paddingRight: gap }}
        >
          {items.map((item, idx) => renderItem(item, `b-${idx}-${item.src}`, true))}
        </div>
        {/* Track C (duplicate) */}
        <div
          className="flex shrink-0 items-center"
          aria-hidden
          style={{ columnGap: gap, paddingRight: gap }}
        >
          {items.map((item, idx) => renderItem(item, `c-${idx}-${item.src}`, true))}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker-move {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(calc(-1 * var(--track-w, 0px)), 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default RecognitionTicker;
