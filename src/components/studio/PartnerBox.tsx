import Image from "next/image";
import { Box } from "../global/matic-ds";

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
        <Box direction="col" gap={2} className="bg-[#f8f9fc] border border-[#001c80]/10 aspect-square w-[120px] rounded-lg items-center justify-center p-4">
            <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="border-none rounded-none aspect-square w-[58px] h-[58px] object-contain"
            />
            <p className="text-center text-sm">{name}</p>
        </Box>
    );
};

export default PartnerBox;