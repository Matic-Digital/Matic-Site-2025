import { Container, Section } from "./matic-ds";

interface DefaultHeroProps {
    heading: string;
    subheading?: string;
}

export default function DefaultHero({ heading, subheading }: DefaultHeroProps) {
    return (
      <Section>
        <Container className="space-y-[0.5rem] md:space-y-[1.88rem]">
          <h1>{heading}</h1>
          <p className="text-[0.875rem] md:text-[1.75rem] md:w-[41.625rem]">
            {subheading}
          </p>
        </Container>
      </Section>
    );
}