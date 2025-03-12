import Image from 'next/image';
import { type BannerImage as BannerImageType } from '@/types/contentful';

interface BannerImageProps {
  name: string;
  content: BannerImageType['content'];
  sectionColor?: string;
}

export function BannerImage({ name, content, sectionColor }: BannerImageProps) {
  // Check if the content is a video based on contentType or file extension
  const isVideo = content.contentType?.startsWith('video/') || 
                 content.url?.toLowerCase().endsWith('.mp4') ||
                 content.url?.toLowerCase().endsWith('.webm') ||
                 content.url?.toLowerCase().endsWith('.mov');

  return (
    <section
      style={{
        backgroundColor: sectionColor
      }}
      className="relative flex items-center justify-center"
    >
      <div className="relative aspect-video w-full">
        {isVideo ? (
          <video
            src={content.url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
            aria-label={content.description ?? name}
          />
        ) : (
          <Image
            src={content.url}
            alt={content.description ?? name}
            fill
            className="rounded-none border-none object-cover"
          />
        )}
      </div>
    </section>
  );
}
