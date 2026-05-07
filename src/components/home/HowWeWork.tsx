import Image from 'next/image';
import { Activity, PencilRuler, Search, Wrench, type LucideIcon } from 'lucide-react';
import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const stepIconMap: Record<string, LucideIcon> = {
  search: Search,
  'pencil-ruler': PencilRuler,
  wrench: Wrench,
  activity: Activity,
};

export function HowWeWork({ data }: { data: HomePage['howWeWork'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader heading={data.heading} intro={data.intro} />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.steps.map((step, i) => {
          const Icon = stepIconMap[step.icon] ?? Search;
          return (
            <li
              key={step.title}
              className="border-line group hover-lift bg-surface relative flex flex-col overflow-hidden rounded-xl border"
            >
              <div className="bg-surface-muted relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="from-ink/40 absolute inset-0 bg-linear-to-t to-transparent"
                />
                <span className="bg-ink/80 text-brand-soft font-display absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="font-display text-ink mt-4 text-xl font-medium">{step.title}</h3>
                <p className="text-ink-subtle mt-3 text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
