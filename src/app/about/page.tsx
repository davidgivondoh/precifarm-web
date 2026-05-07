import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Activity,
  ArrowRight,
  Coins,
  Cpu,
  HardHat,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { getSitePage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getSitePage('about');
  return pageMetadata({
    title: frontmatter.seo?.title ?? frontmatter.title,
    description: frontmatter.seo?.description ?? frontmatter.description,
    path: '/about/',
  });
}

const stats: ReadonlyArray<{ value: string; label: string }> = [
  { value: '2024', label: 'Founded' },
  { value: '6', label: 'Cities served' },
  { value: '100%', label: 'Built in Kenya' },
  { value: '0', label: 'Outside investors' },
];

const cities: ReadonlyArray<{ name: string; role?: string }> = [
  { name: 'Nairobi', role: 'HQ' },
  { name: 'Mombasa' },
  { name: 'Kisumu' },
  { name: 'Eldoret' },
  { name: 'Kitui' },
  { name: 'Nakuru' },
];

const principles: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: ShieldCheck,
    title: 'We stay after the install.',
    body: 'Solar should not be transactional. The team that designs your system is the team that services it for life — not a subcontractor we never see again.',
  },
  {
    icon: Activity,
    title: 'Software watches every system.',
    body: 'PreciSense reports voltage, current, and battery health every minute. We see drift before you see darkness, and our crews show up with the right part already in hand.',
  },
  {
    icon: Coins,
    title: 'We grow on revenue, not capital.',
    body: 'No outside investors. No five-year plan that depends on someone else writing a cheque. We answer to the customers who pay our bills — that is it.',
  },
];

const sectors: ReadonlyArray<string> = [
  'Schools',
  'Clinics',
  'Small businesses',
  'Households',
  'Cooperatives',
  'Renters',
];

const headingIcons: Record<string, LucideIcon> = {
  'three tiers, one unified platform': Layers,
  'software that watches': Cpu,
  'field engineers, not subcontractors': HardHat,
  'how we are growing': TrendingUp,
};

const pullQuote =
  'Critical energy infrastructure demands lifelong accountability.';

