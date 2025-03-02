'use client';
import { Section } from '../global/matic-ds';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function VideoSection({ video, backupImage }: { video?: { url: string }; backupImage?: { url: string } }) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <Section className="py-0">
      {video ? (
        <div className="relative w-full aspect-video">
          <video
            src={video.url}
            muted
            autoPlay
            loop
            playsInline
            onLoadedData={() => setIsVideoLoading(false)}
            className="w-full aspect-video rounded-none border-none object-cover"
          />
          {isVideoLoading && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
          )}
        </div>
      ) : backupImage ? (
        <div className="relative w-full h-[600px]">
          <Image
            src={backupImage.url}
            alt="Video placeholder"
            fill
            className="object-cover"
          />
        </div>
      ) : null}
    </Section>
  );
}
