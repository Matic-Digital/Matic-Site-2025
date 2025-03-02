'use client';

import Image from 'next/image';

export function BannerImage() {
  return (
    <Image
      priority
      fetchPriority="high"
      src={`/about/BannerImageAlt.png`}
      alt="insight"
      width={1920}
      height={1080}
      className="absolute inset-0 z-10 h-full w-full rounded-none border-none object-cover opacity-0 transition-opacity duration-300"
      onLoadingComplete={(img) => {
        img.classList.remove('opacity-0');
      }}
      sizes="100vw"
      quality={90}
    />
  );
}
