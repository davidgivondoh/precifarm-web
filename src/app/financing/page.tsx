import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Leaf,
  Sprout,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CtaButton } from '@/components/shared/CtaButton';

export const metadata: Metadata = pageMetadata({
  title: 'Financing your Precifarm system',
  description:
    'Cash, Precifarm 24-month plan, KCB Clean Energy Financing, KCB SME, Equity Equiloan, Stanbic Solar PV, Co-op CO-OP-A-MAJI, SACCOs — six routes to ownership for Family and Commercial.',
  path: '/financing/',
});

type Partner = {
  icon: LucideIcon;
  name: string;
  bestFor: string;
  product: string;
  url: string;
  ticket?: string;
  term?: string;
};

type PartnerGroup = {
  heading: string;
  intro: string;
  partners: ReadonlyArray<Partner>;
};

const partnerGroups: ReadonlyArray<PartnerGroup> = [
  {
    heading: 'For commercial and institutional buyers',
    intro: 'SMEs, schools, clinics, agribusinesses — bank-led routes for the Commercial package.',
    partners: [
      {
        icon: Leaf,
        name: 'KCB Clean Energy Financing',
        bestFor: 'SMEs · schools · health facilities · agribusinesses',
        product:
          'Backed by the Green Climate Fund (KSh 12.5bn facility, 2025-26). Terms aligned to customer cash flow.',
        ticket: 'Up to KSh 250m secured',
        term: 'Up to 60 months',
        url: 'https://ke.kcbgroup.com/for-your-biashara',
      },
      {
        icon: Building2,
        name: 'KCB SME Term Loans',
        bestFor: 'Commercial customers without renewable-specific collateral',
        product: 'Standard SME unsecured working-capital and asset-finance facility.',
        ticket: 'Up to KSh 3m unsecured',
        term: 'Up to 36 months',
        url: 'https://ke.kcbgroup.com/for-your-biashara/get-a-loan/for-sme/sme-term-loans',
      },
      {
        icon: Sprout,
        name: 'Stanbic Solar PV Financing',
        bestFor: 'Agribusinesses and SMEs with 12 months of KPLC bills',
        product: 'Tailored for grid-tied, hybrid, or off-grid systems based on energy audit.',
        ticket: 'Energy-audit driven',
        term: 'Negotiated per case',
        url: 'https://www.stanbicbank.co.ke/kenya/business/products-and-services/business-solutions/solar%E2%80%93finance',
      },
      {
        icon: Sprout,
        name: 'Co-operative Bank — CO-OP-A-MAJI',
        bestFor: 'Farmers and water-linked SMEs (boreholes, irrigation)',
        product: 'Solar water pumps, heating systems, and related infrastructure.',
        ticket: 'Per facility size',
        term: 'Per facility size',
        url: 'https://www.co-opbank.co.ke/borrow/co-op-a-maji-loan/',
      },
    ],
  },
  {
    heading: 'For salaried customers and SACCO members',
    intro: 'Personal loans most often used for the Family package.',
    partners: [
      {
        icon: Wallet,
        name: 'Equity Equiloan + Eazzy Loan',
        bestFor: 'Salaried customers buying Family',
        product:
          'Equiloan via check-off arrangement. Eazzy Loan instant via mobile for smaller amounts.',
        ticket: 'KSh 30k–5m',
        term: 'Up to 6 years',
        url: 'https://equitygroupholdings.com/ke/borrow/personal/equiloan/',
      },
      {
        icon: Users,
        name: 'SACCOs',
        bestFor: 'Members with payroll deduction',
        product: 'Member development loans, terms vary by SACCO.',
        ticket: 'Per SACCO policy',
        term: 'Per SACCO policy',
        url: '/contact',
      },
    ],
  },
];

type WorkedExample = {
  title: string;
  subtitle: string;
  rows: ReadonlyArray<{ label: string; value: string }>;
  highlight: { label: string; value: string };
  closing?: string;
};

