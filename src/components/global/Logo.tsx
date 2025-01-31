import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  withLink?: boolean;
}

export function Logo({ variant = 'dark', withLink = true }: LogoProps) {
  const logoSrc = variant === 'light' ? '/Matic Logo White.svg' : '/Matic Logo.svg';
  
  const logoImage = (
    <Image 
      src={logoSrc}
      alt="Matic Logo"
      width={120}
      height={40}
      className="h-8 w-auto rounded-none border-none filter-text"
    />
  );
  
  if (!withLink) {
    return logoImage;
  }
  
  return (
    <Link href="/" className="block">
      {logoImage}
    </Link>
  );
}
