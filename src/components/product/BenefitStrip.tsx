import { CheckCircle2 } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';

const benefitsByProduct: Record<Product['slug'], ReadonlyArray<string>> = {
  starter: [
    'One-day install',
    'KSh 12,500 deposit, 24-month finance',
    'Neura AI alerts and remote diagnostics',
    'One-year workmanship warranty',
  ],
  family: [
    'Premium reinforced roof mount',
    '5 kW hybrid inverter, 51.2 V rack lithium',
    'Neura Smart Energy Manager',
    'Surge and lightning protection included',
  ],
  business: [
    'Commercial-grade installation',
    'Priority support, on-site response',
    'Tariff-aware energy management',
    'Multi-site analytics and lender-ready reports',
  ],
};

export function BenefitStrip({ product }: { product: Product }): React.ReactElement {
  const benefits = benefitsByProduct[product.slug];
  return (
    <section className="border-line border-y bg-white">
      <div className="container-page py-8">
        <ul className="text-ink grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-baseline gap-2">
              <CheckCircle2 className="text-brand h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
