'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const logoSrc = variant === 'light' ? '/Matic Logo White.svg' : '/Matic Logo.svg';
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    void fetch(logoSrc)
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch((error) => console.error('Error loading SVG:', error));
  }, [logoSrc]);
  
  return (
    <div
      className={cn('flex items-center', className)}
      dangerouslySetInnerHTML={{
        __html: svgContent
          ? svgContent.replace(
              'fill="#000000"',
              'fill="currentColor"'
            )
          : '',
      }}
    />
  );
}
