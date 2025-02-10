'use client';

import cn from 'classnames';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center relative group text-current w-[40px]">
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
      <div
        className="absolute left-0 opacity-0 group-hover:opacity-100 text-current pointer-events-none"
        style={{
          transform: 'scale(0.9)',
          transformOrigin: 'left center',
          width: 'max-content'
        }}
      >
        <svg width="63" height="21" viewBox="0 0 63 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.299805 20.2831V0.403748H3.40596L7.55852 10.9304H7.62277L11.7423 0.403748H14.8796V20.285H11.6468V8.19373H11.5826L8.38094 16.7376H6.76545L3.59688 8.19373H3.53263V20.285H0.299805V20.2831Z" fill="currentColor"/>
          <path d="M18.0469 20.2831L23.0861 0.401855H25.7792L30.8185 20.2831H27.5856L26.6347 16.0112H22.2306L21.2797 20.2831H18.0469ZM26.0344 13.3314L24.4501 6.12649H24.3859L22.8016 13.3314H26.0344Z" fill="currentColor"/>
          <path d="M34.3665 20.2832V3.08362H30.627V0.403809H41.3388V3.08362H37.5993V20.2832H34.3665Z" fill="currentColor"/>
          <path d="M44.4453 20.2832V0.403809H47.6781V20.285H44.4453V20.2832Z" fill="currentColor"/>
          <path d="M62.6674 14.6154V15.8443C62.6674 16.4588 62.5352 17.0402 62.2708 17.5887C62.0065 18.1389 61.6411 18.6268 61.1767 19.0542C60.7122 19.4816 60.167 19.8227 59.5447 20.0722C58.9205 20.3235 58.2504 20.4501 57.5327 20.4501C56.9195 20.4501 56.2972 20.3748 55.662 20.2263C55.0286 20.0777 54.4577 19.8172 53.951 19.4431C53.4444 19.0707 53.0258 18.592 52.699 18.005C52.3723 17.4199 52.207 16.6697 52.207 15.7581V4.8114C52.207 4.16024 52.3337 3.55495 52.587 2.99734C52.8404 2.4379 53.2002 1.95366 53.6646 1.54463C54.1291 1.1356 54.6835 0.814606 55.3297 0.581658C55.9741 0.348711 56.6864 0.233154 57.4684 0.233154C58.9903 0.233154 60.2258 0.671535 61.1767 1.54463C61.6411 1.97384 62.0046 2.48009 62.2708 3.06704C62.5352 3.65216 62.6674 4.29231 62.6674 4.98014V6.09719H59.4345V5.14706C59.4345 4.58945 59.2546 4.10522 58.8966 3.69618C58.5368 3.28715 58.0503 3.08172 57.439 3.08172C56.6368 3.08172 56.1026 3.29999 55.8382 3.73837C55.5739 4.17675 55.4417 4.72885 55.4417 5.40018V15.5637C55.4417 16.1396 55.5849 16.6238 55.8694 17.0145C56.1558 17.4052 56.668 17.5997 57.406 17.5997C57.6171 17.5997 57.8447 17.5685 58.0871 17.5024C58.3294 17.4382 58.557 17.33 58.7681 17.1815C58.9591 17.0329 59.1169 16.8274 59.2436 16.567C59.3703 16.3065 59.4345 15.9819 59.4345 15.5893V14.6117H62.6674V14.6154Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}
