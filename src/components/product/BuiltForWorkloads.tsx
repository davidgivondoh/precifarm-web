import {
  Briefcase,
  Snowflake,
  Stethoscope,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

type Workload = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  loads: ReadonlyArray<string>;
};

const workloads: ReadonlyArray<Workload> = [
  {
    icon: Store,
    title: 'Retail and supermarket',
    subtitle: 'Shop floor that never goes dark.',
    loads: [
      'Cold storage and chest freezers',
      'PoS terminals and receipt printers',
      'Full aisle lighting and CCTV',
      'Customer phone-charging counter',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Clinic and health facility',
    subtitle: 'Cold chain and patient care, uninterrupted.',
    loads: [
      'Vaccine fridge with temperature alerts',
      'Diagnostic equipment and lab freezer',
      'Reception and records workstations',
      'Exam-room lighting and lamps',
    ],
  },
  {
    icon: Snowflake,
    title: 'Cold room and agro-processing',
    subtitle: 'Spoilage you no longer plan around.',
    loads: [
      'Walk-in cold room or milk cooler',
      'Processing tools and water pumps',
      'Loading-bay lighting and CCTV',
      'Site office and security loads',
    ],
  },
  {
    icon: Briefcase,
    title: 'Office, SACCO, or co-working',
    subtitle: 'Productivity that does not pause for KPLC.',
    loads: [
      'Workstations, laptops, and monitors',
      'Servers, switches, and Wi-Fi',
      'Printer-copier and scanners',
      'Full lighting and access control',
    ],
  },
];

export function BuiltForWorkloads(): React.ReactElement {
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <SectionHeader
          eyebrow="Built for these workloads"
          heading="A typical day on Precifarm Commercial."
          intro="Four common operating profiles we have sized this package for. Your loads probably look like one of these — or a blend."
        />
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {workloads.map(({ icon: Icon, title, subtitle, loads }) => (
            <article key={title} className="flex flex-col">
              <span className="bg-brand/10 text-brand inline-flex h-11 w-11 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-ink mt-5 text-lg font-medium">{title}</h3>
              <p className="text-ink-muted mt-1 text-sm font-medium">{subtitle}</p>
              <ul className="text-ink-muted mt-4 space-y-1.5 text-sm leading-relaxed">
                {loads.map((load) => (
                  <li
                    key={load}
                    className="relative pl-3.5 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-brand"
                  >
                    {load}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
