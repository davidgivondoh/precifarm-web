import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FaqAccordion } from '@/components/shared/FaqAccordion';

export function ProductFaq({ product }: { product: Product }): React.ReactElement {
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <SectionHeader
          heading="Frequently asked"
          intro="The questions we hear most often when customers consider this package."
        />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={product.faq} />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-ink-muted">Still have questions?</span>
          <Link
            href="/contact"
            className="text-brand hover:text-brand-strong inline-flex items-center gap-1 font-semibold transition-colors"
          >
            Talk to us
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
