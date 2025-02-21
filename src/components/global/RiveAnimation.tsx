'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { ReactNode, useEffect } from 'react';
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
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { rive, RiveComponent } = useRive({
    src,
    animations: ["Rotating Gradient", "Border Reveal"],
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
    }
  }, [rive, inView]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        width, 
        height
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
      {children}
    </div>
  );
}
