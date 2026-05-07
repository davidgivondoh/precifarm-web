import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function UseCases({ data }: { data: HomePage['useCases'] }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader heading={data.heading} intro={data.intro} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {data.items.map((item) => (
          <article
            key={item.title}
            className="border-line group flex flex-col overflow-hidden rounded-2xl border bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl"
          >
            <div className="bg-surface-muted relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="from-ink/50 absolute inset-0 bg-linear-to-t to-transparent"
              />
              <span className="bg-ink/80 absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {item.sector}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Link
                href={item.packageHref}
                className="text-brand hover:text-brand-strong inline-flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {item.package} package
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </Link>
              <h3 className="font-display text-ink mt-3 text-lg font-medium">{item.title}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
