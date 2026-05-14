import Image from 'next/image';
import type { HomePage } from '@/lib/content-schemas';
import { CtaButton } from '@/components/shared/CtaButton';

export function Hero({ data }: { data: HomePage['hero'] }): React.ReactElement {
  return (
    <section className="bg-surface-muted relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-brand/5 absolute -top-40 -right-40 hidden h-[28rem] w-[28rem] rounded-full blur-3xl md:block"
      />
      <div
        aria-hidden="true"
        className="bg-starter/10 absolute -bottom-40 -left-40 hidden h-[28rem] w-[28rem] rounded-full blur-3xl md:block"
      />

      <div className="container-page section relative grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <p className="text-brand text-sm tracking-wider uppercase">{data.eyebrow}</p>
          <h1 className="font-display mt-4 text-balance">{data.headline}</h1>
          <p className="text-ink-muted mt-5 max-w-xl text-lg">{data.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href={data.primaryCta.href} variant="primary">
              {data.primaryCta.label}
            </CtaButton>
            <CtaButton href={data.secondaryCta.href} variant="secondary">
              {data.secondaryCta.label}
            </CtaButton>
          </div>
          <ul className="text-ink-muted mt-10 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
            <li className="flex items-baseline gap-2">
              <span className="bg-brand h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              Installed in 1–3 days
            </li>
            <li className="flex items-baseline gap-2">
              <span className="bg-brand h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              5-year service, same team
            </li>
            <li className="flex items-baseline gap-2">
              <span className="bg-brand h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              Live monitoring on every Pod
            </li>
          </ul>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-square">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-brand/20 absolute inset-0 bg-gradient-to-br to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
