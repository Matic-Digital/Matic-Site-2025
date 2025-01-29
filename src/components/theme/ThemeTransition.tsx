'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeTransitionProps {
  children: React.ReactNode;
}

export function ThemeTransition({ children }: ThemeTransitionProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      {children}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: theme === 'dark' ? 0.98 : 0,
          backgroundColor: theme === 'dark' ? 'var(--dark-background)' : 'var(--light-background)'
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </div>
  );
}
