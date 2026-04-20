import { Container, Section, Box } from '../global/matic-ds';

interface CardData {
  title: string;
  description: string;
  backgroundImage?: string;
}

interface CardCTAProps {
  heading: string;
  description: string;
  cards: CardData[];
}

export default function CardCTA({
  heading,
  description,
  cards
}: CardCTAProps) {
  return (
    <Section className="bg-white text-maticblack">
      <Container>
        <div className="rounded-[0.5rem] bg-maticblack px-[2.5rem] pb-[4rem] pt-[3.25rem]">
          <Box direction="col" className="gap-[3rem]">
            {/* Section Header */}
            <Box direction="col" className="gap-[1rem]">
              <h2
                className="text-[2rem] font-[400] leading-[120%] text-white"
                style={{ letterSpacing: '-0.06rem' }}
              >
                {heading}
              </h2>
              <p className="max-w-none text-[1.75rem] font-[400] leading-[140%] text-white">
                {description}
              </p>
            </Box>

          {/* Cards Grid - 2 columns */}
          <div className="grid grid-cols-1 gap-[3.5rem] md:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group rounded-[0.5rem] border bg-maticblack bg-cover bg-center bg-no-repeat px-[2rem] py-[3rem] transition-colors duration-300 hover:bg-white"
                style={{
                  borderColor: 'rgba(176, 177, 188, 0.50)',
                  backgroundImage: card.backgroundImage
                    ? `url(${card.backgroundImage})`
                    : undefined
                }}
              >
                <Box direction="col" className="gap-[1.12rem]">
                  {/* Title */}
                  <h4 className="text-[1.75rem] font-[400] leading-[140%] text-white transition-colors duration-300 group-hover:text-maticblack">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[1.25rem] font-[400] leading-[140%] text-white transition-colors duration-300 group-hover:text-maticblack">
                    {card.description}
                  </p>
                </Box>
              </div>
            ))}
          </div>
          </Box>
        </div>
      </Container>
    </Section>
  );
}
