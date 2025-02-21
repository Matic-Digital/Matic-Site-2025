'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface RiveAnimationProps {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fit?: Fit;
  alignment?: Alignment;
  children: ReactNode;
}

export function RiveAnimation({
  src,
  width = '100%',
  height = '100%',
  className = '',
  fit = Fit.Cover,
  alignment = Alignment.Center,
  children
}: RiveAnimationProps) {
  const [showShadow, setShowShadow] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { rive, RiveComponent } = useRive({
    src,
    layout: new Layout({
      fit,
      alignment,
    }),
    autoplay: false
  });

  useEffect(() => {
    if (rive && inView) {
      console.log('Starting animation');
      rive.play();
      const timer = setTimeout(() => {
        console.log('Adding shadow');
        setShowShadow(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [rive, inView]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        filter: showShadow ? 'drop-shadow(0 0 20px rgba(235, 1, 168, 0.25))' : 'none',
        transition: 'filter 0.5s ease-out'
      }}
    >
      <RiveComponent
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none',
          borderRadius: '8px'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: showShadow ? 1 : 0,
          boxShadow: '0 0 40px rgba(235, 1, 168, 0.3)',
          transition: 'opacity 0.5s ease-out',
          pointerEvents: 'none'
        }}
      />
      {children}
    </div>
  );
}
