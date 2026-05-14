import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Home, Lightbulb } from 'lucide-react';
import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const accent: Record<
  HomePage['productCards'][number]['slug'],
  { glyph: typeof Lightbulb; image: string; imageAlt: string }
> = {
  starter: {
    glyph: Lightbulb,
    image: '/images/products/precifarm-starter-home.png',
    imageAlt: 'A Kenyan home at dusk with a roof-mounted solar panel and a wall-mounted Neura Pod.',
  },
  family: {
    glyph: Home,
    image: '/images/products/precifarm-family-home.png',
    imageAlt: 'A Kenyan family home at golden hour with a rooftop solar array and the Neura Pod wall-mounted under the eave.',
  },
  business: {
    glyph: Building2,
    image: '/images/products/precifarm-business-site.png',
    imageAlt: 'A Precifarm Commercial site with rooftop solar panels and the Neura Pod powering 24/7 operations.',
  },
};

const sizingByTier: Record<HomePage['productCards'][number]['slug'], string> = {
  starter: '550 W · 1.5 kWh',
  family: '900 W · 5 kWh',
  business: 'From 2.75 kWp · 15 kWh',
};

export function ProductCards({ cards }: { cards: HomePage['productCards'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader
        eyebrow="Meet the Neura Pod"
        heading="One Pod, three sizes."
        intro="Whether you're powering a single room, a 2-3 bedroom home, or a small commercial site, the hardware inside is the same — and one engineering team designs, installs, and services every system for the next five years."
      />
      <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-3">
        {cards.map((card) => {
          const a = accent[card.slug];
          const Glyph = a.glyph;
          return (
            <Link
              key={card.slug}
              href={`/products/${card.slug}/`}
              className="group block"
            >
              <div className="bg-surface-muted relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="text-ink-muted mt-5 flex items-center gap-2">
                <Glyph aria-hidden="true" className="text-brand h-4 w-4" />
                <span className="text-xs font-medium tracking-wider uppercase tabular-nums">
                  {sizingByTier[card.slug]}
                </span>
              </div>

              <h3 className="font-display text-ink group-hover:text-brand mt-3 text-xl font-medium transition-colors">
                {card.name}
              </h3>
              <p className="text-brand mt-1 text-sm font-semibold">{card.tagline}</p>
              <p className="text-ink-muted mt-4 text-base leading-relaxed">{card.blurb}</p>

              <p className="mt-4 text-base leading-relaxed">
                <span className="font-display text-ink font-medium">{card.price}</span>
                {card.monthly && (
                  <span className="text-ink-muted"> — {card.monthly}</span>
                )}
              </p>
              {card.financingNote && (
                <p className="text-ink-subtle mt-2 text-xs leading-snug">{card.financingNote}</p>
              )}

              <span className="text-brand mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                Learn more
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
