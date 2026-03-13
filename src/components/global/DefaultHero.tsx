import { TextEffect } from '../ui/text-effect';
import { Container, Section } from './matic-ds';
import { Button } from '../ui/button';
import Link from 'next/link';

interface DefaultHeroProps {
  heading: string;
  subheading?: string;
  showButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
}

export default function DefaultHero({ heading, subheading, showButton = false, buttonHref = '/contact', buttonText = 'Contact us' }: DefaultHeroProps) {
  return (
    <Section>
      <Container className="space-y-[0.5rem]">
        <TextEffect per="char" as="h1">
          {heading}
        </TextEffect>
        <div className={`flex ${showButton ? 'items-end justify-between' : ''} gap-4`}>
          {subheading && (
            <TextEffect
              per="word"
              speedReveal={3}
              as="p"
              className="text-[0.875rem] font-[400] leading-[140%] tracking-[-0.035rem] md:w-[45rem] md:text-[1.75rem]"
            >
              {subheading}
            </TextEffect>
          )}
          {showButton && (
            <Link href={buttonHref} className="shrink-0">
              <Button variant="default" className="w-fit rounded-sm border-2 border-maticblack bg-transparent px-6 py-3 text-maticblack hover:bg-maticblack hover:text-white">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </Section>
  );
}
