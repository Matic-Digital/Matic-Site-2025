'use client';

import { useState } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
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
  const handleClick = () => {
    onToggle();
  };

  // Rich text rendering options for FAQ content
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-lg leading-relaxed text-white last:mb-0">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="mb-4 text-2xl font-bold text-white">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="mb-3 text-xl font-bold text-white">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="mb-2 text-lg font-bold text-white">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="mb-4 list-outside list-disc space-y-1 pl-5 text-white">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="mb-4 list-inside list-decimal space-y-1 text-white">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="text-white">{children}</li>,
      [INLINES.HYPERLINK]: (node, children) => {
        const href = (node.data?.uri as string) || '#';
        return (
          <a
            href={href}
            className="text-white underline transition-colors hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div
        className={`w-full py-6 ${!isOpen ? 'border-b border-white/30' : ''}`}
        style={{ paddingBottom: '1.88rem' }}
      >
        <div className="flex items-center justify-between">
          <h3 className="flex-1 text-2xl font-normal text-white">{item.title ?? 'Question'}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 flex-shrink-0"
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
            className="overflow-hidden border-b border-white/30"
          >
            <div className="pb-6">
              {item.richDescription?.json ? (
                <div className="text-lg leading-relaxed text-white">
                  {documentToReactComponents(item.richDescription.json, renderOptions)}
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-white">Answer goes here</p>
              )}
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
    setOpenItems((prev) => {
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
    <Section className={cn('bg-maticblack py-16', className)}>
      <Container>
        <Box direction="col" className="space-y-12">
          <div className="text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-5xl text-white"
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
