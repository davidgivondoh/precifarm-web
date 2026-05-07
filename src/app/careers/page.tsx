import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ClipboardList,
  Coffee,
  Coins,
  Compass,
  Ear,
  HardHat,
  Hammer,
  Heart,
  Laptop,
  Mail,
  MapPin,
  MessagesSquare,
  PartyPopper,
  Quote,
  Rocket,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { getSitePage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CtaButton } from '@/components/shared/CtaButton';

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getSitePage('careers');
  return pageMetadata({
    title: frontmatter.seo?.title ?? frontmatter.title,
    description: frontmatter.seo?.description ?? frontmatter.description,
    path: '/careers/',
  });
}

const heroStats: ReadonlyArray<{ value: string; label: string }> = [
  { value: '6', label: 'Cities staffed' },
  { value: '4', label: 'Departments' },
  { value: '100%', label: 'Built in Kenya' },
  { value: '<5d', label: 'Reply to every email' },
];

const values: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Hammer,
    title: 'Do the work',
    body: 'We ship. We service. We answer. The work is the brand.',
  },
  {
    icon: Ear,
    title: 'Tell the truth',
    body: 'To customers, to each other, to ourselves. Bad news travels first.',
  },
  {
    icon: Compass,
    title: 'Build for year three',
    body: 'A solar system that fails in year three is the one nobody saw coming. We design for the long run.',
  },
  {
    icon: MapPin,
    title: 'Stay close to the ground',
    body: 'Engineering decisions get made next to the systems they affect. Field comes first.',
  },
];

type Role = {
  title: string;
  department: 'Field' | 'Engineering' | 'Operations' | 'Commercial';
  locations: string;
  type: string;
  body: string;
  responsibilities: ReadonlyArray<string>;
  bring: ReadonlyArray<string>;
};

const roles: ReadonlyArray<Role> = [
  {
    title: 'Field Engineer',
    department: 'Field',
    locations: 'Nairobi · Mombasa · Kisumu · Eldoret · Kitui · Nakuru',
    type: 'Full-time',
    body: 'Install, commission, and service systems in your region. You sign your work and you talk to customers directly.',
    responsibilities: [
      'Install and commission Starter, Family, and Business systems',
      'Respond to fault alerts from Neura with the right part already in the van',
      'Train customers on their system in the language they prefer',
    ],
    bring: [
      'EPRA T2 or T3 licence (or actively working toward one)',
      'Comfort working at heights and with basic electrical work',
      'Driving licence and willingness to travel within your region',
    ],
  },
  {
    title: 'Apprentice Field Technician',
    department: 'Field',
    locations: 'Any of the six cities',
    type: '12-month apprenticeship',
    body: 'Learn the trade alongside our senior engineers, with a path to EPRA certification and a full Field Engineer role.',
    responsibilities: [
      'Shadow installations and service visits across all three product tiers',
      'Take ownership of small jobs by month six, full installs by month twelve',
      'Study toward EPRA T2 with paid time and materials',
    ],
    bring: [
      'Secondary school certificate (KCSE) and a technical interest',
      'Comfort with tools, heights, and physical work',
      'Hunger to learn — we will teach the rest',
    ],
  },
  {
    title: 'Software Engineer (Platform)',
    department: 'Engineering',
    locations: 'Nairobi (hybrid)',
    type: 'Full-time',
    body: 'Build the platform that watches every system — telemetry ingest, dispatch, customer dashboards. TypeScript and Go.',
    responsibilities: [
      'Own services in our telemetry pipeline from PreciSense devices into Neura',
      'Build dispatch and customer-facing tooling used by field engineers daily',
      'Carry a slice of on-call so the platform stays as accountable as the field',
    ],
    bring: [
      '3+ years building production backends, ideally with hardware data',
      'Fluent in TypeScript or Go; comfortable with SQL and event streams',
      'Bias toward shipping and reading other people’s code carefully',
    ],
  },
  {
    title: 'Embedded Engineer (PreciSense)',
    department: 'Engineering',
    locations: 'Nairobi',
    type: 'Full-time',
    body: 'Design and iterate PreciSense — the small board on every charge controller that makes Neura possible.',
    responsibilities: [
      'Own firmware for the next generation of PreciSense boards',
      'Work directly with field engineers on what the device should sense and report',
      'Own the device’s reliability budget — failures in the field are your alarm',
    ],
    bring: [
      'Embedded C/Rust experience and comfort with low-power design',
      'Familiarity with RS-485, Modbus, or CAN protocols',
      'Curiosity about renewable energy hardware',
    ],
  },
  {
    title: 'Customer Operations Lead',
    department: 'Operations',
    locations: 'Nairobi',
    type: 'Full-time',
    body: 'Route faults to engineers, parts to vans, and reports to customers. You make the system work end to end.',
    responsibilities: [
      'Triage every alert from Neura and dispatch to the right field engineer',
      'Own the parts pipeline so vans never leave half-stocked',
      'Close the loop with customers — every fault, every visit, every time',
    ],
    bring: [
      '2+ years in operations, dispatch, or customer success',
      'Sharp written English (and ideally Swahili)',
      'Comfortable in a spreadsheet and in a WhatsApp thread',
    ],
  },
  {
    title: 'Account Executive (Business tier)',
    department: 'Commercial',
    locations: 'Nairobi (some travel)',
    type: 'Full-time',
    body: 'Own relationships with retail, clinic, school, and SACCO customers buying our Business tier.',
    responsibilities: [
      'Run discovery calls and site visits for Business-tier prospects',
      'Translate energy needs into a written design with our engineering team',
      'Carry a quarterly book and report progress to the founders directly',
    ],
    bring: [
      'B2B sales or solutions experience (energy, agri, or fintech a plus)',
      'Comfort talking through specs and pricing without flinching',
      'Drivers licence and willingness to travel to customer sites',
    ],
  },
];

