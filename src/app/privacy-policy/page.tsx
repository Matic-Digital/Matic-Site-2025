import DefaultHero from '@/components/global/DefaultHero';
import { Container, Prose, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Matic Digital',
  description:
    'This Privacy Policy explains how Matic Digital collects, uses, and shares your personal information and your rights under GDPR and CCPA/CPRA.'
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          }
        ]}
      />
      <DefaultHero
        heading="Privacy Policy"
        subheading="This Privacy Policy explains how Matic Digital (“we,” “our,” “us”) collects, uses, and shares your personal information when you visit or interact with our website (the “Site”). We are committed to protecting your privacy and handling your data in accordance with applicable laws, including the General Data Protection Regulation (GDPR) in the EU and the California Consumer Privacy Act (CCPA/CPRA) in the US."
      />
      <Section>
        <Container>
          <Prose>
            <h2>1. Personal information we collect</h2>
            <p>When you visit the Site, we collect certain types of information, including:</p>
            <ul>
              <li>
                <strong>Device Information:</strong> details about your browser, IP address, time
                zone, and cookies stored on your device.
              </li>
              <li>
                <strong>Browsing Information:</strong> the pages you view, referral sources
                (websites or search terms), and interactions with the Site.
              </li>
              <li>
                <strong>Technical Information:</strong> log files (IP, browser type, ISP,
                referring/exit pages, timestamps), web beacons, tags, and pixels used to analyze
                behavior.
              </li>
              <li>
                <strong>Other Information You Provide:</strong> when you contact us directly (via
                forms, email, or mail).
              </li>
            </ul>
            <p>
              We collectively refer to this as “Personal Information” when it can identify or be
              linked to you.
            </p>

            <h2>2. How we use your information</h2>
            <p>We use your Personal Information to:</p>
            <ul>
              <li>Provide, operate, and improve our Site and services.</li>
              <li>Monitor for security risks, fraud, or illegal activity.</li>
              <li>
                Understand how visitors interact with our Site and evaluate marketing effectiveness.
              </li>
              <li>Communicate with you, including responding to inquiries.</li>
              <li>Deliver marketing communications and relevant advertising, where permitted.</li>
            </ul>

            <h2>3. Cookies and advertising technologies</h2>
            <p>
              When you visit or log in to our website, cookies and similar technologies may be used
              by us, our online data partners, or vendors to associate these activities with other
              personal information they or others hold about you, including associations with your
              email or home address. We (or service providers acting on our behalf) may then send
              communications and marketing to these email or home addresses.
            </p>
            <p>
              You may opt out of receiving this advertising by visiting:{' '}
              <Link
                href="https://app.retention.com/optout"
                className="transition-colors hover:text-blue"
              >
                https://app.retention.com/optout
              </Link>
              . For general information on cookies and how to disable them, visit{' '}
              <Link
                href="https://www.allaboutcookies.org"
                className="transition-colors hover:text-blue"
              >
                www.allaboutcookies.org
              </Link>
              .
            </p>

            <h2>4. Sharing your personal information</h2>
            <p>We share your Personal Information only as described below:</p>
            <ul>
              <li>
                Service providers who support our operations (e.g., analytics, hosting,
                communications).
              </li>
              <li>
                Analytics providers such as Google Analytics (learn more at{' '}
                <Link
                  href="https://policies.google.com/privacy"
                  className="transition-colors hover:text-blue"
                >
                  Google Privacy Policy
                </Link>{' '}
                and opt out at{' '}
                <Link
                  href="https://tools.google.com/dlpage/gaoptout"
                  className="transition-colors hover:text-blue"
                >
                  Google Analytics Opt-out
                </Link>
                ).
              </li>
              <li>Legal compliance: when required by law, subpoena, or to protect our rights.</li>
            </ul>
            <p>We do not sell Personal Information as defined under CCPA/CPRA.</p>

            <h2>5. Your rights</h2>
            <p>
              Depending on where you live, you may have rights regarding your Personal Information:
            </p>
            <ul>
              <li>
                <strong>EU/UK (GDPR):</strong> Right to access, correct, update, delete, restrict
                processing, and data portability.
              </li>
              <li>
                <strong>California (CCPA/CPRA):</strong> Right to know what data we collect, request
                deletion, and opt out of data sharing for targeted advertising.
              </li>
              <li>
                <strong>Other regions:</strong> Rights provided under local law.
              </li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <Link
                href="mailto:hello@maticdigital.com"
                className="transition-colors hover:text-blue"
              >
                hello@maticdigital.com
              </Link>
              .
            </p>

            <h2>6. Do Not Track</h2>
            <p>
              Our Site does not alter its data collection practices in response to Do Not Track
              signals from browsers.
            </p>

            <h2>7. Data retention</h2>
            <p>
              We retain your information only as long as necessary to fulfill the purposes described
              in this Policy, unless a longer retention period is required by law. You may request
              deletion at any time.
            </p>

            <h2>8. International transfers</h2>
            <p>
              If you are located in the EU/UK, please note that your data may be transferred outside
              your region, including to the United States, where privacy laws may differ. We
              implement safeguards such as standard contractual clauses to protect your information.
            </p>

            <h2>9. Changes</h2>
            <p>
              We may update this Privacy Policy periodically to reflect operational, legal, or
              regulatory changes. Updates will be posted on this page with a revised “Last Updated”
              date.
            </p>

            <h2>10. Contact us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy, please
              contact us:
            </p>
            <p>
              Matic Digital
              <br />
              3457 Ringsby Ct, Suite 205
              <br />
              Denver, CO 80216
              <br />
              Email:{' '}
              <Link
                href="mailto:hello@maticdigital.com"
                className="transition-colors hover:text-blue"
              >
                hello@maticdigital.com
              </Link>
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
