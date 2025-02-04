import type { WorkCopyProps } from '@/types';
import Markdown from 'markdown-to-jsx';
import { Box, Container, Section } from '../global/matic-ds';

export function WorkCopy({ eyebrowHeader, header, copy }: WorkCopyProps) {
  return (
    <Section className="" id={header}>
      <Container className='flex items-center justify-center'>
        <Box direction="col" gap={8} className='md:max-w-[660px]'>
          {eyebrowHeader && <p className="uppercase leading-[120%] opacity-40 text-[0.875rem]">{eyebrowHeader}</p>}
          {copy && (
            <Markdown
              options={{
                overrides: {
                  h1: { component: "h1", props: { className: "" } },
                  h2: { component: "h2", props: { className: "text-[2rem] font-sans leading-[120%] pb-4" } },
                  h3: { component: "h3", props: { className: "" } },
                  h4: { component: "h4", props: { className: "" } },
                  p: { component: "p", props: { className: "pb-4" } },
                  ul: { component: "ul", props: { className: "" } },
                  ol: { component: "ol", props: { className: "" } },
                  li: { component: "li", props: { className: "" } },
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
