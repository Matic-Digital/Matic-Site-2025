'use client';

import { useRive, Layout, Fit, Alignment, StateMachineInput } from '@rive-app/react-webgl2';
import { type ReactNode, useEffect, useState } from 'react';
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
  fit = Fit.Fill,
  alignment = Alignment.Center,
  children
}: RiveAnimationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: ["State Machine 1"],
    layout: new Layout({
      fit,
      alignment,
    }),
    autoplay: false,
  });

  useEffect(() => {
    if (!rive || !inView) return;

    const inputs = rive.stateMachineInputs("State Machine 1");
    if (!inputs) return;

    const isHoveredInput = inputs.find(
      (input): input is StateMachineInput => input.name === "isHovered"
    );

    if (isHoveredInput) {
      isHoveredInput.value = isHovered;
    }

    // Play Border Reveal on initial view
    if (inView) {
      rive.play("State Machine 1");
    }
  }, [rive, inView, isHovered]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        width,
        height,
        transform: 'translateZ(0)',
        minHeight: '400px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiveComponent
        key={String(inView)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none',
          borderRadius: '8px',
          willChange: 'transform',
        }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-8">
        {children}
      </div>
    </div>
  );
}
