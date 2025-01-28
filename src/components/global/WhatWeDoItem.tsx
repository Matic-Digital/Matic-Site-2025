'use client';

import { Container } from '@/components/global/matic-ds';
import { motion } from 'framer-motion';
import Image from 'next/image';

type NumberWord =
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN'
  | 'EIGHT'
  | 'NINE'
  | 'TEN';

const gradientMap: Record<NumberWord, string> = {
  ONE: 'from-purple-600 via-pink-600 to-blue-600',
  TWO: 'from-cyan-400 via-blue-500 to-purple-600',
  THREE: 'from-pink-500 via-red-500 to-yellow-500',
  FOUR: 'from-green-400 via-cyan-500 to-blue-600',
  FIVE: 'from-purple-500 via-pink-500 to-red-500',
  SIX: 'from-yellow-400 via-orange-500 to-pink-500',
  SEVEN: 'from-blue-500 via-purple-500 to-pink-500',
  EIGHT: 'from-indigo-500 via-purple-500 to-pink-500',
  NINE: 'from-green-500 via-emerald-500 to-teal-500',
  TEN: 'from-blue-600 via-indigo-500 to-purple-500'
};

interface WhatWeDoItemProps {
  number: NumberWord;
  title: string;
  description: string;
  iconUrl?: string | null;
  isActive?: boolean;
  isLast?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function WhatWeDoItem({
  number,
  title,
  description,
  iconUrl,
  isActive = false,
  onMouseEnter,
  onMouseLeave
}: WhatWeDoItemProps) {
  const variants = {
    active: {
      height: 280,
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.25,
        ease: [0.32, 0, 0.24, 1],
        opacity: { duration: 0.2 }
      }
    },
    inactive: {
      height: 220,
      opacity: 0.95,
      y: 4,
      transition: { 
        duration: 0.2,
        ease: [0.32, 0, 0.24, 1],
        opacity: { duration: 0.15 }
      }
    }
  };

  const contentVariants = {
    active: {
      x: 4,
      opacity: 1,
      transition: { 
        duration: 0.25,
        ease: [0.32, 0, 0.24, 1]
      }
    },
    inactive: {
      x: 0,
      opacity: 0.95,
      transition: { 
        duration: 0.2,
        ease: [0.32, 0, 0.24, 1]
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative flex w-full items-center justify-center overflow-hidden cursor-pointer"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.95 : 0 }}
        transition={{ duration: 0.2, ease: [0.32, 0, 0.24, 1] }}
        className="absolute inset-0"
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientMap[number]} animate-gradient-x`} />
      </motion.div>
      <Container>
        <div className="relative z-10 flex items-center py-16">
          {iconUrl && (
            <motion.div 
              className="relative aspect-square w-14 mr-8"
              animate={{ 
                scale: isActive ? 1.02 : 1,
                transition: { duration: 0.2, ease: [0.32, 0, 0.24, 1] }
              }}
            >
              <Image
                src={iconUrl}
                alt={title}
                fill
                className={`rounded-none border-none object-contain ${
                  isActive ? 'brightness-0 invert' : ''
                }`}
              />
            </motion.div>
          )}
          <div className="flex justify-between items-start gap-24 flex-grow">
            <motion.div 
              className="flex flex-col items-start"
              variants={contentVariants}
              animate={isActive ? 'active' : 'inactive'}
            >
              <p className={`text-sm mb-2 ${
                isActive ? 'text-background' : 'text-[#6A81B4]'
              }`}>
                {number}
              </p>
              <h3 className={`text-2xl ${
                isActive ? 'text-background' : 'text-foreground'
              }`}>
                {title}
              </h3>
            </motion.div>
            <motion.p 
              className={`text-left max-w-xl text-lg leading-relaxed ${
                isActive ? 'text-background' : 'text-foreground'
              }`}
              variants={contentVariants}
              animate={isActive ? 'active' : 'inactive'}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </Container>
    </motion.div>
  );
}
