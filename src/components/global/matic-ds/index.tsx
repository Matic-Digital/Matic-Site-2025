// https://github.com/brijr/craft/blob/main/craft/craft.css#L11
// matic-ds, v0.1
// This is a design system for building responsive layouts in React

import React from 'react';

import { cn } from '@/lib/utils';

// Types for component props

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

type MainProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  width?: 'boxed' | 'full';
};

type ArticleProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  html?: { __html: string };
};

type BoxProps = {
  children: React.ReactNode;
  className?: string;
  direction?:
    | 'row'
    | 'col'
    | {
        base?: 'row' | 'col';
        sm?: 'row' | 'col';
        md?: 'row' | 'col';
        lg?: 'row' | 'col';
        xl?: 'row' | 'col';
        '2xl'?: 'row' | 'col';
      };
  wrap?:
    | boolean
    | {
        base?: boolean;
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
        '2xl'?: boolean;
      };
  gap?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        '2xl'?: number;
      };
  cols?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        '2xl'?: number;
      };
  rows?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        '2xl'?: number;
      };
};

// Layout Component
// This component sets up the basic HTML structure and applies global styles

/**
 * Layout component that sets up the basic HTML structure and applies global styles
 * @example
 * ```tsx
 * <Layout>
 *   <Main>
 *     <Section>
 *       <Container>Content</Container>
 *     </Section>
 *   </Main>
 * </Layout>
 * ```
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered within the layout
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Layout component
 */
export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('scroll-smooth antialiased focus:scroll-auto', className)}
    >
      {children}
    </html>
  );
};

// Main Component
// This component is used for the main content area of the page

/**
 * Main component for the primary content area of the page
 * @example
 * ```tsx
 * <Main>
 *   <Section>
 *     <Container>
 *       <h1>Page Title</h1>
 *       <p>Main content</p>
 *     </Container>
 *   </Section>
 * </Main>
 * ```
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for the main element
 * @returns {JSX.Element} Main component
 */
export const Main = ({ children, className, id }: MainProps) => {
  return (
    <main className={cn(className)} id={id}>
      {children}
    </main>
  );
};

// Section Component
// This component is used for defining sections within the page

/**
 * Section component for grouping related content
 * @example
 * ```tsx
 * <Section>
 *   <Container>
 *     <h2>Section Title</h2>
 *     <p>Section content</p>
 *   </Container>
 * </Section>
 * ```
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for the section
 * @returns {JSX.Element} Section component
 */
export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={cn('section', className)} id={id}>
      {children}
    </section>
  );
};

/**
 * Container component that wraps content with consistent maximum width and padding
 * @example
 * ```tsx
 * <Container>
 *   <h1>Heading</h1>
 *   <p>Content</p>
 * </Container>
 *
 * // With custom width
 * <Container width="full">
 *   <h1>Full Width Content</h1>
 * </Container>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be contained
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for the container
 * @param {'boxed' | 'full'} [props.width] - Container width variant
 * @returns {JSX.Element} Container component
 */
export const Container = ({ children, className, id, width }: ContainerProps) => {
  return (
    <div className={cn('container', { 'max-w-full': width === 'full' }, className)} id={id}>
      {children}
    </div>
  );
};

// Article Component
// This component is used for rendering articles with optional dangerouslySetInnerHTML

/**
 * Article component for rendering article content with optional HTML injection
 * @example
 * ```tsx
 * // With children
 * <Article>
 *   <h1>Article Title</h1>
 *   <p>Article content</p>
 * </Article>
 * 
 * // With HTML content
 * <Article html={{ __html: htmlContent }} />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Article content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for the article
 * @param {{ __html: string }} [props.html] - HTML content to be rendered using dangerouslySetInnerHTML
 * @returns {JSX.Element} Article component
 */
export const Article = ({ children, className, id, html }: ArticleProps) => {
  return (
    <article dangerouslySetInnerHTML={html} className={cn('matic spaced', className)} id={id}>
      {children}
    </article>
  );
};

// Prose Component
// This component is used for rendering prose content with appropriate typography styles

