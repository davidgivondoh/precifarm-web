import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description: 'How Precifarm handles personal data.',
  path: '/privacy/',
});

export default function PrivacyPage(): React.ReactElement {
  return (
    <article className="container-page section">
      <SectionHeader heading="Privacy" />
      <p className="text-ink-muted mt-6 text-sm">Last updated: 3 May 2026.</p>

      <div className="text-ink prose-content mt-10 max-w-2xl space-y-6">
        <section>
          <h2 className="font-display text-xl font-medium">Who we are</h2>
          <p className="text-ink-muted mt-3">
            Precifarm is a Kenyan solar energy company headquartered in Nairobi. You can reach us at{' '}
            <a href="mailto:hello@precifarm.com" className="text-brand hover:underline">
              hello@precifarm.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-medium">What we collect</h2>
          <ul className="text-ink-muted mt-3 list-disc space-y-2 pl-6">
            <li>
              Information you give us through our contact forms: name, email, phone, organisation,
              the message you send.
            </li>
            <li>
              For active customers: the address where your system is installed, billing details, and
              telemetry from your system (voltage, current, state of charge).
            </li>
            <li>
              Anonymous traffic stats from this website via Plausible. No cookies, no
              fingerprinting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-medium">What we do with it</h2>
          <ul className="text-ink-muted mt-3 list-disc space-y-2 pl-6">
            <li>Reply to your message.</li>
            <li>Quote, install, and service your system.</li>
            <li>Predict and prevent faults.</li>
            <li>Improve our products and operations.</li>
          </ul>
          <p className="text-ink-muted mt-3">
            We do not sell your data. We do not share it with advertisers. Telemetry stays on our
            infrastructure.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-medium">Where it lives</h2>
          <p className="text-ink-muted mt-3">
            Form submissions are processed by Formspree. The website is hosted on Cloudflare Pages.
            Telemetry is stored in our own infrastructure within East Africa.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-medium">Your rights</h2>
          <p className="text-ink-muted mt-3">
            You can ask us what data we hold about you. You can ask us to correct it, export it, or
            delete it. Email{' '}
            <a href="mailto:privacy@precifarm.com" className="text-brand hover:underline">
              privacy@precifarm.com
            </a>{' '}
            and we will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-medium">Changes to this policy</h2>
          <p className="text-ink-muted mt-3">
            If we make material changes, we will update this page and note the date at the top.
          </p>
        </section>
      </div>
    </article>
  );
}
