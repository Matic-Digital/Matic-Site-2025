import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

interface GradientBoxProps {
  image: {
    src: string;
    alt: string;
  };
  header: string;
  copy: string;
}

export function GradientBox({ image, header, copy }: GradientBoxProps) {
  return (
    <Box
      className="relative flex h-full rounded-lg border-blue/10 [background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,hsla(var(--base-hsl))_0%,hsla(var(--mantle-hsl))_100%)] [border-width:0.5px] before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:border-[#CFDCFF] before:[border-width:0.5px] before:[mask-image:linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_100%)] dark:[background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,rgba(152,174,230,0.30)_0%,rgba(214,226,255,0.03)_100%)]"
      direction="col"
    >
      <div className="relative flex aspect-square h-full max-w-[245px] flex-col justify-between p-6 md:aspect-auto md:max-w-none md:p-[44px]">
        <div className="relative aspect-square w-[32px] shrink-0 md:w-[40px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="aspect-square w-full rounded-none border-none object-contain"
          />
        </div>
        <Box className="mt-6 md:mt-8" direction="col">
          <h3 className="whitespace-nowrap font-chalet-newyork text-[1.675rem] leading-normal text-text md:text-[1.875rem]">
            {header}
          </h3>
          <p className="z-10 max-w-[452px] text-sm leading-[140%] text-text md:text-[1rem]">
            {copy}
          </p>
        </Box>
      </div>
    </Box>
  );
}
