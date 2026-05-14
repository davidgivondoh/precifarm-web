import { ExternalLink, type LucideIcon, Building2, Leaf, Sprout, Users, Wallet } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

type Partner = {
  icon: LucideIcon;
  name: string;
  bestFor: string;
  product: string;
  url: string;
};

const partnersByProduct: Record<'family' | 'business', ReadonlyArray<Partner>> = {
  family: [
    {
      icon: Wallet,
      name: 'Equity Bank',
      bestFor: 'Salaried customers via check-off',
      product: 'Equiloan (KSh 30k–5m, up to 6 years) or Eazzy Loan (instant, mobile)',
      url: 'https://equitygroupholdings.com/ke/borrow/',
    },
    {
      icon: Building2,
      name: 'KCB Bank Kenya',
      bestFor: 'Family customers needing larger ticket',
      product: 'SME Term Loans, unsecured personal loans',
      url: 'https://ke.kcbgroup.com/for-your-biashara/get-a-loan/for-sme/sme-term-loans',
    },
    {
      icon: Sprout,
      name: 'Co-operative Bank',
      bestFor: 'Farmers and water-linked households',
      product: 'CO-OP-A-MAJI Loan (solar pumps, heating, related infrastructure)',
      url: 'https://www.co-opbank.co.ke/borrow/co-op-a-maji-loan/',
    },
    {
      icon: Users,
      name: 'SACCOs',
      bestFor: 'Members with payroll deduction',
      product: 'Member development loans (varies by SACCO)',
      url: '/contact',
    },
  ],
  business: [
    {
      icon: Leaf,
      name: 'KCB Clean Energy Financing',
      bestFor: 'SMEs, schools, health facilities, agribusinesses',
      product:
        'Up to KSh 250m secured · up to 60 months · backed by the Green Climate Fund (KSh 12.5bn facility)',
      url: 'https://ke.kcbgroup.com/for-your-biashara',
    },
    {
      icon: Building2,
      name: 'KCB SME Term Loans',
      bestFor: 'Commercial customers without renewable-specific collateral',
      product: 'Unsecured up to KSh 3m · up to 36 months',
      url: 'https://ke.kcbgroup.com/for-your-biashara/get-a-loan/for-sme/sme-term-loans',
    },
    {
      icon: Sprout,
      name: 'Stanbic Bank Solar PV Financing',
      bestFor: 'Agribusinesses and SMEs with 12 months of KPLC bills',
      product: 'Tailored for grid-tied, hybrid, or off-grid systems based on energy audit',
      url: 'https://www.stanbicbank.co.ke/kenya/business/products-and-services/business-solutions/solar%E2%80%93finance',
    },
    {
      icon: Sprout,
      name: 'Co-operative Bank — CO-OP-A-MAJI',
      bestFor: 'Water-linked SMEs and farms (boreholes, irrigation)',
      product: 'Covers solar water pumps, heating systems, and related infrastructure',
      url: 'https://www.co-opbank.co.ke/borrow/co-op-a-maji-loan/',
    },
  ],
};

export function FinancingPartners({
  slug,
}: {
  slug: 'family' | 'business';
}): React.ReactElement {
  const partners = partnersByProduct[slug];
  return (
    <section className="container-page section">
      <SectionHeader
        eyebrow="Financing partners"
        heading="Routes to ownership."
        intro="Precifarm is not a credit broker and does not guarantee approval. We introduce you to the right relationship manager and supply the technical specifications, BOM, and EPRA compliance documents banks require. Mention Precifarm AI Ltd as your solar provider during your application."
      />
      <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {partners.map((p) => {
          const isExternal = p.url.startsWith('http');
          const Icon = p.icon;
          return (
            <a
              key={p.name}
              href={p.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="group flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="bg-brand/10 text-brand inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-ink group-hover:text-brand text-base font-medium transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-ink-subtle mt-0.5 text-xs uppercase tracking-wider">
                      {p.bestFor}
                    </p>
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
            </a>
          );
        })}
      </div>
      <p className="text-ink-subtle mt-6 max-w-3xl text-sm leading-relaxed">
        All instalment figures across this site are illustrative, computed on a reducing-balance
        basis. Actual rates depend on each lender&rsquo;s assessment of your credit profile,
        security offered, and current Central Bank Rate. Bank product terms change frequently —
        always confirm directly with the lender before signing.
      </p>
    </section>
  );
}
