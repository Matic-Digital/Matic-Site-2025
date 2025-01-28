'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { WhatWeDoItem } from './WhatWeDoItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Capability } from '@/types';

const numberWords = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'] as const;
type NumberWord = typeof numberWords[number];

interface WhatWeDoProps {
  capabilities: Capability[];
}

export function WhatWeDo({ capabilities }: WhatWeDoProps) {
  const [activeItem, setActiveItem] = useState<NumberWord | ''>('');
  const [hoveredItem, setHoveredItem] = useState<NumberWord | ''>('');
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const findClosestItem = useCallback(() => {
    if (!containerRef.current) return null;

    const viewportHeight = window.innerHeight;
    const viewportCenter = window.scrollY + viewportHeight / 2;
    
    let closestItem: { distance: number; index: number } | undefined;
    
    itemRefs.current.forEach((itemRef, index) => {
      if (!itemRef) return;
      
      const rect = itemRef.getBoundingClientRect();
      const itemCenter = window.scrollY + rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - itemCenter);
      
      if (!closestItem || distance < closestItem.distance) {
        closestItem = { distance, index };
      }
    });

    if (closestItem && closestItem.distance < viewportHeight * 0.4) {
      return numberWords[closestItem.index];
    }
    return null;
  }, []);

  const updateActiveItem = useCallback(() => {
    if (!containerRef.current || isHovering) return;
    
    const newActiveItem = findClosestItem();
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem ?? '');
    }
  }, [activeItem, isHovering, findClosestItem]);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(updateActiveItem);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateActiveItem]);

  const handleMouseEnter = (number: NumberWord) => {
    setIsHovering(true);
    setHoveredItem(number);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredItem('');
    
    // Immediately calculate new active item based on current scroll position
    const newActiveItem = findClosestItem();
    setActiveItem(newActiveItem ?? '');
  };

  const reversedCapabilities = [...capabilities].reverse();

  return (
    <div className="bg-white">
      <Section id="whatwedo-section" className="!p-0">
        <Container>
          <Box direction="col" gap={0} className="py-12">
            <h2>Things we can do together</h2>
          </Box>
        </Container>
        <div 
          ref={containerRef} 
          className=""
        >
          {reversedCapabilities.map((capability, index) => {
            if (index >= numberWords.length) return null;
            const number = numberWords[index]!;
            
            return (
              <div 
                key={capability.sys.id}
                ref={el => itemRefs.current[index] = el}
              >
                <WhatWeDoItem
                  number={number}
                  title={capability.name ?? ''}
                  description={capability.briefText ?? ''}
                  iconUrl={capability.icon?.url ?? null}
                  isActive={isHovering ? hoveredItem === number : activeItem === number}
                  isLast={index === reversedCapabilities.length - 1}
                  onMouseEnter={() => handleMouseEnter(number)}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
