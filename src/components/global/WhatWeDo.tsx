'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { WhatWeDoItem } from './WhatWeDoItem';
import { useState, useCallback } from 'react';

export function WhatWeDo() {
  const [activeItem, setActiveItem] = useState<string>('');

  const handleHover = useCallback((number: string) => {
    setActiveItem(number);
  }, []);

  return (
    <Section>
      <Container className="">
        <Box direction="col" gap={0}>
          <h2 className="">Things we can do together</h2>
        </Box>
      </Container>
      <WhatWeDoItem
        number="one"
        title="Title"
        description="Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services."
        gradient={{
          '0%': '#DD013E',
          '37%': '#240830',
          '56%': '#250D63',
          '70%': '#5542B6',
          '84%': '#DB00E0'
        }}
        isActive={activeItem === 'one'}
        onHover={handleHover}
      />
      <WhatWeDoItem
        number="two"
        title="Title"
        description="Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services."
        gradient={{
          '0%': '#E4129E',
          '18%': '#5715CB',
          '45%': '#A35DB5',
          '74%': '#1CC6D3',
          '84%': '#3FE9FA'
        }}
        isActive={activeItem === 'two'}
        onHover={handleHover}
      />
      <WhatWeDoItem
        number="three"
        title="Title"
        description="Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services."
        gradient={{
          '0%': '#06DDEE',
          '29%': '#5715CB',
          '61%': '#A35DB5',
          '85%': '#A14BCC',
          '100%': '#CD74E5'
        }}
        isActive={activeItem === 'three'}
        onHover={handleHover}
      />
      <WhatWeDoItem
        number="four"
        title="Title"
        description="Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services."
        gradient={{
          '0%': '#FE148F',
          '30%': '#B14BA3',
          '53%': '#D08196',
          '74%': '#B2BCA1',
          '100%': '#1BE0C2'
        }}
        isActive={activeItem === 'four'}
        onHover={handleHover}
      />
      <WhatWeDoItem
        number="five"
        title="Title"
        description="Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services."
        gradient={{
          '0%': '#697FF1',
          '36%': '#CD907A',
          '60%': '#FB6C5A',
          '83%': '#FD355D',
          '100%': '#F91E6C'
        }}
        isActive={activeItem === 'five'}
        onHover={handleHover}
      />
    </Section>
  );
}
