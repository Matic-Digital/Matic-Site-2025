'use client';

import Image from 'next/image';
import type { Client } from '@/types/contentful';

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

  return (
    <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_82%,transparent)]">
      <div className="animate-infinite-scroll flex min-w-full shrink-0 items-center justify-around gap-4">
        {clients.map((client, index) => renderLogo(client, `${client.sys.id}-${index}`))}
      </div>
      <div className="animate-infinite-scroll flex min-w-full shrink-0 items-center justify-around gap-4">
        {clients.map((client, index) => renderLogo(client, `${client.sys.id}-${index}-duplicate`))}
      </div>
    </div>
  );
}
