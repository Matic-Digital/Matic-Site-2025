import { Container, Section } from '@/components/global/matic-ds';

interface HomepageHeroProps {
  title: string;
  spanText: string;
  description: string;
}

export default function HomepageHero({ title, spanText, description }: HomepageHeroProps) {
  return (
    <Section className="bg-white text-maticblack">
      <Container>
        <div className="py-[8rem] text-center md:py-[12rem]">
          <h1 className="mb-[3.06rem] text-[4rem] font-[400] leading-[100%] text-maticblack md:text-[6rem]">
            {title} <span style={{ color: '#076EFF' }}>{spanText}</span>
          </h1>
          <p className="mx-auto max-w-[45rem] text-[1.25rem] font-[400] leading-[140%] md:text-[1.5rem]">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
