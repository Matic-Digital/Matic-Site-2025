'use client';

import cn from 'classnames';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center relative group text-current">
      <div
        className={cn('flex items-center text-current', className)}
        style={{
          transform: 'scale(0.7)',
          transformOrigin: 'left center'
        }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4890_869)">
            <path d="M41.7365 0H30.2599V41.6982H41.7365V0Z" fill="currentColor"/>
            <path d="M26.6093 0H15.1327V41.6982H26.6093V0Z" fill="currentColor"/>
            <path d="M11.4766 0H0V41.6982H11.4766V0Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_4890_869">
              <rect width="42" height="41.6982" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
