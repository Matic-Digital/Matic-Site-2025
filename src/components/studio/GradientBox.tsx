import { Box } from "@/components/global/matic-ds";
import Image from "next/image";

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
      className="relative [border-width:0.5px] border-[#CFDCFF]/10 rounded-lg [background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,rgba(152,174,230,0.30)_0%,rgba(214,226,255,0.03)_100%)] before:absolute before:inset-0 before:[border-width:0.5px] before:border-[#CFDCFF] before:rounded-lg before:[mask-image:linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_100%)] before:pointer-events-none" 
      direction="col"
    >
      <div className="relative px-[44px] py-[49px] space-y-[35px]">
        <div className="relative w-[40px] aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain border-none rounded-none w-[40px] aspect-square"
          />
        </div>
        <Box className="" direction="col">
          <h3 className="text-[1.875rem] font-chalet-newyork leading-normal">{header}</h3>
          <p className="leading-[140%] max-w-[452px]">{copy}</p>
        </Box>
      </div>
    </Box>
  );
}
