import { CloudSun, Gauge, Sun, type LucideIcon } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const rules: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: CloudSun,
    title: 'Honest irradiance',
    body: 'We design at 4.5 peak sun hours per day — the worst-case rainy season for Nairobi and Mwingi, not the marketing-brochure best case.',
  },
  {
    icon: Gauge,
    title: 'Real-world derating',
    body: 'Panel output is multiplied by 0.75 to account for temperature, wiring losses, inverter efficiency, and dust — the numbers you actually get on a roof in Kenya.',
  },
  {
    icon: Sun,
    title: 'One-day battery refill',
    body: 'Panels must generate enough to fully recharge a drained battery in one good solar day while still serving the daily load. No undersizing to win on price.',
  },
];

const sizingMath: Record<
  Product['slug'],
  { dailyPv: string; usableBattery: string; dailyLoad: string; refill: string }
> = {
  starter: {
    dailyPv: '1.86 kWh',
    usableBattery: '1.2 kWh',
    dailyLoad: '0.6 kWh',
    refill: '~1.0 day',
  },
  family: {
    dailyPv: '3.04 kWh',
    usableBattery: '4.0 kWh',
    dailyLoad: '3.0 kWh',
    refill: '~1.6 days',
  },
  business: {
    dailyPv: 'Up to 44.6 kWh',
    usableBattery: '12 kWh',
    dailyLoad: 'Up to 28 kWh',
    refill: '~0.7 days',
  },
};

export function HonestSizing({ product }: { product: Product }): React.ReactElement {
  const math = sizingMath[product.slug];
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <SectionHeader
          eyebrow="How we size this system"
          heading="The math, made visible."
          intro="Most Kenyan solar systems disappoint because installers undersize panels relative to battery capacity to win on price. Customers blame the battery; the real problem is the panel. We engineer around three sizing rules — and we will show you the numbers for your specific install."
        />

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {rules.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="bg-brand/10 text-brand inline-flex h-11 w-11 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-ink mt-5 text-lg font-medium">{title}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="border-line mt-14 border-t pt-8">
          <p className="text-brand text-xs font-semibold uppercase tracking-wider">
            Sized for {product.name}
          </p>
          <p className="text-ink-muted mt-1 max-w-2xl text-sm">
            Verifiable against any other supplier in the market — the same rules, applied honestly.
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-4">
            <Stat label="Daily PV generation" value={math.dailyPv} />
            <Stat label="Usable battery" value={math.usableBattery} />
            <Stat label="Daily load" value={math.dailyLoad} />
            <Stat label="Recharge time" value={math.refill} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }): React.ReactElement {
  return (
    <div>
      <dt className="text-ink-muted text-xs uppercase tracking-wider">{label}</dt>
      <dd className="font-display text-ink mt-1 text-2xl font-medium">{value}</dd>
    </div>
  );
}
