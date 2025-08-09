import Image from 'next/image';
import { Box } from '../global/matic-ds';

interface PartnerBoxProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  name: string;
}

const PartnerBox = ({ image, name }: PartnerBoxProps) => {
  return (
    <Box
      direction="col"
      gap={2}
      className="aspect-square w-[120px] items-center justify-center rounded-lg border border-[#001c80]/10 bg-[#f8f9fc] p-4"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="aspect-square h-[58px] w-[58px] rounded-none border-none object-contain"
      />
      <p className="text-center text-sm">{name}</p>
    </Box>
  );
};

export default PartnerBox;
