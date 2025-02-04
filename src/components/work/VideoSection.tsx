import { VideoSection as VideoSectionType } from '@/types';
import Image from 'next/image';
import { Section } from '../global/matic-ds';

export function VideoSection({ video, backupImage }: VideoSectionType) {
  if (!video && !backupImage) return null;

  return (
    <Section className="py-0">
      {video ? (
        <video
          src={video.url}
          muted
          autoPlay
          loop
          className="w-full aspect-video rounded-none border-none object-cover"
        />
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
