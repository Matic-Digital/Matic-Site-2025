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
  ref?: React.Ref<HTMLDivElement>;
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
      };
  wrap?:
    | boolean
    | {
        base?: boolean;
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
      };
  gap?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  cols?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  rows?:
    | number
    | {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  ref?: React.Ref<HTMLDivElement>;
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
 * @param {React.Ref<HTMLDivElement>} [props.ref] - Optional ref for the container
 * @returns {JSX.Element} Container component
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, id, width, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('container', { 'max-w-full': width === 'full' }, className)}
        id={id}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

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
          'prose-h1:text-[1.5rem] md:prose-h1:text-[2rem] prose-h1:font-sans prose-h1:font-semibold',
          'prose-h2:text-[1.25rem] md:prose-h2:text-[1.5rem] prose-h2:font-sans prose-h2:font-medium',
          'prose-h3:text-[1.25rem] md:prose-h3:text-[1.5rem] prose-h3:font-sans prose-h3:font-medium',
          'prose-a:text-text hover:prose-a:text-blue',
          'prose-li:text-base md:prose-li:text-[1.25rem]'
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
 * @param {React.Ref<HTMLDivElement>} [props.ref] - Optional ref for the box
 * @returns {JSX.Element} Box component
 */
export function Box({
  children,
  className,
  direction = 'row',
  wrap = false,
  gap = 0,
  cols,
  rows,
  ref
}: BoxProps) {
  // Convert direction prop to Tailwind classes
  const getDirectionClasses = () => {
    if (typeof direction === 'string') {
      return direction === 'col' ? 'flex-col' : 'flex-row';
    }

    return cn(
      direction?.base === 'col' ? 'flex-col' : 'flex-row',
      direction?.sm === 'col' ? 'sm:flex-col' : direction?.sm === 'row' ? 'sm:flex-row' : '',
      direction?.md === 'col' ? 'md:flex-col' : direction?.md === 'row' ? 'md:flex-row' : '',
      direction?.lg === 'col' ? 'lg:flex-col' : direction?.lg === 'row' ? 'lg:flex-row' : '',
      direction?.xl === 'col' ? 'xl:flex-col' : direction?.xl === 'row' ? 'xl:flex-row' : ''
    );
  };

  // Convert wrap prop to Tailwind classes
  const getWrapClasses = () => {
    if (typeof wrap === 'boolean') {
      return wrap ? 'flex-wrap' : 'flex-nowrap';
    }

    return cn(
      wrap?.base ? 'flex-wrap' : 'flex-nowrap',
      wrap?.sm ? 'sm:flex-wrap' : wrap?.sm === false ? 'sm:flex-nowrap' : '',
      wrap?.md ? 'md:flex-wrap' : wrap?.md === false ? 'md:flex-nowrap' : '',
      wrap?.lg ? 'lg:flex-wrap' : wrap?.lg === false ? 'lg:flex-nowrap' : '',
      wrap?.xl ? 'xl:flex-wrap' : wrap?.xl === false ? 'xl:flex-nowrap' : ''
    );
  };

  // Convert gap prop to Tailwind classes
  const getGapClasses = () => {
    if (typeof gap === 'number') {
      return `gap-${gap}`;
    }

    return cn(
      gap?.base && `gap-${gap.base}`,
      gap?.sm && `sm:gap-${gap.sm}`,
      gap?.md && `md:gap-${gap.md}`,
      gap?.lg && `lg:gap-${gap.lg}`,
      gap?.xl && `xl:gap-${gap.xl}`
    );
  };

  // Convert cols prop to Tailwind classes
  const getGridColsClasses = () => {
    if (!cols) return '';
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }

    return cn(
      cols?.base && `grid-cols-${cols.base}`,
      cols?.sm && `sm:grid-cols-${cols.sm}`,
      cols?.md && `md:grid-cols-${cols.md}`,
      cols?.lg && `lg:grid-cols-${cols.lg}`,
      cols?.xl && `xl:grid-cols-${cols.xl}`
    );
  };

  // Convert rows prop to Tailwind classes
  const getGridRowsClasses = () => {
    if (!rows) return '';
    if (typeof rows === 'number') {
      return `grid-rows-${rows}`;
    }

    return cn(
      rows?.base && `grid-rows-${rows.base}`,
      rows?.sm && `sm:grid-rows-${rows.sm}`,
      rows?.md && `md:grid-rows-${rows.md}`,
      rows?.lg && `lg:grid-rows-${rows.lg}`,
      rows?.xl && `xl:grid-rows-${rows.xl}`
    );
  };

  const Element = cols || rows ? 'div' : 'div';
  const display = cols || rows ? 'grid' : 'flex';

  return (
    <Element
      ref={ref}
      className={cn(
        display,
        !cols && !rows && getDirectionClasses(),
        !cols && !rows && getWrapClasses(),
        getGapClasses(),
        getGridColsClasses(),
        getGridRowsClasses(),
        className
      )}
    >
      {children}
    </Element>
  );
}
