import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { ApplicationForm } from '@/components/careers/ApplicationForm';
import { pageMetadata } from '@/lib/seo';
import { roleTitles } from '@/lib/careers';

export const metadata: Metadata = pageMetadata({
  title: 'Apply — Careers at Precifarm',
  description:
    'Apply for a role at Precifarm. Send us your CV and a short cover letter — we reply to every application within five business days.',
  path: '/careers/apply/',
});

export default function CareersApplyPage(): React.ReactElement {
  return (
    <section className="container-page section">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/careers/"
          className="text-ink-muted hover:text-brand inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to careers
        </Link>

        <h1 className="font-display mt-6 text-3xl md:text-4xl">Apply to Precifarm</h1>
        <p className="text-ink-muted mt-3 text-base leading-relaxed md:text-lg">
          Short and to the point. Send us your CV and a few sentences on why this role — we read
          every application and reply within five business days.
        </p>

        <div className="mt-10">
          <Suspense
            fallback={
              <div
                aria-hidden="true"
                className="border-line bg-surface-muted h-96 animate-pulse rounded-xl border"
              />
            }
          >
            <ApplicationForm roles={roleTitles} />
          </Suspense>
        </div>

        <p className="text-ink-subtle mt-8 inline-flex items-center gap-1.5 text-sm">
          <Mail aria-hidden="true" className="h-4 w-4" />
          Prefer email?{' '}
          <a href="mailto:careers@precifarm.com" className="text-brand hover:underline">
            careers@precifarm.com
          </a>
        </p>
      </div>
    </section>
  );
}
