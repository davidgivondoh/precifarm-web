import { ChevronDown } from 'lucide-react';

export function FaqAccordion({
  items,
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
}): React.ReactElement {
  return (
    <ul className="divide-line border-line divide-y border-y">
      {items.map((item) => (
        <li key={item.q}>
          <details className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="text-ink font-medium">{item.q}</span>
              <ChevronDown
                aria-hidden="true"
                className="text-ink-muted h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="text-ink-muted mt-3 max-w-2xl text-sm">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
