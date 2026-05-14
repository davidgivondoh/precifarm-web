import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProduct } from '@/lib/content';
import type { Product } from '@/lib/content-schemas';
import { PrintButton } from './PrintButton';

const sizingMath: Record<
  Product['slug'],
  { dailyPv: string; usableBattery: string; dailyLoad: string; refill: string; rationale: string }
> = {
  starter: {
    dailyPv: '1.86 kWh',
    usableBattery: '1.2 kWh',
    dailyLoad: '0.6 kWh',
    refill: '~1.0 day',
    rationale:
      '1 panel produces 1.86 kWh per day worst-case, three times the load. Battery covers 1.5 nights of evening use. Massive headroom for cloudy weeks.',
  },
  family: {
    dailyPv: '3.04 kWh',
    usableBattery: '4.0 kWh',
    dailyLoad: '3.0 kWh',
    refill: '~1.6 days',
    rationale:
      '2 × 450 W panels generate 3.04 kWh per day worst-case, refilling the 5 kWh battery in 1.6 days even after deep discharge. The 5 kW inverter handles surge loads from the fridge compressor. The array is expandable as the household load grows.',
  },
  business: {
    dailyPv: '44.6 kWh',
    usableBattery: '12 kWh',
    dailyLoad: '28 kWh',
    refill: '~0.7 days',
    rationale:
      '24 panels generate 44.6 kWh per day worst-case, with surplus to refill the battery in 0.7 days. The 12 kW inverter handles 3HP borehole pump surge (≈9 kW startup) without nuisance trips.',
  },
};

export async function SpecSheet({
  slug,
}: {
  slug: 'starter' | 'family' | 'business';
}): Promise<React.ReactElement> {
  const product = await getProduct(slug);
  const math = sizingMath[slug];
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="bg-surface mx-auto my-8 max-w-3xl print:my-0 print:max-w-none">
      <div className="container-page print:p-0">
        <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
          <Link
            href={`/products/${slug}/`}
            className="text-ink-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to {product.name}
          </Link>
          <PrintButton />
        </div>

        <div className="border-line bg-white rounded-2xl border p-8 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="border-line border-b pb-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-brand text-lg font-medium">Precifarm AI Ltd</p>
              <p className="text-ink-subtle text-xs">Issued {today}</p>
            </div>
            <h1 className="font-display text-ink mt-3 text-2xl font-medium">
              Specification Sheet — {product.name}
            </h1>
            <p className="text-ink-muted mt-1 text-sm">{product.headline}</p>
          </header>

          <section className="mt-6">
            <h2 className="text-brand text-xs font-semibold uppercase tracking-wider">
              At a glance
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Daily PV gen." value={math.dailyPv} />
              <Stat label="Usable battery" value={math.usableBattery} />
              <Stat label="Daily load" value={math.dailyLoad} />
              <Stat label="Recharge time" value={math.refill} />
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="text-brand text-xs font-semibold uppercase tracking-wider">
              Bill of materials
            </h2>
            <table className="border-line mt-3 w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-line border-b">
                  <th className="text-ink-muted py-2 pr-3 text-xs font-semibold uppercase tracking-wider">
                    Component
                  </th>
                  <th className="text-ink-muted py-2 text-xs font-semibold uppercase tracking-wider">
                    Specification
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.components.map((c) => (
                  <tr key={c.name} className="border-line/60 border-b last:border-0">
                    <th
                      scope="row"
                      className="text-ink py-2.5 pr-3 align-top font-medium tabular-nums"
                    >
                      {c.name}
                    </th>
                    <td className="text-ink-muted py-2.5 align-top">{c.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="text-brand text-xs font-semibold uppercase tracking-wider">
              Sizing rationale
            </h2>
            <p className="text-ink-muted mt-3 text-sm leading-relaxed">{math.rationale}</p>
            <p className="text-ink-subtle mt-3 text-xs leading-relaxed">
              Calculated at <span className="text-ink font-medium">4.5 peak sun hours per day</span>
              {' '}(worst-case rainy season for Nairobi/Mwingi) and a{' '}
              <span className="text-ink font-medium">0.75 derating factor</span> for temperature,
              wiring, inverter losses, and dust. Verifiable against any other supplier in the market.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-brand text-xs font-semibold uppercase tracking-wider">Pricing</h2>
            <table className="border-line mt-3 w-full border-collapse text-left text-sm">
              <tbody>
                {product.pricing.map((row) => (
                  <tr key={row.label} className="border-line/60 border-b last:border-0">
                    <th
                      scope="row"
                      className="text-ink-muted py-2.5 pr-3 align-top font-normal"
                    >
                      {row.label}
                    </th>
                    <td className="text-ink py-2.5 text-right align-top font-medium tabular-nums">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-ink-subtle mt-3 text-xs leading-relaxed">
              Prices include installation in Nairobi. Out-of-region installs add a travel line.
              Pricing built bottom-up: components + mounting/BoS + installation, plus an 8%
              integration premium and 20% markup. No hidden lines.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-brand text-xs font-semibold uppercase tracking-wider">
              Compliance and warranty
            </h2>
            <ul className="text-ink-muted mt-3 space-y-1.5 text-sm">
              <li>EPRA-compliant cabling and protections, installed by EPRA-licensed crew.</li>
              <li>One-year workmanship warranty on the install.</li>
              <li>Manufacturer warranties on the panels, battery, and inverter.</li>
              <li>Neura monitoring activated at commissioning.</li>
            </ul>
          </section>

          <footer className="border-line mt-10 border-t pt-6">
            <p className="text-ink-subtle text-xs leading-relaxed">
              This document is for technical reference only. For a binding written quote, contact{' '}
              <a className="text-brand" href="mailto:sales@precifarm.com">
                sales@precifarm.com
              </a>{' '}
              or call <span className="text-ink">+254 794 702 768</span>.
            </p>
            <p className="text-ink-subtle mt-2 text-xs">
              Precifarm AI Ltd · precifarm.com · Lead Engineer: David Givondoh
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }): React.ReactElement {
  return (
    <div className="border-line/60 border-l pl-3">
      <dt className="text-ink-muted text-xs uppercase tracking-wider">{label}</dt>
      <dd className="font-display text-ink mt-1 text-lg font-medium tabular-nums">{value}</dd>
    </div>
  );
}
