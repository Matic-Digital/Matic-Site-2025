'use client';

import { useRive, Layout, Fit, Alignment, EventType } from '@rive-app/react-canvas';
import { ReactNode, useEffect, useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [showShadow, setShowShadow] = useState(false);

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit,
      alignment,
    }),
    autoplay: true,
    useOffscreenRenderer: false
  });

  useEffect(() => {
    if (rive) {
      const inputs = rive.stateMachineInputs("State Machine 1");
      if (inputs && inputs.length > 0) {
        const hoverInput = inputs[0];
        if (hoverInput) {
          hoverInput.value = isHovered ? 1 : 0;
          
          // Show shadow after animation delay
          if (isHovered) {
            const timer = setTimeout(() => {
              setShowShadow(true);
            }, 1750);
            return () => clearTimeout(timer);
          } else {
            setShowShadow(false);
          }
        }
      }
    }
    return undefined;
  }, [rive, isHovered]);

  return (
    <div
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        filter: showShadow ? 'drop-shadow(0 0 20px rgba(235, 1, 168, 0.25))' : 'none',
        transition: 'filter 0.5s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowShadow(false);
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
