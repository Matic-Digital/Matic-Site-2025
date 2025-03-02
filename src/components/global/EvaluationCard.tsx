import React from 'react';
import { Box } from '@/components/global/matic-ds';
import { TextEffect } from '@/components/ui/text-effect';
import Image from 'next/image';
import SpotlightBorder from '@/components/global/SpotlightBorder';

interface EvaluationCardProps {
    imageSrc: string;
    heading: string;
    copy: string;
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ imageSrc, heading, copy }) => {
    return (
        <SpotlightBorder>
            <Box className="h-full justify-center space-y-4" direction="col">
                <Image
                    src={imageSrc}
                    alt={heading}
                    width={36}
                    height={36}
                    className="rounded-none border-none"
                />
                <Box className="space-y-1" direction="col">
                    <TextEffect per="char" as="h2" className="text-text dark:text-maticblack font-chalet-newyork text-[1.25rem] leading-[130%] tracking-[-0.4px]">
                        {heading}
                    </TextEffect>
                    <TextEffect per="word" speedReveal={3} as="p" className="max-w-xl text-text/80 dark:text-maticblack text-[0.875rem] leading-[160%] tracking-[-0.14px]">
                        {copy}
                    </TextEffect>
                </Box>
            </Box>
        </SpotlightBorder>
    );
};

export default EvaluationCard;
