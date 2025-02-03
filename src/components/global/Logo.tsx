'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const logoSrc = variant === 'light' ? '/Matic Logo White.svg' : '/Matic Logo.svg';
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(logoSrc)
      .then(res => res.text())
      .then(text => {
        // Replace any fill color with currentColor
        const themed = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
        setSvgContent(themed);
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, [logoSrc]);
  
  return (
    <div 
      className={cn('flex items-center', className)}
      style={{
        transform: 'scale(0.7)',
        transformOrigin: 'left center'
      }}
      dangerouslySetInnerHTML={{ 
        __html: svgContent
      }} 
    />
  );
}
