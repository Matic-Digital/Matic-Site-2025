import Image from 'next/image';
import { type FramedAsset as FramedAssetType } from '@/types/contentful';
import { Container } from '../global/matic-ds';

interface FramedAssetProps {
  name: string;
  asset: FramedAssetType['asset'];
  variant?: FramedAssetType['variant'];
  sectionColor?: string;
}

export function FramedAsset({ name, asset, variant = 'Small', sectionColor }: FramedAssetProps) {
  // Always use Small variant to prevent background color issues
  const isSmallVariant = true;
  
  return (
    <section
      style={{
        backgroundColor: isSmallVariant ? undefined : sectionColor
      }}
      className="relative flex items-center justify-center py-[10rem]"
    >
      <Container>
        <div className="relative mx-auto w-full">
          <Image
            src={asset.url}
            alt={asset.description ?? name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full rounded-none border-none"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </Container>
    </section>
  );
}
