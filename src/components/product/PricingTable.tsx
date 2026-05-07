import Link from 'next/link';
import { ArrowRight, Check, Download, FileText, MessageCircle } from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const includedByProduct: Record<Product['slug'], ReadonlyArray<string>> = {
  starter: [
    'Same-day installation in Nairobi',
    'EPRA-licensed crew and certified workmanship',
    'Neura AI monitoring on day one',
    'One-year workmanship warranty',
  ],
  family: [
    'Site survey and written design before you commit',
    'Reinforced roof mounts with marine-grade hardware',
    'Neura Smart Energy Manager configured to your loads',
    'Surge and lightning protection included',
  ],
  business: [
    'Commercial-grade installation by EPRA-licensed crews',
    'Tariff-aware energy management tuned to your tariff',
    'Neura Business Dashboard with uptime analytics',
    'Priority support tier with on-site response',
    'BOM and EPRA documentation for KCB Clean Energy financing',
  ],
};

const accountsAndLendersDocs: ReadonlyArray<string> = [
  'Structural certification report',
  'Tariff modelling and projected savings',
  'Lender-ready financial summary',
  'Sustainability disclosure data export',
];

export function PricingTable({ product }: { product: Product }): React.ReactElement {
  const cash = product.pricing.find((p) => /cash/i.test(p.label)) ?? product.pricing[0];
  const monthly = product.pricing.find((p) => /month/i.test(p.label));
  const otherTerms = product.pricing.filter(
    (p) => p !== cash && p !== monthly,
  );
  const included = includedByProduct[product.slug];

  return (
    <section id="pricing" className="container-page section scroll-mt-20">
      <SectionHeader
        heading="Pricing"
        intro="One transparent price, no hidden fees. Out-of-region installs add a travel line."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="border-brand/30 bg-linear-to-br from-brand/5 to-surface relative overflow-hidden rounded-2xl border-2 p-8 md:p-10">
          {monthly && (
            <span className="bg-brand absolute right-6 top-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Monthly option
            </span>
          )}
          <p className="text-ink-muted text-sm font-medium uppercase tracking-wider">
            {cash?.label ?? 'Starting price'}
          </p>
          <p className="font-display text-ink mt-2 text-4xl font-medium md:text-5xl">
            {cash?.value ?? 'On request'}
          </p>
          {monthly && (
            <p className="text-ink-muted mt-3 text-base">
              or{' '}
              <span className="text-brand font-display text-lg font-medium">
                {monthly.value}
              </span>
            </p>
          )}

          {otherTerms.length > 0 && (
            <dl className="border-line mt-7 grid gap-4 border-t pt-6 sm:grid-cols-2">
              {otherTerms.map((term) => (
                <div key={term.label}>
                  <dt className="text-ink-muted text-xs uppercase tracking-wider">{term.label}</dt>
                  <dd className="text-ink mt-1 font-medium">{term.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-strong inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Get a quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/254794702768"
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:bg-surface-muted inline-flex items-center gap-1.5 rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-[#25D366]" />
              WhatsApp us
            </a>
            <Link
              href={`/products/${product.slug}/spec/`}
              className="text-ink-muted hover:text-ink inline-flex items-center gap-1.5 self-center text-sm transition-colors"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Spec sheet (PDF)
            </Link>
          </div>
        </div>

        <div className="border-line bg-surface flex flex-col gap-6 rounded-2xl border p-6 md:p-8">
          <div>
            <p className="text-brand text-xs font-semibold uppercase tracking-wider">
              What is included
            </p>
            <h3 className="font-display text-ink mt-2 text-lg font-medium">
              Every {product.name} install
            </h3>
            <ul className="mt-5 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <Check aria-hidden="true" className="text-brand mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.slug === 'business' && (
            <div className="border-line border-t pt-6">
              <div className="flex items-center gap-2">
                <FileText aria-hidden="true" className="text-brand h-4 w-4" />
                <p className="text-ink text-xs font-semibold uppercase tracking-wider">
                  For accounts &amp; lenders
                </p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {accountsAndLendersDocs.map((doc) => (
                  <li key={doc} className="text-ink-muted text-sm leading-relaxed">
                    · {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-ink-subtle mt-6 text-sm">
        Prices include installation in Nairobi. Out-of-region installs add a travel line. Talk to
        us for a quote.
      </p>
    </section>
  );
}
