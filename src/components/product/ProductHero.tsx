import Image from 'next/image';
import type { Product } from '@/lib/content-schemas';
import { CtaButton } from '@/components/shared/CtaButton';
import {
  Building2,
  Clock,
  Cpu,
  Home,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Accent = {
  panel: string;
  halo: string;
  tone: string;
  glyph: LucideIcon;
  title: string;
  photo?: { src: string; alt: string };
};

const accent: Record<Product['slug'], Accent> = {
  starter: {
    panel: 'from-starter/40 to-starter/10',
    halo: 'bg-starter/30',
    tone: '#F4D77E',
    glyph: Lightbulb,
    title: 'Home & small business',
    photo: {
      src: '/images/products/precifarm-starter-home.png',
      alt: 'A Kenyan home at dusk with a single roof-mounted solar panel and a wall-mounted inverter.',
    },
  },
  family: {
    panel: 'from-family/40 to-family/10',
    halo: 'bg-family/30',
    tone: '#5BA3D4',
    glyph: Home,
    title: 'Off-grid 2- to 3-bedroom home',
    photo: {
      src: '/images/products/precifarm-family-home.png',
      alt: 'A Kenyan family home at golden hour with a 4-panel rooftop solar array and the Neura Pod inverter and battery wall-mounted under the eave.',
    },
  },
  business: {
    panel: 'from-business/40 to-business/10',
    halo: 'bg-business/30',
    tone: '#4ADE80',
    glyph: Building2,
    title: 'Commercial / institutional',
    photo: {
      src: '/images/products/precifarm-business-site.png',
      alt: 'A Precifarm Commercial site with rooftop solar panels and a battery enclosure powering 24/7 operations with no downtime.',
    },
  },
};

const heroFacts: Record<Product['slug'], ReadonlyArray<{ icon: LucideIcon; label: string }>> = {
  starter: [
    { icon: Zap, label: '550 W panel · Neura Pod 1' },
    { icon: Clock, label: 'One-day install' },
    { icon: Cpu, label: 'Neura AI alerts' },
    { icon: ShieldCheck, label: '1-year workmanship warranty' },
  ],
  family: [
    { icon: Zap, label: '2.2 kWp · Neura Pod 5 · 3 kW inverter' },
    { icon: Clock, label: 'Off-grid for ~4 kWh/day' },
    { icon: Cpu, label: 'Neura Smart Energy Manager' },
    { icon: ShieldCheck, label: 'Surge + lightning protection' },
  ],
  business: [
    { icon: Zap, label: '13.2 kWp · Neura Pod 15 · 12 kW inverter' },
    { icon: Clock, label: '24/7 for ~28 kWh/day' },
    { icon: Cpu, label: 'Neura Business Dashboard' },
    { icon: ShieldCheck, label: 'Priority on-site support' },
  ],
};

function looksLikePrice(value: string | undefined): boolean {
  return Boolean(value && /KSh|\d{2,}/.test(value));
}

export function ProductHero({ product }: { product: Product }): React.ReactElement {
  const a = accent[product.slug];
  const Glyph = a.glyph;
  const facts = heroFacts[product.slug];
  const startingPrice = product.pricing.find((p) => /cash/i.test(p.label)) ?? product.pricing[0];
  const monthlyPrice = product.pricing.find((p) => /month/i.test(p.label));

  return (
    <section className="bg-surface-muted relative overflow-hidden">
      <div
        aria-hidden="true"
        className={`absolute -top-40 -right-40 hidden h-[28rem] w-[28rem] rounded-full blur-3xl md:block ${a.halo}`}
      />

      <div className="container-page section relative grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-linear-to-br shadow-lg ${a.panel}`}
          >
            {a.photo ? (
              <Image
                src={a.photo.src}
                alt={a.photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 480 360"
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="380" cy="80" r="36" fill={a.tone} opacity="0.7" />
                <g transform="translate(80 140) rotate(-8)">
                  <rect width="280" height="160" rx="6" fill="#1F4E5F" />
                  <g stroke="#5BA3D4" strokeWidth="1.2" opacity="0.45">
                    <line x1="70" y1="0" x2="70" y2="160" />
                    <line x1="140" y1="0" x2="140" y2="160" />
                    <line x1="210" y1="0" x2="210" y2="160" />
                    <line x1="0" y1="53" x2="280" y2="53" />
                    <line x1="0" y1="107" x2="280" y2="107" />
                  </g>
                </g>
              </svg>
            )}
            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 backdrop-blur-sm">
              <Glyph className="text-ink h-4 w-4" aria-hidden="true" />
              <span className="text-ink text-xs font-medium">{a.title}</span>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-brand text-sm font-semibold tracking-wider uppercase">
              {product.name}
            </p>
            {product.slug === 'family' && (
              <span className="bg-brand inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                <Sparkles aria-hidden="true" className="h-3 w-3" />
                Most popular
              </span>
            )}
          </div>
          <h1 className="font-display mt-4 text-balance">{product.headline}</h1>
          <p className="text-ink mt-5 max-w-xl text-lg font-medium">{product.tagline}</p>

          <div className="border-line bg-surface mt-7 inline-flex items-center gap-4 rounded-lg border px-5 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="text-ink-muted text-[11px] font-semibold uppercase tracking-wider">
                {looksLikePrice(startingPrice?.value) ? 'From' : 'Pricing'}
              </span>
              <span className="font-display text-ink text-xl font-medium leading-tight md:text-2xl">
                {startingPrice?.value ?? 'On request'}
              </span>
            </div>
            {monthlyPrice && (
              <div className="border-line border-l pl-4">
                <span className="text-ink-muted text-[11px] font-semibold uppercase tracking-wider">
                  Or monthly
                </span>
                <p className="text-brand mt-0.5 font-medium leading-tight">{monthlyPrice.value}</p>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <CtaButton href="/contact">Talk to us</CtaButton>
            <CtaButton href="#pricing" variant="secondary">
              See pricing
            </CtaButton>
          </div>

          <ul className="border-line mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-6 text-sm">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="text-ink-muted flex items-center gap-2">
                <Icon aria-hidden="true" className="text-brand h-4 w-4 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
