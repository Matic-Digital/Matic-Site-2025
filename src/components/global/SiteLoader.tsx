'use client';

import { motion } from 'framer-motion';

export function SiteLoader() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            transition: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }
          }}
          className="h-12 w-12 rounded-full border-2 border-foreground"
        />
      </div>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: 360,
          transition: {
            duration: 4,
            ease: "linear",
            repeat: Infinity
          }
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-2 w-2 rounded-full bg-foreground" style={{ transform: 'translateX(2.5rem)' }} />
      </motion.div>
    </div>
  );
}
