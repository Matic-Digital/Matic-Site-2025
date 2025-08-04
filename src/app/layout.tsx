// Global styles
import '@/styles/globals.css';
import '@/styles/matic.css';

// Dependencies
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import cn from 'classnames';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';

// Analytics
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';

// Components
import { Providers } from '@/app/providers';
import { Main } from '@/components/global/matic-ds';
import Header from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { Toaster } from '@/components/ui/toaster';
import { PageContent } from '@/components/global/PageContent';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ScrollToTop } from '@/components/global/ScrollToTop';
import { RouteChangeListener } from '@/components/transitions/RouteChangeListener';
import { ViewportChangeHandler } from '@/components/global/ViewportChangeHandler';

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
  title: 'Matic Digital',
  description: 'Matic Digital is a brand and digital experience agency based in Denver, Colorado. We design and deliver websites, apps, custom software, and brand platforms.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
  openGraph: {
    title: 'Matic Digital',
    description: 'Matic Digital is a brand and digital experience agency based in Denver, Colorado. We design and deliver websites, apps, custom software, and brand platforms.',
    url: 'https://maticdigital.com',
    siteName: 'Matic Digital',
    images: [
      {
        url: 'https://maticdigital.com/OpenGraph.png',
        width: 1200,
        height: 630,
        alt: 'Matic Digital',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Adding custom metadata for og:logo
  other: {
    'og:logo': 'https://maticdigital.com/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matic Digital',
    description: 'Matic Digital is a brand and digital experience agency based in Denver, Colorado. We design and deliver websites, apps, custom software, and brand platforms.',
    images: ['https://maticdigital.com/OpenGraph.png'],
  }
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
          <ThemeProvider defaultTheme="light">
            <ViewportChangeHandler />
            <ScrollToTop />
            <Header />
            <PageContent>
              <Main className="mt-24 flex flex-col">
                <Suspense>
                  <RouteChangeListener />
                </Suspense>
                {children}
              </Main>
              <Footer />
            </PageContent>
            <Toaster />
            <Analytics />
            <SpeedInsights />
            <Suspense>
              <GoogleTagManager id="GTM-KPH7P285" />
            </Suspense>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
