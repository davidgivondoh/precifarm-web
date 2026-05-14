import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function HowWeWork({ data }: { data: HomePage['howWeWork'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader eyebrow="The deployment process" heading={data.heading} intro={data.intro} />

      <ol className="relative mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <div
          aria-hidden="true"
          className="bg-line absolute left-0 right-0 top-[1.125rem] hidden h-px lg:block"
        />
        {data.steps.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-surface border-line text-brand font-display relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold tabular-nums"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-ink text-base font-medium">{step.title}</h3>
            </div>
            <p className="text-ink-muted mt-4 text-sm leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
