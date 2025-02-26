import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

interface TestimonialBoxProps {
  quote: string;
  name: string;
  position: string;
}

export function TestimonialBox({ quote, name, position }: TestimonialBoxProps) {
  return (
    <Box className="relative [border-width:0.5px] border-[#CFDCFF]/10 w-[375px] rounded-lg [background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,rgba(152,174,230,0.30)_0%,rgba(214,226,255,0.03)_100%)] before:absolute before:inset-0 before:[border-width:0.5px] before:border-[#CFDCFF] before:rounded-lg before:[mask-image:linear-gradient(to_bottom_right,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0)_100%)] before:pointer-events-none">
      <div className="relative z-10 w-full m-[40px] flex flex-col gap-6">
        <Image
          src="/quote.svg"
          alt="Quote"
          width={60}
          height={60}
          className="border-none rounded-none aspect-square"
        />
        <blockquote className="border-none p-0 not-italic text-[1.3rem]">{quote}</blockquote>
        <Box className="" direction="col" gap={3}>
          <Image
            src="/ratings.svg"
            alt="ratings"
            width={107}
            height={18}
            className="border-none rounded-none"
          />
          <Box className="" direction="col" gap={1}>
            <p className="font-semibold text-[0.875rem]">{name}</p>
            <p className="opacity-50 text-[0.875rem]">{position}</p>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
