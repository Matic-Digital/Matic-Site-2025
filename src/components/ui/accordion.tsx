'use client';

import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import type { Transition, Variants, Variant } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
export type AccordionContextType = {
  expandedValue: React.Key | null;
  toggleItem: (value: React.Key) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

export type AccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

export type AccordionItemProps = {
  value: React.Key;
  children: ReactNode;
  className?: string;
};

export type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  value?: React.Key;
};

export type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};

// Context
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
}

// AccordionProvider
function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] =
    useState<React.Key | null>(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value: React.Key) => {
    const newValue = expandedValue === value ? null : value;
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalExpandedValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>
      {children}
    </AccordionContext.Provider>
  );
}

// Accordion
function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn('relative', className)} aria-orientation='vertical'>
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

// AccordionItem
function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('relative', className)} data-value={value}>
      {children}
    </div>
  );
}

// AccordionTrigger
function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion();
  const value = props.value;
  const isExpanded = value === expandedValue;

  return (
    <button
      onClick={() => value !== undefined && toggleItem(value)}
      aria-expanded={isExpanded}
      type='button'
      className={cn('group flex w-full items-center justify-between', className)}
    >
      {children}
      <ChevronUp className={cn(
        'h-4 w-4 shrink-0 text-zinc-950 transition-transform duration-200 dark:text-zinc-50 rotate-180',
        isExpanded && 'rotate-0'
      )} />
    </button>
  );
}

// AccordionContent
function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expandedValue } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value === expandedValue;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className={cn('overflow-hidden', className)}
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
