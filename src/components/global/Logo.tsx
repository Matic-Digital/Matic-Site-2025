import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="block">
      <Image 
        src="/Matic Logo.svg" 
        alt="Matic Logo"
        width={120}
        height={40}
        className="h-8 w-auto rounded-none border-none"
        priority
      />
    </Link>
  );
}
