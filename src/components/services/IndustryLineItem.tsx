'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Industry } from '@/types/contentful';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { MARKS, INLINES } from '@contentful/rich-text-types';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type LottieAnimationData = Record<string, unknown>;

interface IndustryLineItemProps {
  industry: Industry;
  isLast: boolean;
}

export function IndustryLineItem({ industry, isLast }: IndustryLineItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !industry.lottieIcon) return;

    setIsLoadingLottie(true);

    fetch(industry.lottieIcon)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return response.json();
      })
      .then((data: LottieAnimationData) => {
        setLottieData(data);
        setIsLoadingLottie(false);
      })
      .catch(() => {
        setIsLoadingLottie(false);
      });
  }, [isMounted, industry.lottieIcon]);

  // Control animation direction based on hover
  useEffect(() => {
    if (!lottieRef.current) return;

    if (isHovered) {
      // Play forward
      lottieRef.current.setDirection(1);
      lottieRef.current.play();
    } else {
      // Play in reverse from current position
      lottieRef.current.setDirection(-1);
      lottieRef.current.play();
    }
  }, [isHovered]);

  const handleClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the container, not on a link
    if (industry.pageVariant === 'Default' && !(e.target as HTMLElement).closest('a')) {
      router.push(`/services/${industry.slug}`);
    }
  };

  const renderOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-bold text-white">{text}</strong>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const href = node.data.uri;
        return (
          <a
            href={href}
            className="text-white/70 underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div
      key={industry.sys.id}
      className={`flex flex-col gap-4 py-[1.62rem] md:flex-row md:items-center md:justify-between ${!isLast ? 'border-b border-white/20' : ''} ${industry.pageVariant === 'Default' ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex w-full items-center gap-[1.7rem] md:w-1/2">
        {industry.lottieIcon && isMounted && lottieData ? (
          <div className="relative flex h-[5.4375rem] w-[5.4375rem] shrink-0 items-center justify-center overflow-hidden opacity-100">
            <Lottie
              lottieRef={lottieRef}
              animationData={lottieData}
              loop={false}
              autoplay={false}
              initialSegment={[0, 15]}
              style={{
                width: '87px',
                height: '87px'
              }}
            />
          </div>
        ) : industry.lottieIcon && isLoadingLottie ? (
          <div className="relative flex h-[5.4375rem] w-[5.4375rem] shrink-0 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white/30"></div>
          </div>
        ) : industry.bannerIcon?.url ? (
          <div className="relative flex h-[5.4375rem] w-[5.4375rem] shrink-0 items-center justify-center">
            <Image
              src={industry.bannerIcon.url}
              alt={industry.name}
              width={87}
              height={87}
              className={`h-[5.4375rem] w-[5.4375rem] rounded-none border-none object-contain transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
            {industry.hoverIcon?.url && (
              <Image
                src={industry.hoverIcon.url}
                alt={`${industry.name} hover`}
                width={87}
                height={87}
                className={`absolute inset-0 h-[5.4375rem] w-[5.4375rem] rounded-none border-none object-contain transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>
        ) : null}
        <h3 className="text-xl font-medium text-white md:text-2xl">
          {industry.name}
        </h3>
      </div>
      <div className="w-full md:w-1/2">
        {industry.clientList?.json ? (
          <div className="text-base leading-relaxed text-white/70 md:text-lg">
            {documentToReactComponents(industry.clientList.json, renderOptions)}
          </div>
        ) : (
          <p className="text-base text-white/70 md:text-lg">
            {industry.workSamplesCollection?.items
              .map((work) => work.clientName)
              .join(', ') || ''}
          </p>
        )}
      </div>
    </div>
  );
}
