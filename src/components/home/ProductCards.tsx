import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Home, Lightbulb } from 'lucide-react';
import type { HomePage } from '@/lib/content-schemas';

const accent: Record<
  HomePage['productCards'][number]['slug'],
  { bg: string; ring: string; dot: string; glyph: typeof Lightbulb; image: string; imageAlt: string }
> = {
  starter: {
    bg: 'bg-starter/15',
    ring: 'ring-starter/40',
    dot: 'bg-starter',
    glyph: Lightbulb,
    image: '/images/products/precifarm-starter-home.png',
    imageAlt: 'A Kenyan home at dusk with a single roof-mounted solar panel and a wall-mounted inverter.',
  },
  family: {
    bg: 'bg-family/15',
    ring: 'ring-family/40',
    dot: 'bg-family',
    glyph: Home,
    image: '/images/products/precifarm-family-home.png',
    imageAlt: 'A Kenyan family home at golden hour with a 4-panel rooftop solar array and the Neura Pod inverter and battery wall-mounted under the eave.',
  },
  business: {
    bg: 'bg-business/15',
    ring: 'ring-business/40',
    dot: 'bg-business',
    glyph: Building2,
    image: '/images/products/precifarm-business-site.png',
    imageAlt: 'A Precifarm Commercial site with rooftop solar panels and a battery enclosure powering 24/7 operations with no downtime.',
  },
};

const sizingByTier: Record<HomePage['productCards'][number]['slug'], string> = {
  starter: '550 W · 1.5 kWh',
  family: '2.2 kWp · 5 kWh',
  business: '13.2 kWp · 15 kWh',
};

export function ProductCards({ cards }: { cards: HomePage['productCards'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const a = accent[card.slug];
          const Glyph = a.glyph;
          return (
            <Link
              key={card.slug}
              href={`/products/${card.slug}/`}
              className="border-line group hover:border-brand/30 relative flex flex-col overflow-hidden rounded-2xl border bg-surface transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`relative aspect-4/3 w-full overflow-hidden ${a.bg}`}>
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <Glyph aria-hidden="true" className="text-ink h-4 w-4" />
                  <span className="text-ink text-xs font-medium tracking-wider uppercase tabular-nums">
                    {sizingByTier[card.slug]}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-ink text-xl font-medium">{card.name}</h3>
                <p className="text-brand mt-1 text-sm font-semibold">{card.tagline}</p>
                <p className="text-ink-muted mt-4 text-sm leading-relaxed">{card.blurb}</p>

                <div className="border-line mt-5 rounded-lg border bg-surface-muted/40 p-4">
                  <p className="text-ink-muted text-[11px] font-semibold uppercase tracking-wider">
                    Price
                  </p>
                  <p className="font-display text-ink mt-1 text-xl font-medium">{card.price}</p>
                  {card.monthly && (
                    <p className="text-brand mt-1 text-xs font-medium">{card.monthly}</p>
                  )}
                  {card.financingNote && (
                    <p className="text-ink-subtle mt-2 text-xs leading-snug">
                      {card.financingNote}
                    </p>
                  )}
                </div>

                <span className="text-brand mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                  Learn more
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
