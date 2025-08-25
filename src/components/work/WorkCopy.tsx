import type { WorkCopyProps } from '@/types';
import Markdown from 'markdown-to-jsx';
import { Box, Container, Section } from '../global/matic-ds';

export function WorkCopy({ eyebrowHeader, header, copy }: WorkCopyProps) {
  return (
    <Section className="py-[5.5rem] md:py-[8.75rem]" id={header}>
      <Container className="flex items-center justify-center">
        <Box direction="col" className="md:max-w-[660px]">
          {eyebrowHeader && (
            <p className="pb-[2.25rem] text-[0.875rem] uppercase leading-[120%] opacity-40">
              {eyebrowHeader}
            </p>
          )}
          {copy && (
            <Markdown
              options={{
                overrides: {
                  h1: {
                    component: 'h1',
                    props: {
                      className:
                        'text-[1.5rem] md:text-[2rem] font-sans font-medium pb-[0.5rem] md:pb-[0.75rem]'
                    }
                  },
                  h2: {
                    component: 'h2',
                    props: {
                      className: 'text-[1.5rem] md:text-[1.5rem] leading-[120%] pb-[0.5rem]'
                    }
                  },
                  h3: {
                    component: 'h3',
                    props: { className: 'text-[1.25rem] font-sans font-medium pb-[0.5rem]' }
                  },
                  h4: {
                    component: 'h4',
                    props: { className: 'text-[1rem] font-sans font-medium pb-[0.5rem]' }
                  },
                  p: {
                    component: 'p',
                    props: {
                      className:
                        'text-[0.875rem] md:text-[1.125rem] md:leading-[160%] font-sans font-light'
                    }
                  },
                  ul: {
                    component: 'ul',
                    props: {
                      className:
                        'text-[0.875rem] md:text-[1.125rem] md:leading-[160%] font-sans font-light'
                    }
                  },
                  ol: {
                    component: 'ol',
                    props: {
                      className:
                        'text-[0.875rem] md:text-[1.125rem] md:leading-[160%] font-sans font-light'
                    }
                  },
                  li: {
                    component: 'li',
                    props: {
                      className:
                        'text-[0.875rem] md:text-[1.125rem] md:leading-[160%] font-sans font-light'
                    }
                  }
                }
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
