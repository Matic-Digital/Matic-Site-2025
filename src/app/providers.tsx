'use client';

// Types
import { type ReactNode } from 'react';

// State Management
import { Provider as JotaiProvider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Theme
import { ThemeProvider } from 'next-themes';
import { Provider as WrapBalancerProvider } from 'react-wrap-balancer';

// Utils
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnMount: true,
      refetchOnWindowFocus: true
    }
  }
});

/**
 * Global providers wrapper component
 * Configures React Query for data fetching and Jotai for state management
 *
 * @param children - Child components to be wrapped with providers
 */
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DevTools theme="dark" />
        <ThemeProvider 
          attribute="class"
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          <WrapBalancerProvider>{children}</WrapBalancerProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
