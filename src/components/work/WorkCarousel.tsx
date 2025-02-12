'use client';

import { type WorkCarousel } from '@/types/contentful';
import { Box, Container } from '@/components/global/matic-ds';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WorkCarouselProps extends WorkCarousel {
  sectionColor: string;
}

export function WorkCarousel({ contentCollection, sectionColor }: WorkCarouselProps) {
  const items = contentCollection.items;

  return (
    <div 
      className="w-full overflow-hidden py-4"
      style={{ backgroundColor: sectionColor }}
    >
      <div className="relative w-full">
        <div 
          className="flex animate-scroll"
          style={{
            animationDuration: '30s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          {/* Original items */}
          {items.map((asset, index) => (
            <div 
              key={`${asset.url}-${index}`}
              className="h-[300px] flex-none flex items-center justify-center px-2"
            >
              {asset.contentType.startsWith('video/') ? (
                <video autoPlay muted loop playsInline className="h-full w-auto object-contain">
                  <source src={asset.url} type={asset.contentType} />
                </video>
              ) : (
                <Image
                  src={asset.url}
                  alt={index.toString()}
                  width={533}
                  height={300}
                  className="h-full w-auto object-contain border-none rounded-none"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
          {/* Duplicate items for seamless loop */}
          {items.map((asset, index) => (
            <div 
              key={`${asset.url}-${index}-dup`}
              className="h-[300px] flex-none flex items-center justify-center px-2"
            >
              {asset.contentType.startsWith('video/') ? (
                <video autoPlay muted loop playsInline className="h-full w-auto object-contain">
                  <source src={asset.url} type={asset.contentType} />
                </video>
              ) : (
                <Image
                  src={asset.url}
                  alt={index.toString()}
                  width={533}
                  height={300}
                  className="h-full w-auto object-contain border-none rounded-none"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
