import { TextEffect } from "../ui/text-effect";
import { Container, Section } from "./matic-ds";

interface DefaultHeroProps {
  heading: string;
  subheading?: string;
}

export default function DefaultHero({ heading, subheading }: DefaultHeroProps) {
    return (
      <Section>
        <Container className="space-y-[0.5rem]">
          <TextEffect per="char" as="h1">
            {heading}
          </TextEffect>
          {subheading && (
            <TextEffect per="word" speedReveal={3} as="p" className="text-[0.875rem] md:text-[1.75rem] md:w-[45rem] leading-[140%] tracking-[-0.035rem] font-[400]">
              {subheading}
            </TextEffect>
          )}
        </Container>
      </Section>
    );
}