/**
 * Prose component for rendering content with proper typography styles
 * @example
 * ```tsx
 * // With children
 * <Prose>
 *   <h1>Title</h1>
 *   <p>Beautifully styled text content</p>
 *   <ul>
 *     <li>List item 1</li>
 *     <li>List item 2</li>
 *   </ul>
 * </Prose>
 * 
 * // With HTML content
 * <Prose html={{ __html: htmlContent }} />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Content to be styled
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.id] - Optional ID for the prose container
 * @param {{ __html: string }} [props.html] - HTML content to be rendered using dangerouslySetInnerHTML
 * @returns {JSX.Element} Prose component
 */
export const Prose = ({ children, className, id, html }: ArticleProps) => {
  return (
    <div
      dangerouslySetInnerHTML={html}
      className={cn('matic spaced',
        ['prose md:max-w-[1100px]',
          'prose-h1:text-[2rem] prose-h1:font-sans prose-h1:font-medium',
          'prose-h2:text-[1.5rem] prose-h2:font-sans prose-h2:font-medium mt-0',
          'prose-h3:text-[1.25rem] prose-h3:font-sans prose-h3:font-medium',
          'prose-h4:text-[1rem] prose-h4:font-sans prose-h4:font-medium',
          'prose-h5:text-[0.875rem] prose-h5:font-sans prose-h5:font-medium',
          'prose-h6:text-[0.75rem] prose-h6:font-sans prose-h6:font-medium',
          'prose-p:text-[1rem] prose-p:font-sans prose-p:font-light',
          'prose-bold:text-[1rem] prose-bold:font-sans prose-bold:font-bold',
          'prose-blockquote:text-[1rem] prose-blockquote:font-sans prose-blockquote:font-italic prose-blockquote:border-mantle',
          'prose-a:text-[1rem] prose-a:font-sans prose-a:font-light prose-a:underline-offset-2 prose-a:text-blue',
        ], className)}
      id={id}
    >
      {children}
    </div>
  );
};

// Box Component
// This component is used for creating flexible layouts

/**
 * Box component for creating flexible layouts using either Flexbox or Grid
 * @example
 * ```tsx
 * // Flex layout
 * <Box direction="row" gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Box>
 *
 * // Responsive grid
 * <Box
 *   cols={{ sm: 1, md: 2, lg: 3 }}
 *   gap={{ sm: 2, md: 4 }}
 *   className="justify-items-center"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Box>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be laid out
 * @param {string} [props.className] - Additional CSS classes
 * @param {'row' | 'col' | Object} [props.direction] - Flex direction (use for flex layouts)
 * @param {boolean | Object} [props.wrap] - Whether items should wrap
 * @param {number | Object} [props.gap] - Space between items
 * @param {number | Object} [props.cols] - Number of grid columns (use for grid layouts)
 * @param {number | Object} [props.rows] - Number of grid rows
 * @returns {JSX.Element} Box component
 */
export const Box = ({
  children,
  className,
  direction = 'row',
  wrap = false,
  gap = 0,
  cols,
  rows
}: BoxProps) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap';

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12'
  };

  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12'
  };

  const getResponsiveClasses = (
    prop: string | number | Record<string, unknown> | undefined,
    classMap: Record<string | number, string>
  ) => {
    if (!prop) return '';

    if (typeof prop === 'object') {
      return Object.entries(prop)
        .map(([breakpoint, value]) => {
          const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`;
          return `${prefix}${classMap[value as keyof typeof classMap] ?? ''}`;
        })
        .join(' ');
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return classMap[prop as keyof typeof classMap] ?? '';
  };

  const stackClasses = cn(
    cols || rows ? 'grid' : 'flex',
    !cols && !rows && getResponsiveClasses(direction, directionClasses),
    !cols &&
      !rows &&
      (typeof wrap === 'boolean'
        ? wrapClasses
        : getResponsiveClasses(wrap, { true: 'flex-wrap', false: 'flex-nowrap' })),
    getResponsiveClasses(gap, gapClasses),
    cols && getResponsiveClasses(cols, colsClasses),
    rows && getResponsiveClasses(rows, colsClasses),
    className
  );

  console.log('Box props:', { cols, rows });
  console.log('Generated classes:', stackClasses);

  return <div className={stackClasses}>{children}</div>;
};
