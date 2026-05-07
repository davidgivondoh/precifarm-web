import Link from 'next/link';
import type { Metadata } from 'next';
import { CtaButton } from '@/components/shared/CtaButton';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: false },
};

const suggestions = [
  { href: '/products/', label: 'Compare products' },
  { href: '/about/', label: 'About Precifarm' },
  { href: '/blog/', label: 'Read the blog' },
  { href: '/contact/', label: 'Talk to us' },
] as const;

export default function NotFound(): React.ReactElement {
  return (
    <section className="bg-surface-muted">
      <div className="container-page section">
        <p className="text-ink-muted text-sm tracking-wider uppercase">404</p>
        <h1 className="font-display mt-2 max-w-2xl text-balance">That page is not here.</h1>
        <p className="text-ink-muted mt-4 max-w-xl text-lg">
          The link may have moved, or it may never have existed. Try one of these instead.
        </p>

        <ul className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="border-line text-ink hover:bg-surface inline-flex w-full rounded-md border bg-white px-4 py-3 text-sm transition-colors"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <CtaButton href="/">Back to home</CtaButton>
        </div>
      </div>
    </section>
  );
}