const departments: ReadonlyArray<{ key: Role['department']; icon: LucideIcon }> = [
  { key: 'Field', icon: HardHat },
  { key: 'Engineering', icon: Laptop },
  { key: 'Operations', icon: Briefcase },
  { key: 'Commercial', icon: Rocket },
];

const benefits: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Coins,
    title: 'Competitive base + equity',
    body: 'Real ownership in what you help build. Salary benchmarked against the Kenyan tech market.',
  },
  {
    icon: Stethoscope,
    title: 'Full medical, you and family',
    body: 'Inpatient and outpatient cover for you, your spouse, and your kids — from day one.',
  },
  {
    icon: PartyPopper,
    title: '22 days leave + holidays',
    body: 'Plus all Kenyan public holidays. We mean it when we say take it.',
  },
  {
    icon: Hammer,
    title: 'Real equipment',
    body: 'Tools, uniform, laptop, phone — whatever the work needs. We do not penny-pinch on gear.',
  },
  {
    icon: BookOpen,
    title: 'Learning budget',
    body: 'KSh 60,000 a year to spend on courses, books, EPRA fees, or conferences you choose.',
  },
  {
    icon: Heart,
    title: 'Pension and NSSF',
    body: 'Statutory NSSF plus a supplemental scheme so retirement is not an abstract idea.',
  },
];

const hiringSteps: ReadonlyArray<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Mail,
    title: 'Send a note',
    body: 'Tell us who you are, what you do well, and a link to something you have built or run.',
  },
  {
    icon: MessagesSquare,
    title: 'A conversation',
    body: 'Forty-five minutes with the team you would join. We talk about the work, not riddles.',
  },
  {
    icon: ClipboardList,
    title: 'A small project',
    body: 'A scoped task close to what the role does. Paid. Two to four hours, asynchronous, on your time.',
  },
  {
    icon: Coffee,
    title: 'A site visit',
    body: 'Spend half a day with us in the field or at the office. You decide if we are the people you want to work with.',
  },
];

const pullQuote = 'Every hire shapes how the company works for years.';

