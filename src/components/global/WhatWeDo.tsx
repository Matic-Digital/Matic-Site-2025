'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { WhatWeDoItem } from './WhatWeDoItem';
import { useState, useCallback } from 'react';
import { type Capability } from '@/types';

const numberWords = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'] as const;
type NumberWord = (typeof numberWords)[number];

interface WhatWeDoProps {
  capabilities: Capability[];
}

export function WhatWeDo({ capabilities }: WhatWeDoProps) {
  const [activeItem, setActiveItem] = useState<NumberWord | ''>('');

  const handleHover = useCallback((number: NumberWord | '') => {
    setActiveItem(number);
  }, []);

  const reversedCapabilities = [...capabilities].reverse();

  return (
    <Section>
      <Container className="">
        <Box direction="col" gap={0}>
          <h2 className="">Things we can do together</h2>
        </Box>
      </Container>
      {reversedCapabilities.map((capability, index) => {
        // Skip rendering if we don't have a corresponding number word
        if (index >= numberWords.length) return null;
        
        // Since we checked the index, this assertion is safe
        const number = numberWords[index]!;
        
        return (
          <WhatWeDoItem
            key={capability.sys.id}
            number={number}
            title={capability.name ?? ''}
            description={capability.briefText ?? ''}
            iconUrl={capability.icon?.url ?? null}
            isActive={activeItem === number}
            onHover={handleHover}
          />
        );
      })}
    </Section>
  );
}
