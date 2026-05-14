import {
  Briefcase,
  Building2,
  Coins,
  GraduationCap,
  Home,
  Key,
  Sprout,
  Stethoscope,
  Store,
  UserRound,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { Product } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';

const personaIcons: ReadonlyArray<{ match: RegExp; icon: LucideIcon }> = [
  { match: /school|classroom|tablet/i, icon: GraduationCap },
  { match: /clinic|health|pharmac|diagnos/i, icon: Stethoscope },
  { match: /office|co-working|sacco|server/i, icon: Briefcase },
  { match: /shop|salon|barber|m-?pesa|retail|supermarket|store/i, icon: Store },
  { match: /greenhouse|cold room|milk|agro|farm|crop/i, icon: Sprout },
  { match: /downtime|uptime|operations|business|enterprise/i, icon: Building2 },
  { match: /renter|rent\b/i, icon: Key },
  { match: /home|household|famil|house|estate/i, icon: Home },
  { match: /instalment|monthly|finance|deposit/i, icon: Coins },
  { match: /blackout|outage|backup/i, icon: Zap },
];

function iconFor(text: string): LucideIcon {
  return personaIcons.find((p) => p.match.test(text))?.icon ?? UserRound;
}

export function WhoItIsFor({ product }: { product: Product }): React.ReactElement {
  return (
    <section className="container-page section">
      <SectionHeader
        heading="Who it is for"
        intro="The customers we have built this package for, in their own words."
      />
      <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {product.forWhom.map((p) => {
          const Icon = iconFor(p);
          return (
            <li key={p} className="flex items-start gap-3">
              <span className="bg-brand/10 text-brand inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="text-ink text-sm leading-relaxed">{p}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
