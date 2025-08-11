'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceHeroProps {
  overline: string;
  heading: string;
  overlineColor?: string;
  imageSrc: string;
  imageAlt: string;
  // Props for the rectangles
  firstBoxDescription: string;
  secondBoxDescription: string;
  secondBoxColor?: string;
}

export default function ServiceHero({
  overline,
  heading,
  overlineColor = 'text-orange',
  imageSrc,
  imageAlt,
  firstBoxDescription,
  secondBoxDescription,
  secondBoxColor = 'bg-[#060EC2]'
}: ServiceHeroProps) {
  return (
    <section className="w-full">
      {/* Hero Image */}
      <div className="relative -mt-24 h-[44.75rem] w-full overflow-hidden">
        <Image
          priority
          fetchPriority="high"
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="absolute left-0 top-0 h-full w-full rounded-none border-none object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="items-top justify-left absolute inset-0 flex flex-col bg-black bg-opacity-40 md:pl-[5.38rem] md:pt-[13.5rem]">
          <p className={`${overlineColor} text-xl leading-relaxed`}>{overline}</p>
          <h1 className="text-4xl text-white md:max-w-[48.75rem] md:text-5xl">{heading}</h1>
        </div>
      </div>

      {/* Two Rectangles Side by Side */}
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex-1 bg-maticblack px-4 py-4 pb-[7.44rem] pl-[5.38rem] pr-[6.25rem] pt-[5.44rem]">
          <div className="flex max-h-[24.25rem] flex-col gap-[3.62rem] overflow-hidden">
            <p className="text-3xl leading-relaxed text-white">{firstBoxDescription}</p>
            <Link href="/contact">
              <Button className="whitespace-nowrap bg-background text-maticblack">
                Work with us
              </Button>
            </Link>
          </div>
        </div>

        <div
          className={`flex-1 pb-[6.06rem] pl-[6.19rem] pr-[6.5rem] pt-[5.44rem] ${secondBoxColor} px-4 py-4`}
        >
          <div className="max-h-[24.25rem] overflow-hidden">
            <p className="leading-relaxed text-white md:text-2xl">{secondBoxDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
