'use client';

import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

interface Client {
  sys: {
    id: string;
  };
  name: string;
  clientLogo?: {
    url: string;
  };
}

interface InfiniteLogoCarouselProps {
  clients: Client[];
}

export function InfiniteLogoCarousel({ clients }: InfiniteLogoCarouselProps) {
  const renderLogo = (client: Client, key: string) => {
    if (!client.clientLogo?.url) return null;
    
    return (
      <div key={key} className="flex w-32 shrink-0 items-center justify-center px-4">
        <Image
          src={client.clientLogo.url}
          alt={client.name}
          width={300}
          height={300}
          className="h-12 w-auto rounded-none border-none object-contain brightness-0 invert"
        />
      </div>
    );
  };

  const logoTrack = (
    <div className="flex">
      {clients.map((client) => renderLogo(client, client.sys.id))}
    </div>
  );

  return (
    <div className="relative flex h-24 w-full items-center overflow-hidden">
      <div className="flex animate-slide">
        {logoTrack}
        {logoTrack}
        {logoTrack}
        {logoTrack}
      </div>
    </div>
  );
}