export default async function CareersPage(): Promise<React.ReactElement> {
  const { frontmatter, body } = await getSitePage('careers');
  const intro = body.trim().split(/\n\n+/);

  return (
    <>
      <section className="from-surface-muted to-surface bg-linear-to-b">
        <div className="container-page section">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="text-brand text-sm font-semibold tracking-wider uppercase">Careers</p>
              <h1 className="font-display mt-4 max-w-2xl text-balance">{frontmatter.title}</h1>
              <p className="text-ink-muted mt-5 max-w-xl text-lg">{frontmatter.description}</p>

              <dl className="border-line mt-10 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-ink-muted text-xs uppercase tracking-wider">{stat.label}</dt>
                    <dd className="font-display text-ink mt-1 text-2xl font-medium">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80&auto=format&fit=crop"
                alt="Two engineers collaborating at a laptop in a bright workspace, code visible on a second monitor."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-ink/30 absolute inset-0 bg-linear-to-t to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="mx-auto max-w-3xl">
          <div className="text-ink space-y-5">
            {intro.map((p, i) => (
              <p key={i} className="text-ink-muted text-base leading-relaxed md:text-lg">
                {p}
              </p>
            ))}
          </div>

          <figure className="border-brand bg-brand/5 relative mt-10 rounded-r-xl border-l-4 p-6 md:p-8">
            <Quote
              aria-hidden="true"
              className="text-brand/30 absolute right-4 top-4 h-8 w-8 rotate-180"
            />
            <blockquote className="font-display text-ink relative pr-10 text-xl font-medium leading-snug md:text-2xl">
              {pullQuote}
            </blockquote>
            <figcaption className="text-ink-muted mt-3 text-xs uppercase tracking-wider">
              Why we hire slowly
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            heading="What we look for"
            intro="The four things we will not compromise on, in any role."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border-line bg-surface rounded-xl border p-6"
              >
                <span className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-ink mt-4 text-lg font-medium">{title}</h3>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section">
        <SectionHeader
          eyebrow="Roles we hire for"
          heading="The work, in detail."
          intro="Roles open and close as the work demands. If something fits, write to us — even if the role is not currently posted."
        />

        <div className="mt-14 space-y-16">
          {departments.map(({ key, icon: DeptIcon }) => {
            const deptRoles = roles.filter((r) => r.department === key);
            if (deptRoles.length === 0) return null;
            return (
              <div key={key} className="border-line border-t pt-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-brand text-white inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-sm">
                    <DeptIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-ink text-2xl font-medium">{key}</h3>
                    <p className="text-ink-subtle mt-0.5 text-sm">
                      {deptRoles.length} role{deptRoles.length === 1 ? '' : 's'} we keep building
                      toward
                    </p>
                  </div>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {deptRoles.map((role) => (
                    <RoleCard key={role.title} role={role} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            eyebrow="What you get"
            heading="Working here, in practice."
            intro="The non-negotiables, regardless of the role you join."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border-line bg-surface rounded-xl border p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-brand/10 text-brand inline-flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-ink text-base font-medium">{title}</h3>
                </div>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-panel">
        <div className="container-page section">
          <SectionHeader
            heading="How we hire"
            intro="Four steps, designed to take less of your time than a typical interview process while still giving both of us a real signal."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="border-line bg-surface relative rounded-xl border p-6"
              >
                <span className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="text-brand mt-5 font-display text-xs font-semibold tracking-wider uppercase">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-ink mt-1 text-lg font-medium">{title}</h3>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page section">
        <div className="border-line bg-surface-panel rounded-2xl border p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-display max-w-2xl text-2xl md:text-3xl">
                Don&rsquo;t see your role? Pitch yourself anyway.
              </h2>
              <p className="text-ink-muted mt-3 max-w-xl">
                Email{' '}
                <a href="mailto:careers@precifarm.com" className="text-brand hover:underline">
                  careers@precifarm.com
                </a>{' '}
                with what you do well, what you are looking for, and a link to something you have
                built or run. We reply to every email within five business days.
              </p>
              <p className="text-ink-subtle mt-4 max-w-xl text-sm">
                Precifarm is an equal opportunity employer. We hire on merit and on what you can
                build, regardless of background, gender, ethnicity, religion, or disability.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <CtaButton href="/careers/apply/">Apply now</CtaButton>
              <CtaButton href="mailto:careers@precifarm.com" variant="secondary">
                Email careers
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RoleCard({ role }: { role: Role }): React.ReactElement {
  const applyHref = `/careers/apply/?role=${encodeURIComponent(role.title)}`;
  return (
    <article className="border-line bg-surface group flex flex-col rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-ink text-lg font-medium">{role.title}</h4>
        <span className="bg-brand/10 text-brand shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
          {role.type}
        </span>
      </div>
      <div className="text-ink-muted mt-2 flex items-center gap-1.5 text-xs">
        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
        <span>{role.locations}</span>
      </div>
      <p className="text-ink-muted mt-4 text-sm leading-relaxed">{role.body}</p>

      <div className="mt-5 grid gap-4">
        <div>
          <p className="text-ink-subtle text-xs font-semibold uppercase tracking-wider">
            What you&rsquo;ll do
          </p>
          <ul className="mt-2 space-y-1.5">
            {role.responsibilities.map((item) => (
              <li
                key={item}
                className="text-ink-muted relative pl-4 text-sm leading-relaxed before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-brand"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-ink-subtle text-xs font-semibold uppercase tracking-wider">
            What you bring
          </p>
          <ul className="mt-2 space-y-1.5">
            {role.bring.map((item) => (
              <li
                key={item}
                className="text-ink-muted relative pl-4 text-sm leading-relaxed before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-ink-subtle"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-line mt-6 flex items-center justify-between gap-3 border-t pt-5">
        <span className="text-ink-subtle inline-flex items-center gap-1.5 text-xs">
          <Mail aria-hidden="true" className="h-3.5 w-3.5" />
          careers@precifarm.com
        </span>
        <Link
          href={applyHref}
          className="bg-brand hover:bg-brand-strong inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
          aria-label={`Apply for ${role.title}`}
        >
          Apply
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
