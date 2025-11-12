'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Section } from '@/components/global/matic-ds';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Insight } from '@/types';
import { motion } from 'framer-motion';
import { SubscribeModal } from '@/components/modals/SubscribeModal';

interface InsightsSectionProps {
  insights: Insight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user navigated directly to blog section via hash
    const checkHashAndOpenModal = () => {
      if (window.location.hash === '#blog' && !hasTriggered) {
        // Scroll to the section first
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // Open modal after a short delay to ensure scrolling completes
        setTimeout(() => {
          setIsModalOpen(true);
          setHasTriggered(true);
        }, 300);
      }
    };

    // Multiple checks to ensure we catch the hash navigation from different pages
    const timeoutId1 = setTimeout(() => {
      checkHashAndOpenModal();
    }, 100);

    const timeoutId2 = setTimeout(() => {
      checkHashAndOpenModal();
    }, 500);

    const timeoutId3 = setTimeout(() => {
      checkHashAndOpenModal();
    }, 1000);

    // Listen for hash changes
    window.addEventListener('hashchange', checkHashAndOpenModal);

    // Also listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', checkHashAndOpenModal);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered && window.location.hash !== '#blog') {
            setIsModalOpen(true);
            setHasTriggered(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before fully in view
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener('hashchange', checkHashAndOpenModal);
      window.removeEventListener('popstate', checkHashAndOpenModal);
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasTriggered]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="blog" ref={sectionRef} className="relative scroll-mt-32">
      <Section className="m-4 mb-[3.75rem] rounded-[0.5rem] bg-background dark:bg-text">
        <Container>
          <Box direction="col" className="space-y-8">
            <div className="flex items-center justify-between text-text dark:text-maticblack">
              <h2 className="dark:text-maticblack">From the Blog</h2>
              <Link href="/insights" className="group flex items-center gap-2">
                <p>All entries</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4 text-text transition-transform group-hover:translate-x-1 dark:text-maticblack" />
                </motion.div>
              </Link>
            </div>
            <InsightsGrid
              variant="recent"
              initialInsights={insights}
              className="text-text dark:text-maticblack"
            />
          </Box>
        </Container>
      </Section>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
}
