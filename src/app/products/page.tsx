import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  Cpu,
  Home,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { getAllProducts } from '@/lib/content';
import { breadcrumbJsonLd, pageMetadata, productListJsonLd } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CtaButton } from '@/components/shared/CtaButton';
import type { Product } from '@/lib/content-schemas';

export const metadata: Metadata = pageMetadata({
  title: 'Products — Starter, Family, Commercial',
  description:
    'Three solar packages, one Neura platform. Starter from KSh 137,000 (or KSh 5,472/month on the Precifarm 24-month plan), Family from KSh 373,000, Commercial bespoke-quoted for irrigation (5–45 acres), cold storage, clinics, and SME sites. Optional bank financing partners.',
  path: '/products/',
});

const order: ReadonlyArray<Product['slug']> = ['starter', 'family', 'business'];

type ProductAccent = {
  glyph: LucideIcon;
  tier: string;
  sizing: string;
  image: string;
  imageAlt: string;
  bg: string;
  highlights: ReadonlyArray<string>;
  featured?: { label: string };
};

const accent: Record<Product['slug'], ProductAccent> = {
  starter: {
    glyph: Lightbulb,
    tier: 'Single room or small dwelling',
    sizing: '550 W · 1.5 kWh',
    image: '/images/products/precifarm-starter-home.png',
    imageAlt:
      'A Kenyan home at dusk with a single roof-mounted solar panel and a wall-mounted inverter.',
    bg: 'bg-starter/15',
    highlights: [
      'Lights, Wi-Fi, TV, fan, and phone charging — about 0.6 kWh/day',
      'Neura Pod 1 installed in one day by an EPRA-licensed technician',
      'Pay monthly: KSh 27,400 deposit, then KSh 5,472 over 24 months',
    ],
  },
  family: {
    glyph: Home,
    tier: 'Off-grid 2- to 3-bedroom home',
    sizing: '2.2 kWp · 5 kWh',
    image: '/images/products/precifarm-family-home.png',
    imageAlt:
      'A Kenyan family home at golden hour with a 4-panel rooftop solar array and the Neura Pod inverter and battery wall-mounted under the eave.',
    bg: 'bg-family/15',
    highlights: [
      'Fridge, TV, Wi-Fi, fans, full lighting — about 4 kWh/day',
      'Neura Pod 5 expandable — stack more battery as the household grows',
      'Cash KSh 373,000 · customer-arranged bank financing optional',
    ],
    featured: { label: 'Most popular' },
  },
  business: {
    glyph: Building2,
    tier: 'Commercial / institutional',
    sizing: '13.2 kWp · 15 kWh',
    image: '/images/products/precifarm-business-site.png',
    imageAlt:
      'A Precifarm Commercial site with rooftop solar panels and a battery enclosure powering 24/7 operations with no downtime.',
    bg: 'bg-business/15',
    highlights: [
      'Borehole irrigation up to 3 km from source · 5–45 acres of farmland',
      'Cold storage, milling, clinics, lodges, SMEs — about 28 kWh/day',
      'Bespoke quote sized to your site · KCB / Stanbic financing optional',
    ],
  },
};

const trustChips: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: ShieldCheck, label: 'EPRA-licensed installation' },
  { icon: Cpu, label: 'Neura AI on every system' },
  { icon: ClipboardCheck, label: 'Written design before you commit' },
  { icon: Check, label: 'One-year workmanship warranty' },
];

