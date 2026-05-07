import type { HomePage } from '@/lib/content-schemas';

export function PartnerStrip({ data }: { data: HomePage['partners'] }): React.ReactElement {
  return (
    <section aria-label={data.label} className="border-line border-y">
      <div className="container-page py-10">
        <p className="text-ink-muted text-center text-sm tracking-wider uppercase">{data.label}</p>
        <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {data.items.map((p) => (
            <li
              key={p.name}
              className="text-ink-muted font-display text-lg font-medium opacity-70 grayscale"
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
