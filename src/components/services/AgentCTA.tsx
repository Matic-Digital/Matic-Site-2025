import { Container, Section } from '../global/matic-ds';

interface FrameworkItem {
  letter: string;
  title: string;
  description: string;
}

interface AgentCTAProps {
  title: string;
  description: string;
  footerText: string;
  overline: string;
  frameworkItems: FrameworkItem[];
}

export default function AgentCTA({
  title,
  description,
  footerText,
  overline,
  frameworkItems
}: AgentCTAProps) {
  return (
    <Section className="bg-white">
      <Container>
        <div
          className="grid grid-cols-1 gap-12 rounded-[0.5rem] bg-white lg:grid-cols-2"
          style={{
            border: '1px solid rgba(176, 177, 188, 0.50)',
            paddingLeft: '2.37rem',
            paddingRight: '2.37rem',
            paddingTop: '3rem',
            paddingBottom: '3rem'
          }}
        >
          {/* Left Column - Title, Description, Footer */}
          <div className="flex flex-col justify-between">
            <div>
              <h2
                className="font-[400] leading-[140%] text-maticblack"
                style={{ fontSize: '2.25rem', marginBottom: '1.77rem' }}
              >
                {title.split('. ').map((sentence, index, array) => (
                  <span key={index}>
                    {sentence}{index < array.length - 1 ? '.' : ''}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p
                className="font-[400] leading-[140%] text-maticblack"
                style={{ fontSize: '1.25rem' }}
              >
                {description}
              </p>
            </div>
            <p
              className="mt-8 font-[400]"
              style={{ 
                fontSize: '1.25rem',
                lineHeight: '140%',
                color: '#8C8C8C'
              }}
            >
              {footerText}
            </p>
          </div>

          {/* Right Column - Overline and Framework Items */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#076EFF]">
              {overline}
            </p>
            <div className="flex flex-col gap-4">
              {frameworkItems.map((item, index) => (
                <div key={index} className="flex items-center" style={{ gap: '0.87rem' }}>
                  {/* Letter */}
                  <div className="flex flex-shrink-0 items-center justify-center" style={{ width: '4.125rem' }}>
                    <span 
                      className="font-chalet-newyork font-[400] text-[#076EFF]"
                      style={{
                        fontSize: '2.25rem',
                        lineHeight: '160%',
                        letterSpacing: '-0.0225rem'
                      }}
                    >
                      {item.letter}
                    </span>
                  </div>
                  {/* Box with Title and Description */}
                  <div className="flex-1 bg-[#F0F0F0] p-4">
                    <h3 
                      className="mb-1 font-[600] text-maticblack"
                      style={{
                        fontSize: '1.25rem',
                        lineHeight: '140%'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="font-[400] text-maticblack"
                      style={{
                        fontSize: '1.25rem',
                        lineHeight: '140%'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
