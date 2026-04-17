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
  blueBg?: boolean;
}

export default function ThreeCardSection({
  heading,
  description,
  cards,
  blueBg = false
}: ThreeCardSectionProps) {
  return (
    <Section className="bg-white text-maticblack">
      <Container>
        <div
          className={
            blueBg ? 'rounded-[0.5rem] bg-maticblack px-[2.5rem] pb-[4rem] pt-[3.25rem]' : ''
          }
        >
          <Box direction="col" className="gap-[3rem]">
            {/* Section Header */}
            <Box direction="col" className="gap-[1rem]">
              <h2
                className={`font-[400] ${blueBg ? 'text-[2rem] leading-[120%] text-white' : 'text-[3rem] leading-[140%] text-maticblack'}`}
                style={blueBg ? { letterSpacing: '-0.06rem' } : undefined}
              >
                {heading}
              </h2>
              <p
                className={`max-w-[45rem] font-[400] leading-[140%] ${blueBg ? 'max-w-none text-[1.75rem] text-white' : 'text-[1.75rem] text-maticblack'}`}
              >
                {description}
              </p>
            </Box>

            {/* Cards Grid */}
            <Box direction="row" className="flex-wrap gap-[3.5rem] md:flex-nowrap">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group min-w-[280px] flex-1 rounded-[0.5rem] border bg-white bg-cover bg-center bg-no-repeat p-[1.38rem] transition-colors duration-300 hover:bg-maticblack"
                  style={{
                    borderColor: 'rgba(176, 177, 188, 0.50)',
                    backgroundImage: card.backgroundImage
                      ? `url(${card.backgroundImage})`
                      : undefined
                  }}
                >
                  <Box direction="col" className="gap-[8.5rem]">
                    {/* Icon and Overline - horizontally aligned */}
                    <Box direction="row" className="items-center gap-[0.75rem]">
                      {/* Icon */}
                      <div className="flex shrink-0 items-center justify-center rounded-[0.25rem] bg-maticblack p-[0.62rem] transition-colors duration-300 group-hover:bg-white">
                        <div className="relative flex h-[2.125rem] w-[2.125rem] items-center justify-center text-white transition-colors duration-300 group-hover:text-maticblack">
                          <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
                            {card.icon}
                          </div>
                          {card.hoverIcon && (
                            <div className="absolute inset-0 flex hidden items-center justify-center group-hover:flex">
                              {card.hoverIcon}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Overline */}
                      <h3 className="text-[2rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                        {card.overline}
                      </h3>
                    </Box>

                    {/* Title and Description grouped */}
                    <Box direction="col" className="gap-[1.12rem]">
                      {/* Title */}
                      <h4 className="text-[1.75rem] font-[400] leading-[140%] text-maticblack transition-colors duration-300 group-hover:text-white">
                        {card.title}
                      </h4>

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
        </div>
      </Container>
    </Section>
  );
}
