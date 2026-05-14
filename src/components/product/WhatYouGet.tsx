import { Battery, Cable, Cpu, Plug, Sun, Wrench, type LucideIcon } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const componentIcons: ReadonlyArray<{ match: RegExp; icon: LucideIcon }> = [
  { match: /solar panel/i, icon: Sun },
  { match: /battery/i, icon: Battery },
  { match: /inverter/i, icon: Plug },
  { match: /monitoring|energy management|dashboard/i, icon: Cpu },
  { match: /mounting|rail|frame/i, icon: Wrench },
  { match: /wiring|cable|protection/i, icon: Cable },
];

function iconFor(name: string): LucideIcon {
  return componentIcons.find((c) => c.match.test(name))?.icon ?? Cpu;
}

export function WhatYouGet({ product }: { product: Product }): React.ReactElement {
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <SectionHeader
          heading="What you get"
          intro="Every component we install on this package, with the exact specification."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {product.components.map((c) => {
            const Icon = iconFor(c.name);
            return (
              <li key={c.name}>
                <span className="bg-brand/10 text-brand inline-flex h-11 w-11 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-ink mt-5 text-lg font-medium">{c.name}</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">{c.spec}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
