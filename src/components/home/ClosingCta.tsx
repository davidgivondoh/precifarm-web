import Link from 'next/link';
import type { HomePage } from '@/lib/content-schemas';

export function ClosingCta({ data }: { data: HomePage['closingCta'] }): React.ReactElement {
  return (
    <section className="bg-brand text-white">
      <div className="container-page py-20 md:py-24">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <h2 className="font-display max-w-xl text-3xl md:text-4xl">{data.headline}</h2>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href={data.primaryCta.href}
              className="text-brand inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium hover:bg-white/90"
            >
              {data.primaryCta.label}
            </Link>
            <Link
              href={data.secondaryCta.href}
              className="inline-flex items-center rounded-md border border-white/40 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
