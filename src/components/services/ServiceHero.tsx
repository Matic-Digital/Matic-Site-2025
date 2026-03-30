'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ServiceHeroProps {
  overline: string;
  heading: string;
  description?: string;
  overlineColor?: string;
  imageSrc: string;
  imageAlt: string;
  icon?: {
    url: string;
    width?: number;
    height?: number;
  };
  buttonText?: string;
  buttonLink?: string;
  pastClients?: {
    url: string;
    title?: string;
    sys: {
      id: string;
    };
  }[];
  // Props for the rectangles (optional for backwards compatibility)
  firstBoxDescription?: string;
  secondBoxDescription?: string;
  secondBoxColor?: string;
}

export default function ServiceHero({
  overline,
  heading,
  description,
  overlineColor = 'text-orange',
  imageSrc,
  imageAlt,
  icon,
  buttonText,
  buttonLink,
  pastClients,
  firstBoxDescription,
  secondBoxDescription,
  secondBoxColor = 'bg-[#060EC2]'
}: ServiceHeroProps) {
  return (
    <section className="w-full bg-maticblack">
      {/* Hero Image */}
      <div className="relative -mt-24 min-h-[44.75rem] w-full overflow-hidden">
        <Image
          priority
          fetchPriority="high"
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="absolute left-0 top-0 right-0 h-[calc(100%-10rem)] rounded-none border-none object-cover opacity-15"
          sizes="100vw"
          quality={90}
        />
        <div className="items-top justify-left relative flex min-h-[44.75rem] flex-col gap-[1.56rem] pl-[1.5rem] pr-[1.5rem] pt-[12.03rem] md:pl-[5.38rem] md:pr-[5.38rem] md:pt-[13.5rem]">
          <p
            className={`${overlineColor} text-lg font-bold leading-relaxed md:text-xl md:font-normal`}
          >
            {overline}
          </p>
          <div className="flex items-start justify-between gap-4">
            <h1 className="flex-1 text-4xl/[120%] font-bold text-white md:max-w-[48.75rem] md:text-5xl md:font-normal">
              {heading}
            </h1>
            {icon && (
              <Image
                src={icon.url}
                alt=""
                width={icon.width || 240}
                height={icon.height || 240}
                className="-mt-[2.5rem] h-auto w-[180px] flex-shrink-0 rounded-none border-none pr-[5rem] md:w-[18rem]"
              />
            )}
          </div>
          {description && (
            <p className="text-lg leading-relaxed text-white md:max-w-[48.75rem] md:text-xl">
              {description}
            </p>
          )}
          <Link href={buttonLink || '/contact'}>
            <Button variant="inverted" className="bg-white text-maticblack hover:bg-white/90">
              {buttonText || 'Get Started'}
            </Button>
          </Link>
          {pastClients && pastClients.length > 0 && (
            <div className="mt-[10rem] flex flex-col items-center gap-[2rem] pb-[7.25rem]">
              <p className="text-center text-base text-white">
                Trusted by
              </p>
              <div className="flex items-center justify-center gap-[2rem] md:gap-[3rem]">
                {pastClients.map((client) => (
                  <div
                    key={client.sys.id}
                    className="relative h-[3rem] w-[6rem] md:h-[4rem] md:w-[8rem] opacity-60"
                  >
                    <Image
                      src={client.url}
                      alt={client.title || 'Client logo'}
                      fill
                      className="object-contain"
                      style={{ border: 'none', borderRadius: '0' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Rectangles Side by Side - Only render if firstBoxDescription is provided */}
      {firstBoxDescription && secondBoxDescription && (
        <div className="flex w-full flex-col md:flex-row">
        <div className="flex-1 bg-maticblack px-[1.5rem] py-[5rem] md:pb-[7.44rem] md:pl-[5.38rem] md:pr-[6.25rem] md:pt-[5.44rem]">
          <div className="flex flex-col gap-[3.62rem] overflow-hidden">
            <p className="text-3xl font-bold leading-relaxed text-white md:font-normal">
              {firstBoxDescription}
            </p>
            <Link href="/contact">
              <Button className="whitespace-nowrap text-maticblack">Work with us</Button>
            </Link>
          </div>
        </div>

        <div
          className={`flex-1 md:pb-[6.06rem] md:pl-[6.19rem] md:pr-[6.5rem] md:pt-[5.44rem] ${secondBoxColor} px-[1.5rem] py-[5rem]`}
        >
          <div className="overflow-hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
                  <p className="text-lg leading-relaxed text-white md:text-2xl" {...props} />
                ),
                a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                  <a className="text-white underline hover:text-orange" {...props} />
                ),
                ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
                  <ul
                    className="list-disc pl-6 text-lg leading-relaxed text-white md:text-2xl"
                    {...props}
                  />
                ),
                ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
                  <ol
                    className="list-decimal pl-6 text-lg leading-relaxed text-white md:text-2xl"
                    {...props}
                  />
                ),
                li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
                  <li className="mb-1" {...props} />
                ),
                strong: (props: React.HTMLAttributes<HTMLElement>) => (
                  <strong className="font-bold" {...props} />
                ),
                em: (props: React.HTMLAttributes<HTMLElement>) => (
                  <em className="italic" {...props} />
                ),
                h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                  <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl" {...props} />
                ),
                h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                  <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl" {...props} />
                ),
                h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                  <h3 className="mb-2 text-xl font-bold text-white md:text-2xl" {...props} />
                ),
                blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
                  <blockquote
                    className="border-l-4 border-white/40 pl-4 italic text-white/90"
                    {...props}
                  />
                )
              }}
            >
              {secondBoxDescription}
            </ReactMarkdown>
          </div>
        </div>
        </div>
      )}
    </section>
  );
}
