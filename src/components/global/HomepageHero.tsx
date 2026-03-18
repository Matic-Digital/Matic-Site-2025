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
        <div className="py-[8rem] md:py-[12rem] text-center">
          <h1 className="text-[4rem] md:text-[6rem] font-[400] leading-[100%] mb-[3.06rem] text-maticblack">
            {title} <span style={{ color: '#076EFF' }}>{spanText}</span>
          </h1>
          <p className="text-[1.25rem] md:text-[1.5rem] font-[400] leading-[140%] max-w-[45rem] mx-auto">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
