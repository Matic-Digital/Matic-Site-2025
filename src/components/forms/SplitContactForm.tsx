'use client';
import Image from 'next/image';
import { Box } from '../global/matic-ds';
import { PLACEHOLDER_IMAGE } from '@/constants/images';
import Link from 'next/link';
import { FloatingLabelInput, FloatingLabelTextarea } from '../ui/floating-label';
import { useState } from 'react';
import { Button } from '../ui/button';

export function SplitContactForm() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <>
      <Box className="justify-center gap-[6.06rem]" direction={{ base: 'col', md: 'row' }}>
        <Image
          src={PLACEHOLDER_IMAGE}
          alt="name"
          width={524}
          height={642}
          className="aspect-[262/321] h-[40.125rem] rounded-none border-none object-cover md:sticky md:top-[12rem]"
        />
        <form className="md:w-[33.375rem] flex flex-col gap-[2.06rem]">
          <Box className="items-end justify-between">
            <h2 className="">Let&apos;s talk</h2>
            <Link
              href="/contact"
              className="text-base leading-[140%] no-underline transition-all hover:text-text hover:underline"
            >
              Explore careers
            </Link>
          </Box>
          <Box className="gap-[1.44rem]" direction="col">
            <label className="flex items-center gap-[0.69rem]">
              <div className={`relative h-4 w-4 rounded-full border ${selectedOption === 'New project' ? 'bg-[#000227] border-[#000227]' : 'bg-transparent border-[#000227]'} flex items-center justify-center`}> 
                {selectedOption === 'New project' && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedOption === 'New project'}
                onChange={() => setSelectedOption('New project')}
                className="hidden"
              />
              New project
            </label>
            <label className="flex items-center gap-[0.69rem]">
              <div className={`relative h-4 w-4 rounded-full border ${selectedOption === 'Something else' ? 'bg-[#000227] border-[#000227]' : 'bg-transparent border-[#000227]'} flex items-center justify-center`}> 
                {selectedOption === 'Something else' && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedOption === 'Something else'}
                onChange={() => setSelectedOption('Something else')}
                className="hidden"
              />
              Something else
            </label>
          </Box>
          <Box className="flex flex-col gap-[1rem]">
            <FloatingLabelInput
              id="name"
              label="Name"
              className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
              labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
              borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
            />
            <FloatingLabelInput
              id="company"
              label="Company"
              className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
              labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
              borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
            />
            <FloatingLabelInput
              id="workEmail"
              label="Work email"
              className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
              labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
              borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
            />
            <FloatingLabelInput
              id="phone"
              label="Phone"
              className="w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
              labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
              borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
            />
            <FloatingLabelTextarea
              id="goals"
              label="Describe goals"
              className="min-h-[100px] w-full text-text placeholder:text-transparent blue:text-maticblack md:text-text md:blue:text-text"
              labelClassName="dark:bg-background bg-background blue:bg-white md:blue:bg-background text-text blue:text-maticblack md:blue:text-text"
              borderClassName="border focus:border-text blue:border-maticblack/50 md:blue:border-text/50 md:border-text/50 hover:border-text/80"
            />
          </Box>
          <Box className="justify-between">
            <p className="leading-[120%] tracking-[-0.0225rem] text-[0.75rem] w-[11.4375rem]">
                We&apos;ll never sell or abuse your email. By submitting this form you accept our Terms.
            </p>
            <Button type="submit" className="">Send message</Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
