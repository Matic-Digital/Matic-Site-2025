'use client';

import type { MotionProps, Variants, UseInViewOptions } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type MarginType = UseInViewOptions['margin'];

interface BlurFadeProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  useBlur?: boolean;
  shouldAnimate?: boolean;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
  useBlur = false,
  shouldAnimate = true,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = (!inView || inViewResult) && shouldAnimate;
  const defaultVariants: Variants = {
    hidden: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']:
        direction === 'up' || direction === 'left' ? offset : -offset,
      opacity: 0,
      ...(useBlur && { filter: `blur(${blur})` })
    },
    visible: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
      opacity: 1,
      ...(useBlur && { filter: `blur(0px)` })
    }
  };
  const combinedVariants = variant ?? defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration: duration,
          ease: 'easeOut'
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