const examples: ReadonlyArray<WorkedExample> = [
  {
    title: 'Starter — Lipa Pole Pole 24-month plan',
    subtitle:
      'Fixed deposit, fixed monthly instalment over 24 months. Collected via M-Pesa standing order.',
    rows: [
      { label: 'Selling price', value: 'KSh 95,000' },
      { label: 'Deposit', value: 'KSh 12,500' },
      { label: 'Balance', value: 'KSh 82,500' },
      { label: 'Term', value: '24 months' },
      { label: 'Total of instalments', value: 'KSh 131,328' },
      { label: 'Total paid over 2 years', value: 'KSh 143,828' },
    ],
    highlight: { label: 'Monthly instalment', value: 'KSh 5,472' },
    closing:
      'Roughly KSh 5,472 per month is comparable to what an off-grid household typically spends on kerosene, candles, phone-charging fees, and occasional generator fuel. Once paid off, the system continues producing power for another 20+ years at zero monthly cost.',
  },
  {
    title: 'Family — customer-arranged personal loan (illustrative)',
    subtitle:
      'Precifarm Family is sold cash-only at KSh 290,000. If you spread the cost, you do it directly with the bank — Equity Equiloan, KCB unsecured, or Co-op personal loan. Below: a 36-month secured personal facility at 16% per annum.',
    rows: [
      { label: 'Selling price', value: 'KSh 290,000' },
      { label: 'Deposit (30%)', value: 'KSh 87,000' },
      { label: 'Balance financed', value: 'KSh 203,000' },
      { label: 'Term', value: '36 months' },
      { label: 'Interest rate', value: '16% p.a. reducing balance' },
      { label: 'Total interest (approx.)', value: 'KSh 52,700' },
      { label: 'Total paid', value: 'KSh 342,700' },
    ],
    highlight: { label: 'Monthly instalment', value: 'KSh 7,103' },
  },
  {
    title: 'Commercial — customer-arranged KCB Clean Energy (illustrative)',
    subtitle:
      'Precifarm Commercial is sold cash-only from KSh 520,000 (entry config) up to around KSh 1.5m for a full 13.2 kWp borehole-irrigation deployment. Customers typically arrange KCB Clean Energy Financing themselves — KCB partners with vetted providers like Precifarm to deliver and install systems with terms aligned to the customer’s cash flow. Below: a full 13.2 kWp / 15 kWh deployment, 30% deposit, balance over 60 months at 16% p.a.',
    rows: [
      { label: 'Selling price (full config)', value: 'KSh 1,500,000' },
      { label: 'Deposit (30%)', value: 'KSh 450,000' },
      { label: 'Balance financed', value: 'KSh 1,050,000' },
      { label: 'Term', value: '60 months' },
      { label: 'Interest rate', value: '16% p.a. reducing balance' },
      { label: 'Total interest (approx.)', value: 'KSh 482,000' },
      { label: 'Total paid (incl. deposit)', value: 'KSh 1,982,000' },
    ],
    highlight: { label: 'Monthly instalment', value: 'KSh 25,533' },
    closing:
      'A Commercial customer offsetting roughly KSh 35,000 per month in KPLC bills and diesel generator costs sees net positive cash flow from month one — the loan effectively self-finances through energy savings.',
  },
];

const nextSteps: ReadonlyArray<string> = [
  'Identify your package — Starter, Family, or Commercial.',
  'Contact Precifarm to schedule a site assessment (free of charge).',
  'Receive a custom proposal with confirmed BOM and EPRA documentation.',
  'Choose financing route — cash, Precifarm 24-month plan (Starter only), or partner bank.',
  'If using a bank, apply through the partner links above with our documentation attached.',
  'Installation is scheduled within 7 to 14 days of financing confirmation.',
  'System commissioned, customer trained, and Neura monitoring activated.',
];

