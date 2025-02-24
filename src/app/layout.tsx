// Global styles
import '@/styles/globals.css';
import '@/styles/matic.css';

// Dependencies
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import cn from 'classnames';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Components
import { Providers } from '@/app/providers';
import { Main } from '@/components/global/matic-ds';
import Header from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { Toaster } from '@/components/ui/toaster';
import { PageContent } from '@/components/global/PageContent';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ScrollToTop } from '@/components/global/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

/**
 * Metadata for the application
 * This will be used by Next.js for SEO and browser tab information
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: 'Matic - Contentful Next.js Starter',
  description: 'Modern content management and digital experiences',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

/**
 * Root layout component that wraps all pages
 * Features:
 * - Applies Inter font
 * - Sets HTML language
 * - Provides global context via Providers component
 *
 * @param children - Page content to be rendered
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans text-text antialiased", inter.variable)}>
        <Providers>
          <ThemeProvider>
            <ScrollToTop />
            <Header />
            <PageContent>
              <Main className="mt-24 flex flex-col">
                {children}
              </Main>
              <Footer />
            </PageContent>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
