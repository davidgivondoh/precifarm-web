import type { HomePage } from '@/lib/content-schemas';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { IconCard } from '@/components/shared/IconCard';

export function WhyOnePlatform({ data }: { data: HomePage['whyOnePlatform'] }): React.ReactElement {
  return (
    <section className="bg-surface-muted relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-brand/5 absolute -top-40 right-20 hidden h-[40rem] w-[40rem] rounded-full blur-3xl md:block"
      />
      <div className="container-page section relative">
        <SectionHeader heading={data.heading} intro={data.intro} />

        <div className="border-line bg-surface mt-12 overflow-hidden rounded-2xl border shadow-sm">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-10">
            {data.items.map((item) => (
              <IconCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>

          <div className="border-line bg-surface-muted/40 grid gap-6 border-t p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <p className="text-brand text-xs font-semibold uppercase tracking-wider">
                Get the Neura app
              </p>
              <h3 className="font-display text-ink mt-2 text-xl font-medium md:text-2xl">
                A self-diagnosing repair companion for your solar system.
              </h3>
              <p className="text-ink-muted mt-3 max-w-xl text-sm leading-relaxed">
                Free for every Precifarm customer. Available in English and Swahili. Works offline
                — sync resumes when your phone is back on a network.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <AppStoreButton />
              <GooglePlayButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppStoreButton(): React.ReactElement {
  return (
    <a
      href="https://apps.apple.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Neura on the App Store"
      className="group bg-ink hover:bg-ink/90 flex items-center gap-3 rounded-xl px-5 py-3 text-white transition-all hover:-translate-y-0.5"
    >
      <AppleGlyph className="h-7 w-7 shrink-0 text-white" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
          Download on the
        </span>
        <span className="font-display text-base font-medium">App Store</span>
      </div>
    </a>
  );
}

function GooglePlayButton(): React.ReactElement {
  return (
    <a
      href="https://play.google.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Neura on Google Play"
      className="group bg-ink hover:bg-ink/90 flex items-center gap-3 rounded-xl px-5 py-3 text-white transition-all hover:-translate-y-0.5"
    >
      <PlayGlyph className="h-7 w-7 shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
          Get it on
        </span>
        <span className="font-display text-base font-medium">Google Play</span>
      </div>
    </a>
  );
}

function AppleGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.46 1.58-1.5 3.12-.85 1.32-1.745 2.83-3.205 2.83-1.41 0-1.875-.84-3.5-.84-1.625 0-2.155.81-3.5.84-1.4.04-2.495-1.42-3.355-2.74-1.755-2.71-3.1-7.66-1.295-11.01.88-1.66 2.46-2.72 4.18-2.74 1.39-.03 2.69.95 3.55.95.85 0 2.45-1.17 4.13-1 .7.03 2.66.28 3.92 2.13-.1.06-2.34 1.36-2.32 4.06.03 3.22 2.83 4.29 2.86 4.3z" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.609 1.814 13.792 12 3.61 22.186a1 1 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92z" fill="#34A853" />
      <path d="M16.81 8.99 6.05 2.79l-2.44-1.41a.96.96 0 0 0-.001 1.355l10.183 10.184L16.81 8.99z" fill="#EA4335" />
      <path d="m16.81 15.01-3.018-3.018L3.609 22.176c.227.131.51.131.799-.025l12.402-7.141z" fill="#FBBC05" />
      <path d="m20.16 10.81-3.245-1.866-3.342 3.045 3.342 3.045 3.314-1.906a2 2 0 0 0-.069-3.318z" fill="#4285F4" />
    </svg>
  );
}
