import Image from 'next/image';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Precifarm',
  description: 'Talk to us. We reply within two business days.',
  path: '/contact/',
});

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const whatHappensNext = [
  {
    title: 'You send a message',
    body: 'It lands in the inbox of a real person on our team. No tickets, no autoresponders.',
  },
  {
    title: 'We reply within two business days',
    body: 'For customer enquiries, we ask a few questions about your space and load. For partners and press, we route to the right person.',
  },
  {
    title: 'A scoped next step',
    body: 'A site visit, a written quote, an introduction. Whatever the next step is, we name it and own it.',
  },
] as const;

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <section className="from-surface-muted to-surface bg-linear-to-b">
        <div className="container-page section">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Contact"
                heading="Talk to us."
                intro="Customers, partners, and press use the same form. Pick the type and we route it to the right team."
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop"
                alt="Two people shaking hands in a bright office — a handshake symbolising the start of a working relationship."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <aside className="space-y-8">
            <div>
              <div className="text-brand inline-flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <Mail aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="text-ink mt-4 text-sm font-medium">Email</h2>
              <p className="mt-2 text-sm">
                <a href="mailto:sales@precifarm.com" className="text-brand hover:underline">
                  sales@precifarm.com
                </a>
              </p>
            </div>

            <div>
              <div className="text-brand inline-flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <Phone aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="text-ink mt-4 text-sm font-medium">Phone</h2>
              <p className="mt-2 text-sm">
                <a href="tel:+254794702768" className="text-brand hover:underline">
                  +254 794 702 768
                </a>
              </p>
              <p className="text-ink-muted text-sm">Mon–Fri, 8:00–17:00 EAT</p>
            </div>

            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#25D366]">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="text-ink mt-4 text-sm font-medium">WhatsApp</h2>
              <p className="mt-2 text-sm">
                <a
                  href="https://wa.me/254794702768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#1ebe5d]"
                >
                  Chat with us
                </a>
              </p>
              <p className="text-ink-muted text-sm">Replies during business hours.</p>
            </div>

            <div>
              <div className="text-brand inline-flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <Clock aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="text-ink mt-4 text-sm font-medium">Reply time</h2>
              <p className="text-ink-muted mt-2 text-sm">
                Two business days. Faster for active customers.
              </p>
            </div>
          </aside>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader heading="What happens after you send" />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whatHappensNext.map((step, i) => (
              <li key={step.title} className="border-line border-t pt-6">
                <span className="text-brand font-display text-sm tracking-wider uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-2 text-lg font-medium">{step.title}</h3>
                <p className="text-ink-muted mt-3 text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      )}
    </>
  );
}
