import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { StatBlock } from '@/components/shared/StatBlock';

export function ImpactStats({ data }: { data: HomePage['impact'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader heading={data.heading} />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {data.stats.map((stat) => (
          <StatBlock key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
