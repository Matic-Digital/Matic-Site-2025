import type { WorkCopyProps } from '@/types';
import Markdown from 'markdown-to-jsx';
import { Box, Container, Section } from '../global/matic-ds';

export function WorkCopy({ eyebrowHeader, header, copy }: WorkCopyProps) {
  return (
    <Section className="" id={header}>
      <Container className='flex items-center justify-center'>
        <Box direction="col" gap={8} className='md:max-w-[660px] pt-[4rem]'>
          {eyebrowHeader && <p className="uppercase leading-[120%] opacity-40 text-[0.875rem]">{eyebrowHeader}</p>}
          {copy && (
            <Markdown
              options={{
                overrides: {
                  h1: { component: "h1", props: { className: "text-[2rem] font-sans font-medium" } },
                  h2: { component: "h2", props: { className: "text-[1.5rem] font-sans font-medium" } },
                  h3: { component: "h3", props: { className: "text-[1.25rem] font-sans font-medium" } },
                  h4: { component: "h4", props: { className: "text-[1rem] font-sans font-medium" } },
                  p: { component: "p", props: { className: "text-[0.875rem] font-sans font-normal" } },
                  ul: { component: "ul", props: { className: "text-[0.875rem] font-sans font-normal" } },
                  ol: { component: "ol", props: { className: "text-[0.875rem] font-sans font-normal" } },
                  li: { component: "li", props: { className: "text-[0.875rem] font-sans font-normal" } },
                },
              }}
            >
              {copy}
            </Markdown>
          )}
        </Box>
      </Container>
    </Section>
  );
}
