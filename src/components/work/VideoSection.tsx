'use client';
import { Section } from '../global/matic-ds';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function VideoSection({
  video,
  backupImage
}: {
  video?: { url: string };
  backupImage?: { url: string };
}) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <Section className="py-0">
      {video ? (
        <div className="relative aspect-video w-full">
          <video
            src={video.url}
            muted
            autoPlay
            loop
            playsInline
            onLoadedData={() => setIsVideoLoading(false)}
            className="aspect-video w-full rounded-none border-none object-cover"
          />
          {isVideoLoading && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
        </div>
      ) : backupImage ? (
        <div className="relative h-[600px] w-full">
          <Image src={backupImage.url} alt="Video placeholder" fill className="object-cover" />
        </div>
      ) : null}
    </Section>
  );
}
