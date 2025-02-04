import { VideoSection as VideoSectionType } from '@/types';
import Image from 'next/image';

export function VideoSection({ video, backupImage }: VideoSectionType) {
  if (!video && !backupImage) return null;

  return (
    <div className="py-12">
      {video ? (
        <video
          src={video.url}
          controls
          className="w-full max-h-[600px] object-contain"
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
    </div>
  );
}
