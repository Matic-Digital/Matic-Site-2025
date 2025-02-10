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
      <div className="relative p-6 space-y-4">
        <div className="relative w-[48px] aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain border-none rounded-none w-[48px] aspect-square"
          />
        </div>
        <h3 className="">{header}</h3>
        <p className="">{copy}</p>
      </div>
    </Box>
  );
}