export default async function ProductsIndexPage(): Promise<React.ReactElement> {
  const products = await getAllProducts();
  const ordered = order
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products/' },
      ]),
      productListJsonLd(
        ordered.map((p) => ({
          name: p.name,
          slug: p.slug,
          description: p.seo.description,
        })),
      ),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <section className="from-surface-muted to-surface bg-linear-to-b">
        <div className="container-page section">
          <SectionHeader
            eyebrow="Products"
            heading="Three systems, one platform."
            intro="Same engineers, same software, same service. Pick the size that fits."
          />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustChips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm">
                <Icon aria-hidden="true" className="text-brand h-4 w-4 shrink-0" />
                <span className="text-ink-muted">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page section">
        <div className="grid gap-8 md:grid-cols-3">
          {ordered.map((product) => (
            <ProductCard key={product.slug} product={product} accent={accent[product.slug]} />
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            eyebrow="Compare"
            heading="Side by side"
            intro="Capacity, components, and support tier across the three packages."
          />
          <div className="border-line mt-10 overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Compare Precifarm products by capacity and use</caption>
              <thead>
                <tr className="border-line border-b">
                  <th
                    scope="col"
                    className="text-ink-muted px-4 py-4 text-xs font-semibold uppercase tracking-wider"
                  >
                    What you compare
                  </th>
                  {ordered.map((p) => {
                    const a = accent[p.slug];
                    const Glyph = a.glyph;
                    const isFeatured = Boolean(a.featured);
                    return (
                      <th
                        key={p.slug}
                        scope="col"
                        className={`px-4 py-4 ${isFeatured ? 'bg-brand/5' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <Glyph aria-hidden="true" className="text-brand h-4 w-4" />
                          <span className="text-ink font-medium">{p.name}</span>
                          {isFeatured && (
                            <span className="bg-brand inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                              <Sparkles aria-hidden="true" className="h-3 w-3" />
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-ink-muted mt-1 text-xs font-normal">{a.tier}</p>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-line divide-y">
                <CompareRow
                  ordered={ordered}
                  label="Capacity"
                  cells={ordered.map((p) => accent[p.slug].sizing)}
                />
                <CompareRow
                  ordered={ordered}
                  label="Best for"
                  cells={ordered.map((p) => p.forWhom[0])}
                />
                <CompareRow
                  ordered={ordered}
                  label="Daily load"
                  cells={['~0.6 kWh/day', '~4 kWh/day', '~28 kWh/day']}
                />
                <CompareRow
                  ordered={ordered}
                  label="Neura Pod"
                  cells={[
                    'Neura Pod 1 — 1.5 kWh',
                    'Neura Pod 5 — 5 kWh',
                    'Neura Pod 15 — 15 kWh',
                  ]}
                />
                <CompareRow
                  ordered={ordered}
                  label="Inverter"
                  cells={['1.5 kW hybrid', '3 kW hybrid', '12 kW hybrid (Deye)']}
                />
                <CompareRow
                  ordered={ordered}
                  label="Panels"
                  cells={['1 × 550 W', '4 × 550 W (2.2 kWp)', '24 × 550 W (13.2 kWp)']}
                />
                <CompareRow
                  ordered={ordered}
                  label="Smart monitoring"
                  cells={[
                    'Neura AI alerts',
                    'Neura Smart Energy Manager',
                    'Neura Business Dashboard',
                  ]}
                />
                <CompareRow
                  ordered={ordered}
                  label="Support tier"
                  cells={['Standard', 'Standard', 'Priority, on-site']}
                />
                <CompareRow
                  ordered={ordered}
                  label="Starting price"
                  emphasize
                  cells={[
                    'KSh 137,000 cash · KSh 5,472/mo',
                    'KSh 373,000 cash',
                    'Bespoke — contact us',
                  ]}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="border-line bg-surface-panel relative overflow-hidden rounded-2xl border p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-brand text-sm font-semibold uppercase tracking-wider">
                Still deciding?
              </p>
              <h2 className="font-display mt-3 max-w-2xl text-2xl md:text-3xl">
                Tell us about the room, the home, or the building.
              </h2>
              <p className="text-ink-muted mt-3 max-w-xl">
                We will reply with a sized recommendation and a written quote within two business
                days — no commitment, no pressure.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="text-brand h-4 w-4" />
                  <span className="text-ink-muted">Free site assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="text-brand h-4 w-4" />
                  <span className="text-ink-muted">Written design and pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="text-brand h-4 w-4" />
                  <span className="text-ink-muted">Two-business-day reply</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <CtaButton href="/contact">Get a quote</CtaButton>
              <CtaButton href="mailto:sales@precifarm.com" variant="secondary">
                Email sales@precifarm.com
              </CtaButton>
              <a
                href="https://wa.me/254794702768"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink inline-flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 text-[#25D366]" />
                Or chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({
  product,
  accent: a,
}: {
  product: Product;
  accent: ProductAccent;
}): React.ReactElement {
  const Glyph = a.glyph;
  const cashPrice = product.pricing.find((p) => /cash/i.test(p.label)) ?? product.pricing[0];
  const monthlyPrice = product.pricing.find((p) => /month/i.test(p.label));
  const featured = Boolean(a.featured);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        featured
          ? 'border-brand/40 shadow-lg ring-brand/20 ring-1 md:-translate-y-2'
          : 'border-line hover:-translate-y-1 hover:shadow-md'
      }`}
    >
      {a.featured && (
        <div className="bg-brand text-white">
          <p className="container-page flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            {a.featured.label}
          </p>
        </div>
      )}

      <div className={`relative aspect-[4/3] w-full overflow-hidden ${a.bg}`}>
        <Image
          src={a.image}
          alt={a.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <Glyph className="text-ink h-4 w-4" aria-hidden="true" />
          <span className="text-ink text-xs font-medium">{a.tier}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-brand text-xs font-semibold uppercase tracking-wider">{a.sizing}</p>
        <h2 className="font-display mt-2 text-2xl font-medium">{product.name}</h2>
        <p className="text-ink mt-2 font-medium">{product.tagline}</p>

        <div className="border-line mt-5 rounded-lg border bg-surface-muted/50 p-4">
          <p className="text-ink-muted text-xs uppercase tracking-wider">From</p>
          <p className="text-ink font-display mt-1 text-2xl font-medium">
            {cashPrice?.value ?? 'On request'}
          </p>
          {monthlyPrice && (
            <p className="text-ink-muted mt-1 text-xs">
              or <span className="text-brand font-medium">{monthlyPrice.value}</span>
            </p>
          )}
        </div>

        <ul className="mt-5 space-y-2.5">
          {a.highlights.map((highlight) => (
            <li key={highlight} className="text-ink-muted flex items-start gap-2.5 text-sm leading-relaxed">
              <Check aria-hidden="true" className="text-brand mt-0.5 h-4 w-4 shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Link
            href={`/products/${product.slug}/`}
            className="bg-brand hover:bg-brand-strong inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            See {product.name}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <p className="text-ink-subtle mt-3 text-center text-xs">
            EPRA-licensed install · 1-year workmanship warranty
          </p>
        </div>
      </div>
    </article>
  );
}

function CompareRow({
  ordered,
  label,
  cells,
  emphasize,
}: {
  ordered: ReadonlyArray<Product>;
  label: string;
  cells: ReadonlyArray<string>;
  emphasize?: boolean;
}): React.ReactElement {
  return (
    <tr>
      <th scope="row" className="text-ink px-4 py-3 font-medium align-top">
        {label}
      </th>
      {ordered.map((p, i) => {
        const isFeatured = Boolean(accent[p.slug].featured);
        return (
          <td
            key={p.slug}
            className={`px-4 py-3 align-top ${isFeatured ? 'bg-brand/5' : ''} ${
              emphasize ? 'text-ink font-display text-base font-medium' : 'text-ink-muted'
            }`}
          >
            {cells[i]}
          </td>
        );
      })}
    </tr>
  );
}
