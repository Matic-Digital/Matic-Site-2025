'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type HeaderVariant = 'light' | 'dark';

interface HeaderVariantContextType {
  variant: HeaderVariant;
  setVariant: (variant: HeaderVariant) => void;
}

interface HeaderVariantProviderProps {
  children: ReactNode;
}

const HeaderVariantContext = createContext<HeaderVariantContextType | undefined>(undefined);

export function useHeaderVariant() {
  const context = useContext(HeaderVariantContext);
  if (!context) {
    throw new Error('useHeaderVariant must be used within a HeaderVariantProvider');
  }
  return context;
}

export function HeaderVariantProvider({ children }: HeaderVariantProviderProps) {
  const [variant, setVariant] = useState<HeaderVariant>('light');

  return (
    <HeaderVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderVariantContext.Provider>
  );
}
