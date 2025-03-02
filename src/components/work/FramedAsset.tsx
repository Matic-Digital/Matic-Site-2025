import Image from 'next/image';
import { type FramedAsset as FramedAssetType } from '@/types/contentful';
import { Container } from '../global/matic-ds';

interface FramedAssetProps {
  name: string;
  asset: FramedAssetType['asset'];
  sectionColor?: string;
}

export function FramedAsset({ name, asset, sectionColor }: FramedAssetProps) {
  return (
    <section
      style={{
        backgroundColor: sectionColor
      }}
      className="relative flex items-center justify-center py-[10rem]"
    >
      <Container>
        <div className="relative aspect-video w-full max-w-5xl mx-auto">
          <Image
            src={asset.url}
            alt={asset.description ?? name}
            fill
            className="rounded-none border-none object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
