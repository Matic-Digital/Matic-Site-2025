import { Box } from '@/components/global/matic-ds';
import Image from 'next/image';

interface TestimonialBoxProps {
  quote: string;
  name: string;
  position: string;
}

export function TestimonialBox({ quote, name, position }: TestimonialBoxProps) {
  return (
    <Box className="relative h-full w-[280px] rounded-lg border-text/10 [background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,hsla(var(--base-hsl))_0%,hsla(var(--mantle-hsl))_100%)] [border-width:0.5px] before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:border-[#CFDCFF] before:[border-width:0.5px] before:[mask-image:linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_100%)] dark:[background:radial-gradient(114.58%_160.08%_at_50.49%_-50.4%,rgba(152,174,230,0.30)_0%,rgba(214,226,255,0.03)_100%)] md:h-[420px] md:w-[375px]">
      <div className="relative z-10 m-[40px] flex w-full flex-col gap-6">
        <Image
          src="/quote.svg"
          alt="Quote"
          width={60}
          height={60}
          className="aspect-square shrink-0 rounded-none border-none"
        />
        <blockquote className="line-clamp-6 overflow-hidden border-none p-0 text-[1.3rem] not-italic text-text md:h-[200px]">
          {quote}&quot;
        </blockquote>
        <Box className="mt-auto" direction="col" gap={3}>
          <Image
            src="/ratings.svg"
            alt="ratings"
            width={107}
            height={18}
            className="rounded-none border-none"
          />
          <Box className="" direction="col" gap={1}>
            <p className="text-[0.875rem] font-semibold text-text">{name}</p>
            <p className="text-[0.875rem] text-text opacity-50">{position}</p>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
