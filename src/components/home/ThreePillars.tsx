import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function ThreePillars({ data }: { data: HomePage['impact'] }): React.ReactElement {
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <SectionHeader eyebrow="Three pillars" heading={data.heading} />
        <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3 md:gap-y-0">
          {data.stats.map((pillar, i) => (
            <li key={pillar.value} className="border-line border-t pt-6">
              <span
                aria-hidden="true"
                className="text-brand font-display text-sm font-semibold tracking-wider tabular-nums"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-ink mt-3 text-xl font-medium">{pillar.value}</h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">{pillar.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
