import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CloudSun,
  Gauge,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CtaButton } from '@/components/shared/CtaButton';

export const metadata: Metadata = pageMetadata({
  title: 'How we size every Precifarm system',
  description:
    'Honest engineering rules — 4.5 peak sun hours, 0.75 derate, one-day battery refill. The math made visible for Starter, Family, and Commercial.',
  path: '/how-we-size/',
});

const rules: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: CloudSun,
    title: 'Honest irradiance',
    body: 'We design at 4.5 peak sun hours per day — the worst-case rainy season for Nairobi and Mwingi, not the marketing-brochure best case. If your system works in July, it works in January.',
  },
  {
    icon: Gauge,
    title: 'Real-world derating',
    body: 'Panel output is multiplied by 0.75 to account for high-temperature efficiency loss, wiring losses, inverter efficiency, dust accumulation, and module aging — the numbers you actually get on a Kenyan roof.',
  },
  {
    icon: Sun,
    title: 'One-day battery refill',
    body: 'Panels must generate enough to fully recharge a drained battery in one good solar day while still serving the daily load. No undersizing to win on price; no week-long brownouts after a cloudy stretch.',
  },
];

const sizingMath = [
  { label: 'Starter', dailyPv: '1.86 kWh', battery: '1.2 kWh', load: '0.6 kWh', refill: '~1.0 day' },
  { label: 'Family', dailyPv: '7.43 kWh', battery: '4.0 kWh', load: '4.0 kWh', refill: '~1.2 days' },
  { label: 'Commercial', dailyPv: '44.6 kWh', battery: '12 kWh', load: '28 kWh', refill: '~0.7 days' },
];

const componentCosts = [
  { component: '550 W mono panel', spec: 'Jinko / JA Solar / Canadian Solar tier', cost: 'KSh 22,000' },
  { component: '1.5 kW hybrid inverter', spec: 'MPPT + battery charger built in', cost: 'KSh 32,000' },
  { component: '3 kW hybrid inverter', spec: 'Growatt or equivalent', cost: 'KSh 58,000' },
  { component: '12 kW hybrid inverter', spec: 'Deye or similar, commercial grade', cost: 'KSh 210,000' },
  { component: '1.5 kWh LiFePO4 module', spec: 'with integrated BMS', cost: 'KSh 32,000' },
  { component: '5 kWh LiFePO4 module', spec: 'Dyness / MUST tier', cost: 'KSh 98,000' },
  { component: '15 kWh storage', spec: '3 × 5 kWh LiFePO4 stack', cost: 'KSh 290,000' },
];

export default function HowWeSizePage(): React.ReactElement {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'How we size', path: '/how-we-size/' },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="from-surface-muted to-surface bg-linear-to-b">
        <div className="container-page section">
          <p className="text-brand text-sm font-semibold tracking-wider uppercase">
            How we size systems
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-balance">
            Most Kenyan solar installations disappoint because they are sized to win on price.
          </h1>
          <p className="text-ink-muted mt-5 max-w-2xl text-lg">
            Customers experience brownouts during cloudy weeks and blame the battery — but the real
            problem is undersized panels relative to battery capacity. Precifarm engineers around
            three sizing rules, and we will show you the numbers for your specific install.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/contact">Get a written design</CtaButton>
            <CtaButton href="/products" variant="secondary">
              See the packages
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <SectionHeader
          eyebrow="The three rules"
          heading="What we will not compromise on, ever."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rules.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-line bg-surface rounded-xl border p-6">
              <span className="bg-brand/10 text-brand inline-flex h-11 w-11 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-ink mt-5 text-lg font-medium">{title}</h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            eyebrow="The math, made visible"
            heading="One 550 W panel = 1.86 kWh per day, worst case."
            intro="That is 4.5 PSH × 550 W × 0.75 derate. Every Precifarm package is built around this number — and you can verify our sizing logic against any other supplier in the market."
          />
          <div className="border-line bg-surface mt-10 overflow-hidden rounded-xl border shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted/40 border-line border-b">
                <tr>
                  <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Package
                  </th>
                  <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Daily PV gen.
                  </th>
                  <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Usable battery
                  </th>
                  <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Daily load
                  </th>
                  <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Recharge time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-line divide-y">
                {sizingMath.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="text-ink px-4 py-4 font-medium">
                      {row.label}
                    </th>
                    <td className="text-ink-muted px-4 py-4 tabular-nums">{row.dailyPv}</td>
                    <td className="text-ink-muted px-4 py-4 tabular-nums">{row.battery}</td>
                    <td className="text-ink-muted px-4 py-4 tabular-nums">{row.load}</td>
                    <td className="text-ink-muted px-4 py-4 tabular-nums">{row.refill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-subtle mt-4 text-sm">
            Every package recharges fully within ~1 day of solar production. Even after a 5-day
            cloudy stretch, a Precifarm system catches up faster than competitors.
          </p>
        </div>
      </section>

      <section className="container-page section">
        <SectionHeader
          eyebrow="Component cost basis (Kenya, May 2026)"
          heading="Built bottom-up. No retail mark-ups."
          intro="All pricing is built bottom-up from current verified Kenyan market data. Precifarm uses wholesale and direct-import sourcing where possible, passing the savings through rather than retail mark-ups."
        />
        <div className="border-line mt-10 overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted/40 border-line border-b">
              <tr>
                <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                  Component
                </th>
                <th className="text-ink-muted px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                  Specification
                </th>
                <th className="text-ink-muted px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-line divide-y">
              {componentCosts.map((row) => (
                <tr key={row.component}>
                  <th scope="row" className="text-ink px-4 py-3 font-medium">
                    {row.component}
                  </th>
                  <td className="text-ink-muted px-4 py-3">{row.spec}</td>
                  <td className="text-ink px-4 py-3 text-right font-medium tabular-nums">
                    {row.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-line bg-brand/5 border-brand/20 mt-8 rounded-xl border p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck aria-hidden="true" className="text-brand mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="font-display text-ink text-base font-medium">Pricing methodology</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                Each package is built bottom-up: <span className="text-ink font-medium">panels +
                inverter + battery + mounting/BoS + installation = subtotal</span>. An{' '}
                <span className="text-ink font-medium">8% integration premium</span> reflects the
                value of the assembled Neura Pod single-enclosure unit (faster install, fewer
                warranty interfaces, neater customer outcome). A{' '}
                <span className="text-ink font-medium">20% markup</span> is applied to landed cost
                to arrive at the final selling price. No hidden lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="border-line bg-surface-panel rounded-2xl border p-8 md:p-12">
          <h2 className="font-display max-w-2xl text-2xl md:text-3xl">
            Want the numbers for your specific install?
          </h2>
          <p className="text-ink-muted mt-3 max-w-xl">
            Tell us about your loads — appliances, hours of use, peak demands. We will reply with a
            written design and a sized recommendation within two business days.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/contact">Get a written design</CtaButton>
            <Link
              href="/financing"
              className="text-brand hover:text-brand-strong inline-flex items-center gap-1 self-center text-sm font-semibold transition-colors"
            >
              See financing options
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
