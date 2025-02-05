'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const logoSrc = '/Matic Logo.svg';
  const textSrc = '/MaticText.svg';
  const [svgContent, setSvgContent] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');

  useEffect(() => {
    // Load logo SVG
    fetch(logoSrc)
      .then((res) => res.text())
      .then((text) => {
        // Replace any fill color with currentColor
        const themed = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
        setSvgContent(themed);
      })
      .catch((error) => console.error('Error loading SVG:', error));

    // Load text SVG
    fetch(textSrc)
      .then((res) => res.text())
      .then((text) => {
        // Replace any fill color with currentColor
        const themed = text.replace(/fill="[^"]*"/g, 'fill="currentColor"');
        setTextContent(themed);
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, [logoSrc, textSrc]);

  return (
    <div className="flex items-center relative group text-current">
      <div
        className={cn('flex items-center text-current', className)}
        style={{
          transform: 'scale(0.7)',
          transformOrigin: 'left center'
        }}
        dangerouslySetInnerHTML={{
          __html: svgContent
        }}
      />
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-current"
        style={{
          transform: 'scale(0.9)',
          transformOrigin: 'left center'
        }}
        dangerouslySetInnerHTML={{
          __html: textContent
        }}
      />
    </div>
  );
}
