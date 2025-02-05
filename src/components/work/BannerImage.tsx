import Image from 'next/image';
import { BannerImage as BannerImageType } from '@/types/contentful';
import { Container } from '../global/matic-ds';

interface BannerImageProps {
  name: string;
  content: BannerImageType['content'];
  sectionColor?: string;
}

export function BannerImage({ name, content, sectionColor }: BannerImageProps) {
  return (
    <section
      style={{
        backgroundColor: sectionColor
      }}
      className="relative flex items-center justify-center"
    >
        <div className="relative aspect-square w-full">
          <Image
            src={content.url}
            alt={content.description ?? name}
            fill
            className="rounded-none border-none object-cover"
          />
        </div>
    </section>
  );
}
