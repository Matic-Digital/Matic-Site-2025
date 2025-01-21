'use client';

interface WorkOverlayProps {
  sections: string[];
  activeSection: number;
}

export function WorkOverlay({ sections, activeSection = 0 }: WorkOverlayProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl whitespace-nowrap text-white/60">Recent work with</span>
        <div className="relative h-8">
          <div className="absolute left-0 flex flex-col">
            {sections.map((section, index) => (
              <h2
                key={section}
                className={`
                  text-2xl 
                  whitespace-nowrap 
                  transition-all 
                  duration-500
                  ${index === activeSection ? 'text-white' : ''}
                  ${index < activeSection ? 'text-white/40' : ''}
                  ${index > activeSection ? 'text-white/20' : ''}
                `}
                style={{
                  transform: `translateY(${(index - activeSection) * 32}px)`,
                  position: 'absolute',
                  top: 0
                }}
              >
                {section}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