export default async function AboutPage(): Promise<React.ReactElement> {
  const { frontmatter, body } = await getSitePage('about');
  const blocks = parseSimpleMarkdown(body);

  return (
    <>
      {frontmatter.heroImage && frontmatter.heroImageAlt && (
        <section className="from-surface-muted to-surface bg-linear-to-b">
          <div className="container-page section">
            <p className="text-brand text-sm font-semibold tracking-wider uppercase">About</p>
            <h1 className="font-display mt-4 max-w-3xl text-balance">{frontmatter.title}</h1>
            <p className="text-ink-muted mt-5 max-w-2xl text-lg">{frontmatter.description}</p>

            <dl className="border-line mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-ink-muted text-xs uppercase tracking-wider">{stat.label}</dt>
                  <dd className="font-display text-ink mt-1 text-2xl font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={frontmatter.heroImage}
                alt={frontmatter.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="border-line border-y bg-white">
        <div className="container-page py-10 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="md:max-w-xs">
              <p className="text-brand text-xs font-semibold uppercase tracking-wider">
                On the ground in
              </p>
              <h2 className="font-display text-ink mt-2 text-xl font-medium">
                Six cities, one team.
              </h2>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                Field engineers who live where they work — same crew designs, installs, and
                services your system.
              </p>
            </div>
            <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {cities.map((city) => (
                <li
                  key={city.name}
                  className="border-line bg-surface-muted/60 hover:border-brand/40 hover:bg-brand/5 group relative flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors"
                >
                  <MapPin
                    aria-hidden="true"
                    className="text-brand h-4 w-4 shrink-0"
                  />
                  <span className="text-ink text-sm font-medium">{city.name}</span>
                  {city.role && (
                    <span className="bg-brand ml-auto inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {city.role}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="max-w-2xl">
          <p className="text-brand text-sm font-semibold tracking-wider uppercase">
            What we believe
          </p>
          <h2 className="font-display mt-3 text-2xl font-medium md:text-3xl">
            Three things we will not compromise on.
          </h2>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="border-line bg-surface group rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-md"
            >
              <span className="bg-brand/10 text-brand inline-flex h-11 w-11 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-ink mt-5 text-lg font-medium">{title}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <article className="container-page section pt-0">
        <div className="mx-auto max-w-2xl space-y-6">
          <PullQuote text={pullQuote} />

          {blocks.map((block, i) => {
            if (block.type === 'h2') {
              const Icon = headingIcons[block.text.trim().toLowerCase()];
              return (
                <h2
                  key={i}
                  className="font-display text-ink mt-14 flex items-center gap-3 text-2xl font-medium first:mt-0"
                >
                  {Icon && (
                    <span className="bg-brand/10 text-brand inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  )}
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className="my-10">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="(min-width: 768px) 672px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {block.alt && (
                    <figcaption className="text-ink-subtle mt-3 text-center text-xs">
                      {block.alt}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return (
              <p key={i} className="text-ink-muted text-base leading-relaxed md:text-lg">
                {renderInline(block.text)}
              </p>
            );
          })}
        </div>

        <div className="bg-surface-muted mx-auto mt-12 max-w-3xl rounded-2xl px-8 py-8">
          <p className="text-brand text-xs font-semibold uppercase tracking-wider">
            Trusted to power
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="border-line bg-surface inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-line bg-surface-panel mx-auto mt-8 max-w-3xl rounded-2xl border p-8 md:p-10">
          <h2 className="font-display text-2xl font-medium md:text-3xl">
            Built and run by people you can call.
          </h2>
          <p className="text-ink-muted mt-3 max-w-xl">
            No tickets, no autoresponders. Real engineers on a real phone line and a real WhatsApp thread.
          </p>

          <ul className="border-line mt-6 grid gap-3 border-y py-5 sm:grid-cols-3">
            <li>
              <a
                href="mailto:sales@precifarm.com"
                className="text-ink-muted hover:text-ink group flex items-start gap-3 transition-colors"
              >
                <span className="bg-brand/10 text-brand inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg group-hover:bg-brand group-hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-ink-subtle text-[11px] font-semibold uppercase tracking-wider">
                    Email
                  </span>
                  <span className="text-ink mt-0.5 text-sm font-medium">sales@precifarm.com</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="tel:+254794702768"
                className="text-ink-muted hover:text-ink group flex items-start gap-3 transition-colors"
              >
                <span className="bg-brand/10 text-brand inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg group-hover:bg-brand group-hover:text-white">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-ink-subtle text-[11px] font-semibold uppercase tracking-wider">
                    Call
                  </span>
                  <span className="text-ink mt-0.5 text-sm font-medium tabular-nums">
                    +254 794 702 768
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/254794702768"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-ink-subtle text-[11px] font-semibold uppercase tracking-wider">
                    WhatsApp
                  </span>
                  <span className="text-ink mt-0.5 text-sm font-medium">Chat with us</span>
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-strong inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Talk to us
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/careers"
              className="border-line hover:bg-surface-muted inline-flex min-h-[44px] items-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Join the team
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function PullQuote({ text }: { text: string }): React.ReactElement {
  return (
    <figure className="border-brand bg-brand/5 relative my-2 rounded-r-xl border-l-4 p-6 md:p-8">
      <Quote
        aria-hidden="true"
        className="text-brand/30 absolute right-4 top-4 h-8 w-8 rotate-180"
      />
      <blockquote className="font-display text-ink relative pr-10 text-xl font-medium leading-snug md:text-2xl">
        {text}
      </blockquote>
      <figcaption className="text-ink-muted mt-3 text-xs uppercase tracking-wider">
        Our operating principle
      </figcaption>
    </figure>
  );
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'image'; src: string; alt: string };

function parseSimpleMarkdown(body: string): Block[] {
  return body
    .trim()
    .split(/\n\n+/)
    .map((para): Block => {
      const trimmed = para.trim();
      if (trimmed.startsWith('## ')) {
        return { type: 'h2', text: trimmed.slice(3).trim() };
      }
      const imageMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(trimmed);
      if (imageMatch) {
        return { type: 'image', alt: imageMatch[1] ?? '', src: imageMatch[2] ?? '' };
      }
      return { type: 'p', text: trimmed };
    });
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const label = match[1] ?? '';
    const href = match[2] ?? '#';
    parts.push(
      <Link key={key++} href={href} className="text-brand hover:underline">
        {label}
      </Link>,
    );
    lastIndex = linkRe.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
