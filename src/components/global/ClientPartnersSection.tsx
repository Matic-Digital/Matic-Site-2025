'use client';

import { Container, Section } from '@/components/global/matic-ds';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/*
// Logo data that was previously defined in page.tsx
// Permanent logos (never rotate)
const permanentLogos = [
  { id: '1', logoUrl: '/partners/GD Registry Logo.svg', name: 'GoDaddy' },
  { id: '2', logoUrl: '/partners/NXP.svg', name: 'Nextracker' },
  { id: '9', logoUrl: '/partners/FFP.svg', name: 'FFP' }
];

// Rotating logos (cycle through the remaining positions)
const rotatingLogos = [
  { id: '3', logoUrl: '/partners/mogl.svg', name: 'MOGL' },
  { id: '4', logoUrl: '/partners/Pluto.svg', name: 'Pluto' },
  { id: '5', logoUrl: '/partners/org.svg', name: 'Org' },
  { id: '6', logoUrl: '/partners/loomly.svg', name: 'Loomly' },
  { id: '7', logoUrl: '/partners/teambuildr.svg', name: 'TeamBuildr' },
  { id: '8', logoUrl: '/partners/Azira logo white 1.svg', name: 'Azira' },
  { id: '10', logoUrl: '/partners/Well.svg', name: 'Well' },
  { id: '11', logoUrl: '/partners/Amtrak-Logo.svg', name: 'Amtrak' },
  { id: '12', logoUrl: '/partners/Colorado.svg', name: 'Colorado' },
  { id: '13', logoUrl: '/partners/JetBlue.svg', name: 'JetBlue' }
];

// Combined array for the component (used as fallback)
const allClientLogos = [...permanentLogos, ...rotatingLogos];
*/

interface ClientPartner {
  id: string;
  logoUrl: string;
  name?: string;
}

interface ClientPartnersSectionProps {
  sectionHeader: string;
  sectionSubheader: string;
  clients: ClientPartner[];
  permanentClients?: ClientPartner[]; // Logos that never change
  rotatingClients?: ClientPartner[]; // Pool of logos to rotate through
}

export function ClientPartnersSection({
  sectionHeader: _sectionHeader,
  sectionSubheader: _sectionSubheader,
  clients,
  permanentClients = [],
  rotatingClients = []
}: ClientPartnersSectionProps) {
  const defaultPermanent = permanentClients.length > 0 ? permanentClients : clients.slice(0, 5);
  const defaultRotating = rotatingClients.length > 0 ? rotatingClients : clients;

  // Initialize display logos: use IDs 1-10 to determine exact positions
  const [displayLogos, setDisplayLogos] = useState<ClientPartner[]>(() => {
    const logosByPosition: (ClientPartner | undefined)[] = new Array<ClientPartner | undefined>(10);

    // Place permanent logos in their exact positions based on ID
    defaultPermanent.forEach((logo) => {
      const position = parseInt(logo.id) - 1; // Convert ID to 0-based index
      if (position >= 0 && position < 10) {
        logosByPosition[position] = logo;
      }
    });

    // Fill remaining positions with rotating logos
    let rotatingIndex = 0;
    for (let i = 0; i < 10; i++) {
      if (!logosByPosition[i] && rotatingIndex < defaultRotating.length) {
        // Find next rotating logo that isn't permanent
        while (
          rotatingIndex < defaultRotating.length &&
          defaultPermanent.some((perm) => perm.id === defaultRotating[rotatingIndex]?.id)
        ) {
          rotatingIndex++;
        }
        if (rotatingIndex < defaultRotating.length) {
          const rotatingLogo = defaultRotating[rotatingIndex];
          if (rotatingLogo) {
            logosByPosition[i] = rotatingLogo;
            rotatingIndex++;
          }
        }
      }
    }

    return logosByPosition.filter((logo): logo is ClientPartner => Boolean(logo)); // Remove any undefined slots
  });

  const [fadingIndex, setFadingIndex] = useState<number | null>(null);

  useEffect(() => {
    const rotateLogos = () => {
      // Only rotate non-permanent logos
      const rotatableIndices = displayLogos
        .map((logo, index) => ({ logo, index }))
        .filter(({ logo }) => !defaultPermanent.some((perm) => perm.id === logo.id))
        .map(({ index }) => index);

      if (rotatableIndices.length === 0) {
        return;
      }

      // Pick random rotatable logo to replace
      const randomIndex = rotatableIndices[Math.floor(Math.random() * rotatableIndices.length)];

      if (randomIndex === undefined) {
        return;
      }

      // Get available logos that aren't currently displayed
      const availableLogos = defaultRotating.filter(
        (logo) => !displayLogos.some((displayed) => displayed.id === logo.id)
      );

      if (availableLogos.length === 0) {
        return;
      }

      // Pick random replacement logo
      const newLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)];

      if (!newLogo) return;

      // Start fade out
      setFadingIndex(randomIndex);

      // After fade out, replace logo and fade in
      setTimeout(() => {
        setDisplayLogos((prev) => {
          const newLogos = [...prev];
          newLogos[randomIndex] = newLogo;
          return newLogos;
        });
        setFadingIndex(null);
      }, 300); // Fade duration
    };

    let timeoutId: NodeJS.Timeout;

    const scheduleNextRotation = () => {
      // Random interval between 3-5 seconds (3000-5000ms)
      const randomDelay = Math.random() * 2000 + 3000;

      timeoutId = setTimeout(() => {
        rotateLogos();
        scheduleNextRotation(); // Schedule the next one after this completes
      }, randomDelay);
    };

    // Start the first rotation
    scheduleNextRotation();

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [displayLogos, defaultPermanent, defaultRotating]);
  return (
    <Section className="bg-text pb-[7.19rem] pt-[7.06rem] dark:bg-background dark:bg-text">
      <Container>
        <div className="flex flex-col items-center">
          {/* Logo Grid - Responsive: 2 cols mobile, 5 cols desktop */}
          <div
            className="grid w-full grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-5"
            style={{ rowGap: '4.31rem', columnGap: '6.06rem' }}
          >
            {displayLogos.slice(0, 10).map((client, index) => {
              // For mobile (2 columns): left column (even indices) = right align, right column (odd indices) = left align
              // For desktop (5 columns): center align all
              const isLeftColumn = index % 2 === 0;
              const mobileAlignment = isLeftColumn ? 'justify-end' : 'justify-start';

              return (
                <div
                  key={`${client.id}-${index}`}
                  className={`flex h-12 items-center md:h-[4.19rem] ${mobileAlignment} md:justify-center`}
                >
                  <Image
                    src={client.logoUrl}
                    alt={client.name ?? 'Client logo'}
                    width={0}
                    height={0}
                    className={`scale-80 h-auto w-auto border-none transition-opacity duration-300 md:scale-100 ${
                      fadingIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              );
            })}
          </div>

          {/* See our work button - 6.21rem below bottom row */}
          <div style={{ marginTop: '6.21rem' }}>
            <Link
              href="/work"
              className="rounded-sm border border-[#FFFFFF] px-6 py-3 text-[#FFFFFF] transition-opacity hover:opacity-80"
            >
              See our work
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
