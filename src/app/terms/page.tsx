import DefaultHero from '@/components/global/DefaultHero';
import { Container, Prose, Section } from '@/components/global/matic-ds';
import { ScrollProgress } from '@/components/global/ScrollProgress';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <ScrollProgress
        breakpoints={[
          {
            percentage: 0,
            theme: 'light'
          },
        ]}
      />
      <DefaultHero
        heading="Terms"
        subheading="This Privacy Policy describes how your personal information is collected, used, and shared."
      />
      <Section>
        <Container>
          <Prose>
            <h2 className="">Personal information</h2>
            <p className="">
              When you visit the Site, we automatically collect certain information about your
              device, including information about your web browser, IP address, time zone, and some
              of the cookies that are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages that you view, what
              websites or search terms referred you to the Site, and information about how you
              interact with the Site. We refer to this automatically-collected information as
              “Device Information.”
            </p>
            <p className="">We collect Device Information using the following technologies:</p>
            <div className="">
              “Cookies” are data files that are placed on your device or computer and often include
              an anonymous unique identifier. For more information about cookies, and how to disable
              cookies, visit{' '}
              <Link href="http://www.allaboutcookies.org" className="hover:text-blue transition-colors">http://www.allaboutcookies.org</Link>.
            </div>
            <p className="">
              {' '}
              “Log files” track actions occurring on the Site, and collect data including your IP
              address, browser type, Internet service provider, referring/exit pages, and date/time
              stamps.{' '}
            </p>
            <p className="">
              “Web beacons,” “tags,” and “pixels” are electronic files used to record information
              about how you browse the Site.
            </p>
            <p className="">
              When we talk about “Personal Information” in this Privacy Policy, we are talking both
              about Device Information and Order Information.
            </p>
            <h2 className="">How do we use your personal information?</h2>
            <p className="">
              We use the Device Information that we collect to help us screen for potential risk and
              fraud (in particular, your IP address), and more generally to improve and optimize our
              Site (for example, by generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and advertising campaigns).
            </p>
            <h2 className="">Sharing your personal information</h2>
            <p className="">
              We use the Device Information that we collect to help us screen for potential risk and
              fraud (in particular, your IP address), and more generally to improve and optimize our
              Site (for example, by generating analytics about how our customers browse and interact
              with the Site, and to assess the success of our marketing and advertising campaigns).
            </p>
            <div className="">
              Personal Information here: <Link href="https://www.google.com/intl/en/policies/privacy/" className="hover:text-blue transition-colors">https://www.google.com/intl/en/policies/privacy/</Link>. You can also opt-out of Google Analytics here: <Link href="https://tools.google.com/dlpage/gaoptout" className="hover:text-blue transition-colors">https://tools.google.com/dlpage/gaoptout</Link>.
            </div>

            <p className="">Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

            <h2 className="">Do not track</h2>
            <p className="">Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>

            <h2 className="">Your rights</h2>
            <p className="">If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

            <h2 className="">Data Retention</h2>
            <p className="">When you visit our Site, we will maintain your information for our records unless and until you ask us to delete this information.</p>

            <h2 className="">Changes</h2>
            <p className="">We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>

            <h2 className="">Contact us</h2>
            <div className="">For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <Link href="mailto:hello@maticdigital.com" className="hover:text-blue transition-colors">hello@maticdigital.com</Link> or by mail using the details provided below:</div>
            <p className="">3457 Ringsby Ct, 205 Denver, CO 80216</p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
