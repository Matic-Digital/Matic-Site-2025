'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Industry } from '@/types/contentful';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { MARKS } from '@contentful/rich-text-types';

interface IndustryLineItemProps {
  industry: Industry;
  isLast: boolean;
}

export function IndustryLineItem({ industry, isLast }: IndustryLineItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-bold text-white">{text}</strong>,
    },
  };

  return (
    <div
      key={industry.sys.id}
      className={`flex flex-col gap-4 py-[1.62rem] md:flex-row md:items-center md:justify-between ${!isLast ? 'border-b border-white/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full items-center gap-[1.7rem] md:w-1/2">
        {industry.bannerIcon?.url && (
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
        )}
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
