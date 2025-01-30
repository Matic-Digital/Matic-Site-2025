'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const MIN_LOADING_TIME = 300; // Minimum time to show loader

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    console.log('Default loading state changed:', isLoading);
  }
});

function LoadingProviderInner({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout>>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLoadingChange = useCallback((shouldLoad: boolean) => {
    if (shouldLoad) {
      setIsLoading(true);
    } else {
      // Ensure loader shows for at least MIN_LOADING_TIME
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
      loadingTimeout.current = setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_TIME);
    }
  }, []);

  useEffect(() => {
    // Trigger loading state on route change
    handleLoadingChange(true);
    
    // After a short delay, simulate route change completion
    const timer = setTimeout(() => {
      handleLoadingChange(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, [pathname, searchParams, handleLoadingChange]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading: handleLoadingChange }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <LoadingProviderInner>{children}</LoadingProviderInner>
    </Suspense>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
