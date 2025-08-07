'use client';

import React from 'react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const plans = [
  {
    name: 'Lorem Ipsum',
    price: '$4,997',
    index: 0
  },
  {
    name: 'Lorem Ipsum',
    price: '$9,997',
    index: 1
  },
  {
    name: 'Lorem Ipsum',
    price: '$14,997',
    index: 2
  }
];

type MobilePricingDropdownProps = {
  sections: {
    title: string;
    items: {
      name: string;
      values: (boolean | number)[];
    }[];
  }[];
};

export function MobilePricingDropdown({ sections }: MobilePricingDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState<string>('0');

  const handlePlanChange = (value: string) => {
    setSelectedIndex(value);
  };

  return (
    <div className="flex flex-col">
      {/* Plan Selection */}
      <div className="mb-6 px-1 pt-2">
        <Select value={selectedIndex} onValueChange={handlePlanChange}>
          <SelectTrigger>
            <SelectValue>
              <div className="flex w-full items-center justify-between">
                <span>{plans[parseInt(selectedIndex)]?.name}</span>
                <span>{plans[parseInt(selectedIndex)]?.price}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {plans.map((plan) => (
              <SelectItem key={plan.index} value={plan.index.toString()} className="cursor-pointer">
                <div className="flex w-full items-center justify-between">
                  <span>{plan.name}</span>
                  <span>{plan.price}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pricing Table Box */}
      <div className="rounded-lg border border-[#DFE0E9] bg-white">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 border-b border-[#DFE0E9] px-6 py-8">
          <h4 className="text-center font-chalet-newyork text-[1.2rem] font-medium leading-[19px] text-[#6d32ed]">
            {plans[parseInt(selectedIndex)]?.name}
          </h4>
          <div className="flex flex-col items-center">
            <h1 className="font-chalet-newyork text-[3rem] font-medium text-maticblack">
              {plans[parseInt(selectedIndex)]?.price}
            </h1>
            <p className="-mt-2 opacity-50">per month</p>
          </div>
          <Link href="/" className="w-full">
            <Button className="w-full bg-maticblack text-white">Get Started</Button>
          </Link>
        </div>

        {/* Table Sections */}
        <div>
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className="grid grid-cols-[50%,50%]">
              {/* Section Header */}
              <div
                className={`col-span-2 border-t border-[#DFE0E9] bg-[#F8F9FC] ${
                  sectionIndex === 0 ? 'border-t-0' : ''
                }`}
              >
                <div className="px-6 py-4">
                  <h4 className="text-xs font-medium uppercase tracking-[0.16em] text-[#6D32ED]">
                    {section.title}
                  </h4>
                </div>
              </div>

              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.name}>
                  {/* Name Cell */}
                  <div
                    className={`flex min-h-[64px] items-center border-r border-[#DFE0E9] px-6 ${
                      itemIndex === 0 ? '' : 'border-t border-[#DFE0E9]'
                    }`}
                  >
                    <span className="text-[14px] font-medium leading-[20px]">{item.name}</span>
                  </div>
                  {/* Value Cell */}
                  <div
                    className={`flex items-center justify-center px-4 ${
                      itemIndex === 0 ? '' : 'border-t border-[#DFE0E9]'
                    }`}
                  >
                    {typeof item.values[parseInt(selectedIndex)] === 'boolean' ? (
                      item.values[parseInt(selectedIndex)] ? (
                        <Image
                          src="/check.svg"
                          alt="Included"
                          width={24}
                          height={24}
                          className="rounded-[14px] border-none"
                        />
                      ) : null
                    ) : (
                      <span className="text-[16px] font-normal leading-[20px]">
                        {Number(item.values[parseInt(selectedIndex)]).toLocaleString()}
                      </span>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