function PartnerCard({ partner: p }: { partner: Partner }): React.ReactElement {
  const isExternal = p.url.startsWith('http');
  const Icon = p.icon;
  return (
    <a
      href={p.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="bg-brand/10 text-brand inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-display text-ink group-hover:text-brand text-base font-medium transition-colors">
              {p.name}
            </h4>
            <p className="text-ink-subtle mt-0.5 text-xs uppercase tracking-wider">{p.bestFor}</p>
          </div>
        </div>
        {isExternal && (
          <ExternalLink
            aria-hidden="true"
            className="text-ink-subtle group-hover:text-brand mt-1 h-4 w-4 shrink-0 transition-colors"
          />
        )}
      </div>
      <p className="text-ink-muted mt-4 text-sm leading-relaxed">{p.product}</p>
      {(p.ticket || p.term) && (
        <dl className="border-line/60 mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-xs">
          {p.ticket && (
            <div>
              <dt className="text-ink-subtle uppercase tracking-wider">Ticket</dt>
              <dd className="text-ink mt-0.5 font-medium">{p.ticket}</dd>
            </div>
          )}
          {p.term && (
            <div>
              <dt className="text-ink-subtle uppercase tracking-wider">Term</dt>
              <dd className="text-ink mt-0.5 font-medium">{p.term}</dd>
            </div>
          )}
        </dl>
      )}
      <span className="text-brand group-hover:text-brand-strong mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-colors">
        Open partner page
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function FinancingPage(): React.ReactElement {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Financing', path: '/financing/' },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="from-surface-muted to-surface bg-linear-to-b">
        <div className="container-page section">
          <p className="text-brand text-sm font-semibold tracking-wider uppercase">Financing</p>
          <h1 className="font-display mt-4 max-w-3xl text-balance">
            Routes to ownership, with vetted Kenyan banks.
          </h1>
          <p className="text-ink-muted mt-5 max-w-2xl text-lg">
            Precifarm is not a credit broker and does not guarantee approval. We introduce you to
            the right relationship manager at each partner institution and supply the technical
            specifications, BOM, and EPRA compliance documents banks require.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/contact">Talk to us</CtaButton>
            <CtaButton href="/how-we-size" variant="secondary">
              How we size systems
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <SectionHeader
          eyebrow="Our financing partners"
          heading="Six routes, tuned to the customer."
          intro="Each partner is suited to a different customer profile. Mention Precifarm AI Ltd as your solar provider during your application — we will supply the technical specifications, BOM, and EPRA compliance documents the bank requires."
        />

        <div className="mt-12 space-y-12">
          {partnerGroups.map((group) => (
            <div key={group.heading}>
              <div className="border-line border-t pt-8">
                <h3 className="font-display text-ink text-xl font-medium md:text-2xl">
                  {group.heading}
                </h3>
                <p className="text-ink-muted mt-2 max-w-2xl text-sm">{group.intro}</p>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {group.partners.map((p) => (
                  <PartnerCard key={p.name} partner={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            eyebrow="Worked examples"
            heading="The numbers, end to end."
            intro="Only the Starter example is a Precifarm-offered payment plan (our M-Pesa 24-month facility). The Family and Commercial examples are customer-arranged with the bank — Precifarm sells those packages cash-only and supplies the documents the lender needs. Figures are illustrative, computed on a reducing-balance basis."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {examples.map((ex) => (
              <div
                key={ex.title}
                className="border-line bg-surface flex flex-col rounded-2xl border p-6"
              >
                <h3 className="font-display text-ink text-lg font-medium">{ex.title}</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">{ex.subtitle}</p>

                <div className="border-brand/30 bg-brand/5 mt-5 rounded-lg border p-4">
                  <p className="text-ink-muted text-xs uppercase tracking-wider">
                    {ex.highlight.label}
                  </p>
                  <p className="font-display text-ink mt-1 text-2xl font-medium">
                    {ex.highlight.value}
                  </p>
                </div>

                <dl className="mt-5 space-y-2 text-sm">
                  {ex.rows.map((row) => (
                    <div
                      key={row.label}
                      className="border-line/60 flex justify-between gap-3 border-b py-1.5 last:border-0"
                    >
                      <dt className="text-ink-muted">{row.label}</dt>
                      <dd className="text-ink text-right tabular-nums">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                {ex.closing && (
                  <p className="text-ink-subtle mt-5 text-xs leading-relaxed">{ex.closing}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section">
        <SectionHeader
          eyebrow="Next steps"
          heading="From enquiry to commissioning, in seven steps."
        />
        <ol className="mt-10 space-y-3">
          {nextSteps.map((step, i) => (
            <li
              key={step}
              className="border-line bg-surface flex items-start gap-4 rounded-xl border p-5"
            >
              <span className="bg-brand text-white font-display inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {i + 1}
              </span>
              <p className="text-ink text-sm leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <p className="text-ink-subtle mt-8 max-w-3xl text-sm leading-relaxed">
          All instalment calculations on this site are illustrative, computed on a reducing-balance
          basis. Actual rates depend on the lender&rsquo;s assessment of your credit profile,
          security offered, and current Central Bank Rate. Precifarm AI Ltd is not a lender,
          financial advisor, or credit broker, and does not guarantee approval of any third-party
          financing. Bank product terms change frequently; always confirm current rates and
          eligibility directly with the lender before signing.
        </p>
      </section>

      <section className="container-page section">
        <div className="border-line bg-surface-panel rounded-2xl border p-8 md:p-12">
          <h2 className="font-display max-w-2xl text-2xl md:text-3xl">
            Ready to take the next step?
          </h2>
          <p className="text-ink-muted mt-3 max-w-xl">
            Tell us your package and the financing route you are considering. We will reply with a
            written quote and the technical documents your bank needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/contact">Get a quote</CtaButton>
            <Link
              href="/products"
              className="text-brand hover:text-brand-strong inline-flex items-center gap-1 self-center text-sm font-semibold transition-colors"
            >
              See the packages
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
