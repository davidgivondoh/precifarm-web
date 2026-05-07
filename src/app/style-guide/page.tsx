import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Style guide',
  robots: { index: false, follow: false },
};

const colorTokens: Array<{ name: string; varName: string; hex: string }> = [
  { name: 'brand', varName: '--color-brand', hex: '#1F4E5F' },
  { name: 'brand-strong', varName: '--color-brand-strong', hex: '#163B48' },
  { name: 'starter', varName: '--color-starter', hex: '#F4D77E' },
  { name: 'family', varName: '--color-family', hex: '#5BA3D4' },
  { name: 'business', varName: '--color-business', hex: '#4ADE80' },
  { name: 'ink', varName: '--color-ink', hex: '#1A1A1A' },
  { name: 'ink-muted', varName: '--color-ink-muted', hex: '#525252' },
  { name: 'surface', varName: '--color-surface', hex: '#FFFFFF' },
  { name: 'surface-muted', varName: '--color-surface-muted', hex: '#F7F9FA' },
  { name: 'surface-panel', varName: '--color-surface-panel', hex: '#EEF4F7' },
];

const radii = [
  { name: 'sm (4px)', cls: 'rounded-sm' },
  { name: 'md (8px)', cls: 'rounded-md' },
  { name: 'lg (12px)', cls: 'rounded-lg' },
  { name: 'xl (16px)', cls: 'rounded-xl' },
];

export default function StyleGuide(): React.ReactElement {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="container-page section space-y-16">
      <header>
        <p className="text-ink-muted text-sm tracking-wider uppercase">Dev only</p>
        <h1 className="font-display mt-2">Style guide</h1>
        <p className="text-ink-muted mt-3 max-w-2xl">
          Design tokens, type scale, and shared components. Returns 404 in production.
        </p>
      </header>

      <section>
        <h2>Colours</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorTokens.map((t) => (
            <div key={t.name} className="border-line rounded-md border p-3">
              <div
                className="border-line h-16 w-full rounded-md border"
                style={{ backgroundColor: `var(${t.varName})` }}
              />
              <div className="mt-3 flex items-baseline justify-between text-sm">
                <code className="font-medium">{t.name}</code>
                <span className="text-ink-muted">{t.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Type scale</h2>
        <div className="mt-6 space-y-4">
          <h1>H1 — Distributed solar energy for Kenya</h1>
          <h2>H2 — Why one platform</h2>
          <h3>H3 — What you get</h3>
          <p className="text-ink max-w-2xl">Body text in Inter at the default size.</p>
          <p className="text-ink-muted max-w-2xl">Muted body text used for descriptions.</p>
        </div>
      </section>

      <section>
        <h2>Radii</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {radii.map((r) => (
            <div key={r.name} className="border-line border p-3">
              <div className={`bg-brand h-16 w-full ${r.cls}`} />
              <p className="text-ink-muted mt-2 text-sm">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Buttons</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="bg-brand hover:bg-brand-strong rounded-md px-4 py-2 text-white"
          >
            Primary
          </button>
          <button
            type="button"
            className="border-line bg-surface text-ink hover:bg-surface-muted rounded-md border px-4 py-2"
          >
            Secondary
          </button>
          <a
            href="#"
            className="text-brand rounded-md px-4 py-2 underline-offset-4 hover:underline"
          >
            Tertiary link
          </a>
        </div>
      </section>

      <section>
        <h2>Focus ring</h2>
        <p className="text-ink-muted mt-2 text-sm">Tab into the buttons above to inspect.</p>
      </section>
    </div>
  );
}
