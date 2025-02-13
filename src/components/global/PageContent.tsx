'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delay: 0.2 // Delay entrance to allow exit animation of previous page
        }
      }}
      exit={{ 
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}
