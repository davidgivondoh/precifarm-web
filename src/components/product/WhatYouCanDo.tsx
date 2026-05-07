import { Check, X } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

function isYes(value: string): boolean {
  return /^yes$/i.test(value.trim());
}

function isNo(value: string): boolean {
  return /^no$/i.test(value.trim());
}

export function WhatYouCanDo({ product }: { product: Product }): React.ReactElement {
  const allYes = product.capabilities.every((c) => isYes(c.tiers[0] ?? ''));

  return (
    <section className="container-page section">
      <SectionHeader
        heading="What you can do"
        intro="Concrete loads this package supports out of the box. No surprises after install."
      />

      {allYes && (
        <div className="bg-brand/5 border-brand/20 mt-8 flex items-center gap-3 rounded-xl border p-4">
          <span className="bg-brand text-white inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Check aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="text-ink text-sm font-medium">
            All loads listed below run as expected on this package — no exceptions.
          </p>
        </div>
      )}

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {product.capabilities.map((cap) => {
          const verdict = cap.tiers[0] ?? '';
          const yes = isYes(verdict);
          const no = isNo(verdict);
          return (
            <li
              key={cap.task}
              className={`border-line flex items-center justify-between gap-4 rounded-xl border p-4 ${
                no ? 'bg-surface-muted/40' : 'bg-surface'
              }`}
            >
              <span className={`text-sm leading-relaxed ${no ? 'text-ink-subtle' : 'text-ink'}`}>
                {cap.task}
              </span>
              {yes && (
                <span className="bg-brand/10 text-brand inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                  <Check aria-label="Supported" className="h-4 w-4" />
                </span>
              )}
              {no && (
                <span className="bg-line text-ink-subtle inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                  <X aria-label="Not supported on this package" className="h-4 w-4" />
                </span>
              )}
              {!yes && !no && (
                <span className="text-ink-muted shrink-0 text-xs font-medium uppercase tracking-wider">
                  {verdict}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {!allYes && (
        <p className="text-ink-subtle mt-6 text-sm">
          Need something on the &lsquo;not supported&rsquo; list?{' '}
          <a href="/products" className="text-brand hover:underline">
            Compare with other packages
          </a>
          .
        </p>
      )}
    </section>
  );
}
