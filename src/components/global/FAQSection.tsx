'use client';

import { useState } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Item } from '@/types/contentful';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  faqItems: Item[];
  className?: string;
}

interface FAQItemProps {
  item: Item;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  const handleMouseEnter = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop && !isOpen) {
      onToggle();
    }
  };

  const handleMouseLeave = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop && isOpen) {
      onToggle();
    }
  };

  return (
    <div
      className="md:hover:cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => {
          // Only click on mobile (below md breakpoint)
          const isMobile = window.matchMedia('(max-width: 767px)').matches;
          if (isMobile) {
            onToggle();
          }
        }}
        className={`w-full py-6 ${!isOpen ? 'border-b border-white' : ''}`}
        style={{ paddingBottom: '1.88rem' }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-normal text-white flex-1">
            {item.title ?? 'Question'}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown className="h-[1.5rem] w-[1.5rem] text-white" />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-white"
          >
            <div className="pb-6">
              <p className="text-white leading-relaxed text-lg">
                {item.description ?? 'Answer goes here'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ faqItems, className }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  return (
    <Section className={cn("py-16 bg-background", className)}>
      <Container>
        <Box direction="col" className="space-y-12">
          <div className="text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl text-white mb-4"
            >
              FAQs
            </motion.h2>
          </div>
          
          <div className="w-full">
            <motion.div 
              className="bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.sys.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <FAQItem
                    item={item}
                    isOpen={openItems.has(item.sys.id)}
                    onToggle={() => toggleItem(item.sys.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Box>
      </Container>
    </Section>
  );
}