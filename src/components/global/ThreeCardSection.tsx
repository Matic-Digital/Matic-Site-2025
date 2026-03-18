import { Container, Section, Box } from './matic-ds';

interface CardData {
  icon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  overline: string;
  title: string;
  description: string;
  backgroundImage?: string;
}

interface ThreeCardSectionProps {
  heading: string;
  description: string;
  cards: CardData[];
}

export default function ThreeCardSection({ heading, description, cards }: ThreeCardSectionProps) {
  return (
    <Section className="bg-white text-maticblack">
      <Container>
        <Box direction="col" className="gap-[3rem]">
          {/* Section Header */}
          <Box direction="col" className="gap-[1rem]">
            <h2 className="text-[3rem] font-[400] leading-[140%] text-maticblack">{heading}</h2>
            <p className="text-[1.75rem] font-[400] leading-[140%] max-w-[45rem] text-maticblack">{description}</p>
          </Box>

          {/* Cards Grid */}
          <Box direction="row" className="gap-[3.5rem] flex-wrap md:flex-nowrap">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group flex-1 min-w-[280px] p-[1.38rem] rounded-[0.5rem] border bg-cover bg-center bg-no-repeat transition-colors duration-300 hover:bg-maticblack"
                style={{ 
                  borderColor: 'rgba(176, 177, 188, 0.50)',
                  backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : undefined
                }}
              >
                <Box direction="col" className="gap-[8.5rem]">
                {/* Icon and Overline - horizontally aligned */}
                <Box direction="row" className="gap-[0.75rem] items-center">
                  {/* Icon */}
                  <div className="bg-maticblack p-[0.62rem] rounded-[0.25rem] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-white">
                    <div className="w-[2.125rem] h-[2.125rem] flex items-center justify-center text-white transition-colors duration-300 group-hover:text-maticblack relative">
                      <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
                        {card.icon}
                      </div>
                      {card.hoverIcon && (
                        <div className="absolute inset-0 flex items-center justify-center hidden group-hover:flex">
                          {card.hoverIcon}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overline */}
                  <p className="text-[2rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                    {card.overline}
                  </p>
                </Box>

                {/* Title and Description grouped */}
                <Box direction="col" className="gap-[1.12rem]">
                  {/* Title */}
                  <h3 className="text-[1.75rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">{card.title}</h3>

                  {/* Description */}
                  <p className="text-[1.25rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                    {card.description}
                  </p>
                </Box>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
