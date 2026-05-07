import { AlertTriangle, PhoneCall, RefreshCw, Sun, type LucideIcon } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const stages: ReadonlyArray<{
  key: keyof Product['journey'];
  title: string;
  icon: LucideIcon;
}> = [
  { key: 'acquisition', title: 'Acquisition', icon: PhoneCall },
  { key: 'daily', title: 'Daily use', icon: Sun },
  { key: 'faults', title: 'Faults', icon: AlertTriangle },
  { key: 'yearOverYear', title: 'Year over year', icon: RefreshCw },
];

export function CustomerJourney({ product }: { product: Product }): React.ReactElement {
  return (
    <section className="bg-surface-panel">
      <div className="container-page section">
        <SectionHeader
          heading="The journey"
          intro="From the first call to year-three reliability — what working with us actually feels like."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ key, title, icon: Icon }, i) => (
            <li
              key={key}
              className="border-line bg-surface relative flex flex-col rounded-xl border p-6"
            >
              <span className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-brand font-display mt-5 text-xs font-semibold tracking-wider uppercase">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-ink mt-1 text-lg font-medium">{title}</h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">{product.journey[key]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
